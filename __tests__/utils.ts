import {describe, expect, test} from '@jest/globals'
import { SteamMethod, extractSteamId, generateSteamRequestURL } from '@/utils/SteamMethods'

describe('Extract Steam ID', () => {
  test('Vanity URL', () => {
    const id = extractSteamId('https://steamcommunity.com/id/username/')

    expect(id).toBe('username')
  })

  test('Steam ID', () => {
    const id = extractSteamId('https://steamcommunity.com/profiles/12345/')

    expect(id).toBe('12345')
  })
})

describe('Generate a Steam API URL', () => {
  test('Player Summaries', () => {
    const url = generateSteamRequestURL(SteamMethod.GetPlayerSummaries, '12345', 'gaben')
    expect(url).toBe('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0001/?key=12345&steamids=gaben')
  })

  test('Resolve Vanity URL', () => {
    const url = generateSteamRequestURL(SteamMethod.ResolveVanityURL, '12345', 'gaben')
    expect(url).toBe('https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=12345&vanityurl=gaben')
  })

  test('Get Owned Games', () => {
    const url = generateSteamRequestURL(SteamMethod.GetOwnedGames, '12345', 'gaben')
    expect(url).toBe('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=12345&steamid=gaben&include_appinfo=true&include_played_free_games=true')
  })
})
