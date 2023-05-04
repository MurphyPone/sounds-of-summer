import kv from '@vercel/kv'

export const config = {
  runtime: 'experimental-edge',
}

/**
 *
 * @param {*} request - { key: `{userId}-{season}`, payload: { ...spotifyPlaylistResponse }
 * @param {*} response 200 on success
 * @returns
 */
export default async function SetPlaylist(request) {
  const data = await request.json()
  console.log(`SetPlaylist request:, { key: ${data.key}, payload: {...}`)

  try {
    await kv.hset(data.key, data.payload)
    console.log('SetPlaylist responding with success')

    return new Response(
      { ooga: 'booga' },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.log('kv error: ', error)
    return new Response(error.toString, {
      status: 500,
    })
  }
}
