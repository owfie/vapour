const steamIds = '76561198048816749'
const api = process.env.PRIVATE_STEAM_API_KEY
const template2 = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${steamIds}&format=${format}`
// Game vanity name: http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/
