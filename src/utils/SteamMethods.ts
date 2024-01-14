export enum SteamMethod {
  GetPlayerSummaries = 'ISteamUser/GetPlayerSummaries/v0001/',
  ResolveVanityURL = 'ISteamUser/ResolveVanityURL/v0001/',
  GetOwnedGames = 'IPlayerService/GetOwnedGames/v1/',
  GetSchemaForGame = 'ISteamUserStats/GetSchemaForGame/v2/'
}

export const steamSearchParamMap = {
  [SteamMethod.GetPlayerSummaries]: 'steamids',
  [SteamMethod.ResolveVanityURL]: 'vanityurl',
  [SteamMethod.GetOwnedGames]: 'steamid',
  [SteamMethod.GetSchemaForGame]: 'appid'
}

type GamesResponse = {
  response: {
    game_count: number
    games: {
      appid: number
      name: string
      icon: string
      playtime_forever: number
      playtime_windows_forever: number
      playtime_mac_forever: number
      playtime_linux_forever: number
      rtime_last_played: number
      playtime_disconnected: number
    }[]
  }
}

type PlayersResponse = {
  response: {
    players: {
      player: {
        steamid: string
        communityvisibilitystate: number
        profilestate: number
        personaname: string
        profileurl: string
        avatar: string
        avatarmedium: string
        avatarfull: string
        avatarhash: string
        lastlogoff: number
        personastate: number
        realname: string
        primaryclanid: string
        timecreated: number
        personastateflags: number
        loccountrycode: string
        locstatecode: string
        loccityid: number
      }[]
    }
  }
}

export type VapourPlayer = {
  username: string
  profileUrl: string
  avatar: string
}

export type VapourGame = {
  id: number
  name: string
  playtime: number
  icon: string
}

export type VapourSummary = {
  games: VapourGame[]
  totalGames: number
  totalPlaytime: number
  favouriteGame: number
}

export const generateSteamRequestURL = (method: SteamMethod, key: string, id: string) => {
  return `https://api.steampowered.com/${method}?key=${key}&${steamSearchParamMap[method]}=${id}${method===SteamMethod.GetOwnedGames ? '&include_appinfo=true&include_played_free_games=true' : ''}`
}

export const getSteamIdFromVanityUrl = async (vanityUrl: string, apiKey: string): Promise<string> => {
  const url = generateSteamRequestURL(SteamMethod.ResolveVanityURL, apiKey, vanityUrl)
  const res = await fetch(url)
  const data = await res.json()

  if (data.response.success === 1) return data.response.steamid satisfies string

  throw new Error('Could not resolve username')
}

export const getPlayerSummaryFromSteamId = async (steamId: string, apiKey: string): Promise<VapourPlayer> => {
  const url = generateSteamRequestURL(SteamMethod.GetPlayerSummaries, apiKey, steamId)
  const res = await fetch(url)
  const data = (await res.json() as PlayersResponse).response.players.player[0] // rework this

  if (!data) throw new Error('Could not find user')

  return {
    username: data.personaname,
    profileUrl: data.profileurl,
    avatar: data.avatarfull
  }
}

export const getOwnedGamesFromSteamId = async (steamId: string, apiKey: string): Promise<VapourSummary> => {
  const url = generateSteamRequestURL(SteamMethod.GetOwnedGames, apiKey, steamId)
  const res = await fetch(url)
  const data = (await res.json() as GamesResponse).response // rework this

  return {
    totalGames: data.game_count,
    totalPlaytime: data.games.reduce((acc, game) => acc + game.playtime_forever, 0),
    favouriteGame: data.games.reduce((acc, game) => game.playtime_forever > acc.playtime_forever ? game : acc).appid,
    games: data.games.map(game => ({
      id: game.appid,
      name: game.name,
      playtime: game.playtime_forever,
      icon: game.icon
    }))
  }
}
