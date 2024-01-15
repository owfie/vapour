const apiKey = process.env.PRIVATE_STEAM_API_KEY

import { getOwnedGamesFromSteamId, getPlayerSummaryFromSteamId, getSteamIdFromVanityUrl } from "@/utils/SteamMethods"
import { Profile } from "./Profile"

export default async function PlayerPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await getSteamIdFromVanityUrl(params.id, apiKey as string)
  const profile = await getPlayerSummaryFromSteamId(data, apiKey as string)
  const games = await getOwnedGamesFromSteamId(data, apiKey as string)
  return <Profile profile={profile} games={games} />
}
