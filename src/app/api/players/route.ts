import { NextRequest, NextResponse } from "next/server"
import SteamID from 'steamid'

const apiKey = process.env.PRIVATE_STEAM_API_KEY

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

export async function GET(request: NextRequest) {
  if (typeof apiKey !== 'string') return new NextResponse('Internal Server Error', {
    status: 500
  })

  const searchParams = request.nextUrl.searchParams
  let steamId = searchParams.get('id')

  if (!steamId) {
    return new NextResponse('Missing Steam ID', {
      status: 400
    })
  }

  // TODO: Un-fuck this mess
  try {
    const id = new SteamID(steamId)
    if (!id.isValidIndividual()) throw new Error('SteamID is not an individual account')
  } catch (error) {
    // If we can't parse the Steam ID, it may be a vanity URL, so attempt to resolve the ID from that
    try {
      steamId = await getSteamIdFromVanityUrl(steamId, apiKey)

      const id = new SteamID(steamId)
      if (!id.isValidIndividual()) throw new Error('SteamID is not an individual account')

      const data = await getPlayerSummaryFromSteamId(steamId, apiKey)

      return new NextResponse(JSON.stringify(data), {
        status: 200
      })
    } catch (error) {
      return new NextResponse(error.message, {
        status: 400
      })
    }

    return new NextResponse(error.message, {
      status: 400
    })
  }

  const data = await getPlayerSummaryFromSteamId(steamId, apiKey)

  return new NextResponse(JSON.stringify(data), {
    status: 200
  })
}
