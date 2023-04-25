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

#### Back End

- [ ] If I wanted to make this flexible and easy for other people to use, the Admin zone should let an admin person configure/persist the configurable settings

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


want to be able to fetch all scores and join them to all songs...

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