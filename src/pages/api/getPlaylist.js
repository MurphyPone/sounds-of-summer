import kv from '@vercel/kv'

export const config = {
  runtime: 'experimental-edge',
}

/**
 *
 * @param {*} request { data: { key: `{userId}-{season}` } }
 * @returns { playlist }
 */
export default async function handler(request) {
  const data = await request.json()
  console.log('GetPlaylist request:', data)
  try {
    const playlist = await kv.hgetall(data.key)

    // console.log('GetPlaylist responding with playlist ', playlist)
    const res = new Response(JSON.stringify(playlist), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
    console.log('GetPlaylist responding with:', res.status)
    return res
  } catch (error) {
    console.log('kv error: ', error)
    return new Response(error.toString, {
      status: 500,
    })
  }
}
