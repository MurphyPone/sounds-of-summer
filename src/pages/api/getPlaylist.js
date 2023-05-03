import { createClient } from '@vercel/kv'

const kv = createClient({
  url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
  token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
})
/**
 *
 * @param {*} request { key: `{userId}-{season}` }
 * @param {*} response spotifyPlaylistResponse
 * @returns
 */
export default async function GetPlaylist(request) {
  try {
    const playlist = await kv.hgetall(request.key)
    console.log('GetPlaylist responding with playlist ', playlist)
    // if (playlist == null) return { status: 202, body: 'empty' }
    return {
      status: 200,
      body: playlist,
    }
  } catch (error) {
    console.log('kv error: ', error)
    return new Response({ status: 500, body: error.toString })
  }
}
