import { getPlayerSummaryFromSteamId, getSteamIdFromVanityUrl } from "@/utils/SteamMethods"
import { NextRequest, NextResponse } from "next/server"
import SteamID from 'steamid'

const apiKey = process.env.PRIVATE_STEAM_API_KEY

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
