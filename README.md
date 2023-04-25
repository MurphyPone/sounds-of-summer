## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODOs
In no particular order of priority:

#### Front End 
- [ ] consolidate the Auth vibecheck from the various pages (e.g. `/index.js` into a proper component like `Layout.js`), but think about how it needs to be applied... 
  - I think auth'd users in some allowlist should be able to vote on songs, but anyone should be able to publicly view round or final results.  So, maybe only gate the round voting tabs to auth'd users, and the final results can be public
  - [ ] Add such an allowlist to the `draftSettings` in the `package.json`
- [ ] Round tabs
  - [ ] somehow treat the table for voting as forms
  - [ ] want to be able to `upsert` on a batch, should push scores up
  - [ ] tableview should become readonly after round deadline has elapsed, 
  - [ ] round X should be hidden until the configurable schedule opens
- [ ] Batch component
  - [ ] should take a configurable a
- [ ] move what is currently in the `Batch` component into `Results` 
- [ ] Make the `Batch` component only do some multiple of `N` participants worth of songs and have a button to upsert those votings results to the database
- [ ] Move the `Account` stuff out of `index` and into a dedicate `profile` tab
  - [ ] Spotify auth... user will need to do this if they want to change their playlist choice...


#### Back End

- [ ] If I wanted to make this flexible and easy for other people to use, the Admin zone should let an admin person configure/persist the configurable settings
- [ ] read up on how the `/pages/api` shiz works with Next, it's pretty cool as far as I can tell
  - [ ] while none of this app is particularly compute-intensive, it might be useful to model it as BE/FE and put all the algorithmic shuffling utility functions into an route
- [ ] Wire up all the FE buttons (some of which have yet to be created) to actually interact with the database(s)
- [ ] Cron jobs? 
  - [ ] Autopersist current (valid) playlist submissions to database
  - [ ] (nice to have) email participants about deadlines (I'll just text em in the groupchat tho tbh...)
  - [ ] on deadlines, shuffle, tally, display results?¿ Could just do a onetime check when the site is hit e.g. 

```js 

if (now > draftSettings.roundOneDeadline) {
    if (snapshot) {
        renderSnapshot()
    } else {
        // compute round 1 results
        // persist them to db 
        renderSnapshot()
    }
} 
```

- [ ] implement shuffling algorithms roughly like this:

```js
const submissionsByParticipant = [supabase.get('playlist').eq('userId', user.id) in supbase.get('users') ] // should be an array playlists


const round1AsBatches = [ 
  // TODO: need to ensure that each playlist has > 25 songs first, then 
  [playlist.randomPop() for playlist in submissionsByParticipant] // batch
for i in draftSettings.batchSize
]

// TODO: naive shuffle, could improve here by guaranteeing that no two songs are in the same batch from round to round 
const round2AsBatches = [ 
  // TODO: need to ensure that each playlist has > 25 songs first, then 
  [playlist.randomPop() for playlist in submissionsByParticipant] // batch
for i in draftSettings.batchSize
]

export default render() {
  return (
    {round1asBatches.map((batch, i) => {
        <Batch sixSongs={batch} />
       })
     }
  )
}
```

#### Database

not super confident in this schema 
- [ ] Users table with columns: 
  - `userId`
  - `playlistId`

- [ ] Playlists table
  - `playlistId`
  - `json` of all the tracks (to be treated as src of truth after the submission deadline)
- [ ] Scores table
  - `userId`
  - `trackId`
  - `round1BatchId`
  - `round1BatchScore`
  - `round2BatchId`
  - `round2BatchScore`


want to be able to fetch all scores and join them to all songs to produce a results page similar to this:

![](/public/assets/example.png)

#### Testing

- [ ] backtest on historical spreadsheet results to ensure I get vaguely similar outcomes

## Boiler plate NextJS/create-react-app readme

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Spotify ish

```bash
$ curl -X "GET" "https://api.spotify.com/v1/playlists/<id>/tracks" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
```