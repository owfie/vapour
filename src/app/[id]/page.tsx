const apiKey = process.env.PRIVATE_STEAM_API_KEY

import { getOwnedGamesFromSteamId, getPlayerSummaryFromSteamId, getSteamIdFromVanityUrl } from "@/utils/SteamMethods"
import { Profile } from "./Profile"
import SteamID from "steamid"

export default async function PlayerPage({
  params,
}: {
  params: { id: string }
}) {

  let id = params.id

  try {
    let parsed = new SteamID(id)
    if (!parsed.isValidIndividual()) throw new Error('SteamID is not an individual account')
  } catch (error) {
    try {
      id = await getSteamIdFromVanityUrl(params.id, apiKey as string)
      let parsed = new SteamID(id)
      if (!parsed.isValidIndividual()) throw new Error('SteamID is not an individual account')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const profile = await getPlayerSummaryFromSteamId(id, apiKey as string)
  const games = await getOwnedGamesFromSteamId(id, apiKey as string)

  return <Profile profile={profile} games={games} />
}
