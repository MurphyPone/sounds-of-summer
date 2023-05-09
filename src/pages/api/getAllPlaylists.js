import kv from '@vercel/kv'
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url'

export const config = {
  runtime: 'experimental-edge',
}

/**
 *
 * @param {*} request { data: { key: `{userId}-{season}` } }
 * @returns { playlist }
 */
export default async function handler(request) {
  const key = request.nextUrl.searchParams.get('key')
  console.log('getAllPlaylists for key: ', key)
  // const searchParams = new URLSearchParams(search)
  // console.log('search: ', search, 'searchParams: ', searchParams)
  // const { key } = query
  // const data = await request.json()
  // console.log('GetPlaylist request:', searchParams)
  try {
    const playlist = await kv.hgetall(key + '*')

    // console.log('GetPlaylist responding with playlist ', playlist)
    const res = new Response(JSON.stringify(playlist), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
    console.log('GetAllPlaylists responding with:', res.status)
    return res
  } catch (error) {
    console.log('kv error: ', error)
    return new Response(error.toString, {
      status: 500,
    })
  }
}
