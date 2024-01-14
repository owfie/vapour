import { getOwnedGamesFromSteamId } from "@/utils/SteamMethods"
import { NextRequest, NextResponse } from "next/server"

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

  try {
    const games = await getOwnedGamesFromSteamId(steamId, apiKey)
    return new NextResponse(JSON.stringify(games), {
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Could not fetch games for user', {
      status: 400
    })
  }
}
