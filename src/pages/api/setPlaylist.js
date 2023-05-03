import { createClient } from '@vercel/kv'

/**
 *
 * @param {*} request - { key: `{userId}-{season}`, payload: { ...spotifyPlaylistResponse }
 * @param {*} response 200 on success
 * @returns
 */
export default async function SetPlaylist(request) {
  const kv = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
  })

  // TODO: this is gross and I shouldn't have to do this wtf?

  console.log('SetPlaylist request:', request)
  try {
    await kv.hset(request.key, request.payload)
    // console.log('SetPlaylist: success for', request.key)
    return { status: 200, body: request.key }
  } catch (error) {
    const res = { body: error, status: 500 }
    console.log('SetPlaylist: error: ', res)
    return res
  }
}
