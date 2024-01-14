export enum SteamMethod {
  GetPlayerSummaries = 'ISteamUser/GetPlayerSummaries/v0001/',
  ResolveVanityURL = 'ISteamUser/ResolveVanityURL/v0001/',
  GetOwnedGames = 'IPlayerService/GetOwnedGames/v0001/',
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
      playtime_forever: number
      playtime_windows_forever: number
      playtime_mac_forever: number
      playtime_linux_forever: number
      rtime_last_played: number
      playtime_disconnected: number
    }[]
  }
}



export const generateSteamRequestURL = (method: SteamMethod, key: string, id: string) => {
  return `https://api.steampowered.com/${method}?key=${key}&${steamSearchParamMap[method]}=${id}`
}

export const getSteamIdFromVanityUrl = async (vanityUrl: string, apiKey: string): Promise<string> => {
  const url = generateSteamRequestURL(SteamMethod.ResolveVanityURL, apiKey, vanityUrl)
  const res = await fetch(url)
  const data = await res.json()

  if (data.response.success === 1) return data.response.steamid satisfies string

  throw new Error('Could not resolve username')
}

export const getPlayerSummaryFromSteamId = async (steamId: string, apiKey: string) => {
  const url = generateSteamRequestURL(SteamMethod.GetPlayerSummaries, apiKey, steamId)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getOwnedGamesFromSteamId = async (steamId: string, apiKey: string): Promise<GamesResponse> => {
  const url = generateSteamRequestURL(SteamMethod.GetOwnedGames, apiKey, steamId)
  const res = await fetch(url)
  const data = await res.json()
  return data
}
