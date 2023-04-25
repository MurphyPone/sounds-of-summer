/* eslint-disable react/no-unescaped-entities */
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  Container,
  Text,
  useTheme,
  Image,
  Link,
  Spacer,
} from '@nextui-org/react'
import MyNavBar from '../components/MyNavBar'
import ProgressBar from '../components/ProgressBar'

const { draftSettings } = require('../../package.json')

const HowItWorks = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const now = new Date()
  const openDate = new Date(draftSettings.schedule.open)
  const submissionDate = new Date(draftSettings.schedule.submission)
  const roundOneDate = new Date(draftSettings.schedule.round1)
  const roundTwoDate = new Date(draftSettings.schedule.round2)

  const { theme } = useTheme()

  return (
    <Container>
      <MyNavBar />
      <Text h1 style={{ color: theme.colors.primary.value }}>
        How it Works
      </Text>
      <Text size="$lg">
        Welcome to the 4th annual “Murphy Summer Music Draft” (working title).
      </Text>
      <Text size="$lg">
        Each year, we each submit a few dozen songs for the summer, throw them
        into a spreadsheet, vote on them, and walk away with a collaborative
        playlist we've all got a piece of to jam to during the sweet summer
        dayz.
      </Text>
      <Text size="$lg">
        This year, for the sake of variety and <em>data</em> we've decided to
        open up the song selection process to a few more folks - welcome to the
        secret club.
      </Text>
      <Text h2 style={{ color: theme.colors.primary.value }}>
        Schedule
      </Text>
      <ProgressBar
        startDate={openDate}
        endDate={submissionDate}
        startLabel={'Call for songs'}
        endLabel={'Submission deadline / round 1 start'}
      />
      <Spacer y={2} />
      <ProgressBar
        startDate={submissionDate}
        endDate={roundOneDate}
        startLabel={'round 1 voting opens'}
        endLabel={'round 1 end / round 2 start'}
      />
      <Spacer y={2} />
      <ProgressBar
        startDate={submissionDate}
        endDate={roundOneDate}
        startLabel={'round 2 voting opens'}
        endLabel={'results!'}
      />
      <Spacer y={2} />
      <Text h3 style={{ color: theme.colors.primary.value }}>
        "Call for Songs": Midnight before {submissionDate.toDateString()}
      </Text>

      <Text size="$lg">
        Compile your selection of{' '}
        <strong>{draftSettings.batchSize} songs</strong> into a Spotify playlist
        and submit them on the <Link href="/submission">Submission</Link> page
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        Voting round 1: {submissionDate.toDateString()} –{' '}
        {roundOneDate.toDateString()}
      </Text>

      <Text size="$lg">
        The <Link href="/round-one">first round</Link> of voting will open up.
        Rank your favorite song from each batch
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        Voting round 2: {roundOneDate.toDateString()} –{' '}
        {roundTwoDate.toDateString()}
      </Text>

      <Text size="$lg">
        The <Link href="/round-two">second round</Link> of voting will open up.
      </Text>
      <Text size="$lg">
        Same as above, but you have the added information of which songs are
        already scoring well … will this change how you vote in round 2 !?
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        Results – June 16th, 2023
      </Text>
      <Text size="$lg">
        <Link href="/">Results</Link> will be released!
      </Text>
      <Text h2 style={{ color: theme.colors.primary.value }}>
        Voting
      </Text>
      <Text size="$lg">
        Typically, the scoring process involves two rounds of blind batch
        voting. <s>Peter will</s> this website will shuffle and divide all the
        submissions into “batches” of about 6 songs, equally distributed from
        each of our submissions, and throw them into <s>a spreadsheet</s> the
        respective voting tabs: <Link href="/round-one">Round 1</Link> and{' '}
        <Link href="/round-two">Round 2</Link>.
      </Text>
      <Text size="$lg">
        For each batch of N songs, each participant is allocated N discrete
        votes e.g. for batches of 6 songs, we each get a voting set of &#123;6,
        5, 4, 3, 2, 1&#125; points to allocate per song with the vote of 6 cast
        for one your favorite in a batch, …, and 1 your least favorite. We
        repeat this for all the songs over the ~2 week period(s) detailed in the
        schedule above, completed asynchronously since that's a lot of music to
        listen to.
      </Text>
      <Text size="$lg">
        (e.g. here’s what would be revealed after the first round of voting):
      </Text>
      <Image
        width={1200}
        src="https://lh3.googleusercontent.com/u/0/docs/ADP-6oHwCpG72wDrApWJlE8c3lrbImyFDjVWmkAWq80OJD4bVd_cjQNqZ7l7Pen1-9Kf5XzdGgh4466by8zxjKkMFPO3VEId2EFYzjJKtNDD_-59oMsT54HF5xJ3K6UkgPiTPR4xZybjkbk42kpOD25BX7Ik7MQ_ejaHfTbZIX6aEq3M2unzWtRaavGNJPQejhZIP0JdjvuFTRBpgtUicX1vFt-6abu30Lz6BxrMhZflINVG0zCsfkLEP2VW8yGsyuYxXy2xuxXNESqdu3x5oke_0Hi9R3QDXyUjxW586Qm5TXuIBRKSX0wNAw1AHr9vYLZSGx-AeLvBcQh2BgtmShNFiRwAoA7b7r4G4HYp_RE5BbkQf74j1CJN8Oee0xjgkUl8imcqXa3YH93FVWj-OCLooRQQx4u5rp8sDukdV_azJI2bTZ5-Y9YdUR04oSp77Rlg_yCETsuyIHPCQQPucGnbWjk_k9gkWU8YNgo9AbN7OCvQyxUoAW6kWXKzA6yJGyZatuA25DfH76MYR0KPjgu5Ta4-PYkVORHZLoxbuK7ahbx30mMrzCn-eMW7aTddCDqDvq4ZXuv00BB0wKQrsnTPyW0pJRHpQBEqT3CyE_EYUu5bnlheMEFirWQyUtqUPR4cG29vZAmZ0m5K4ims7F7EClFJeNsco4o5Gr3cOb8DWtZRZ17lJVEpJPABn2CPJ4og3HIuwbBVEqQb06TlGkumzN0Wf1kJeJOKbitiUvrespqONeypyJDjV5nWdlyiSO2FIKG2voBfy4aTTugC10JT1NeZzfaQsirwGVUNrC-NI_akz1F71y5S8GYKCDcVekIe5OAaOrWunE2OUWq2s2vFWnuEbrE3XPwzn32_Hm-RqdPWXDkhR9hDT5zbykqXI3UIsiRbIVDzDgBnoC_hLujcayNIK41JAcCPsGv8uFUyrF7UUZ7hk7eIqvxcNnqmKw"
        alt="Round 1 voting results"
        objectFit="cover"
      />
      <Text size="$lg">
        After the first round of voting, intermediate results are revealed,
        songs are scrambled again (working on a way to do this to guarantee that
        no songs appear in the same batch as another more than once) to help
        break ties, get more matchups, and higher distribution of preference
        inference from participants.
      </Text>
      <Text size="$lg">
        (e.g. here’s what would be revealed after the first round of voting):
      </Text>
      <Image
        width={1200}
        src="https://lh3.googleusercontent.com/u/0/docs/ADP-6oFmWKBbz-f17IfLmLMM6JIEe28w3wwXb5mI_uU4fe6jJpSVZZzQI9Hx8ymtwcaBOQfG2oeIXCl0qCPCOqlWuoHftrMHH-FK1MUYH3Qcuee0GLTKNrKi6jCvi7BGLY6ySbxbS0XERP7WRtXZBkGolYM36t8pKfLDVSAwncl6-9fD2Sq0Al-NY3L3la2xlcKAV9QDdRMkJR0sIJxrzSpXoieeWBDlvdrqwhGAVO-b9Qp4YUI4e6WxDEmeoNF_El8vGF5JDLAKXYvMkHY_TQxpd-5HS9DTWfewZdwRp8YMI8c681DpCkzzuyL26Ymw1ol5iHYP0mOXWngnPX4T9NPXoHb4LNfTM71HDZZYRf9FtxgvxU9XYMGaZP1_iZcRj7KO2JzKBPImycOmMiEDRQE2oNHvlUsNR2HuuuoBvT_YMPVaG1kdXeEW30l_mWSQBJPQ6HYOkG6LuTp1ATo7Xi6v5LT_ET9SqAfEqrN0hit_Dqx1c7ByVX7yLlpXqmvFQQUs43cvEaB71K5r3oDZ_LkQ7uzovp1OGmtqmVu90eSA4XXnhtHf3GycMxHpSd6epy7E3vr0hAn0eFnQzSxwBQ88EkXMXMrhJqRt2b8VqkrjxTvIMUghDXlbVNSTTUJwy9CbrfN2AUR-B0EiVtCsdNo8doMuTursDmewIXzXs_Jw98Jk54Lj_WZWqP4SIZqzkTNB3bOqKlJR57RrQwRyZk44ZJ589lznKaBSNHJGJAef2JzrTkOmmpENiHFzNKtvvL-006AF-nALVeHCSqUrstpEiVzSUs7fHpaJBTuS2FZ4ObUKb8_FNewii5g3BKTw_uqGLG3f0DnLVRuN5V1hlUzyrwiEqnxoGw0DNJogja-3WK-QHOHWOJLQoqHTFM2k56gpgl1pnlvdClrHqk_cZA7Z2GKi2Q7G7z_sx1d_lPsMvqhLWahBHbHOVgpY7cLrfQ"
        alt="Round 2 voting results"
        objectFit="cover"
      />
      <Text size="$lg">
        After these votes are in,
        <s>
          it takes me about a day to extract some statistics from all our
          submissions and reverse map your anonymous submissions to yourself,
          assign points per participant, etc.
        </s>{' '}
        we'll have the results immediately!
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        Playlist Duration
      </Text>
      <Text size="$lg">
        I'll also automatically fetch the song durations from each of our
        submitted songs so we can determine the total runtime of all our
        submission to allow us to collectively choose a cutoff duration prior to
        the final voting period (usually something like top 2/3s of the playlist
        in terms of duration makes the cut).
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        Song Selection
      </Text>
      <Text size="$lg">
        <em>Vibes;</em> ability to be played with your mom in the car and not
        get skipped; classic but not overplayed; duration; new underground heat.
        Imagine the beach, the pool, driving with the windows down, corn hole,
        hot dogs, ripping top ched with charlie in the goalie gear, etc.
      </Text>
      <Text size="$lg">
        I'm not going to say you <em>shouldn't</em> submit country music, but
        maybe read the room...
      </Text>
      <Text size="$lg">
        Avoid repeats if you don’t want your song to be blackballed. Recent
        usages can be found in the Summer ‘21 and ‘22 playlists here:{' '}
        <Link href="https://open.spotify.com/playlist/1YMXxluD8ZTsqtElzv2F3G?si=6eb77ade180d46b9">
          Sounds of Summer '21
        </Link>{' '}
        &{' '}
        <Link href="https://open.spotify.com/playlist/1ElLGYxW8r7z94BjMg56YR?si=b5d594488b504f4d">
          ELEVATOR MUSiC
        </Link>
        .
      </Text>
      <Text h3 style={{ color: theme.colors.primary.value }}>
        To the Victor go the Spoils
      </Text>
      <Text size="$lg">
        Like any good activity, there's a bit of competition involved. The
        person who submits the most popular song (highest cumulative score
        between both rounds of voting) gets to name the playlist, and the person
        with [the most songs] in the playlist gets to choose the playlist cover
        image:
      </Text>
      <Image
        width={1200}
        src="https://lh3.googleusercontent.com/u/0/docs/ADP-6oGXFQzvAW4OVzUwxuag5iin09dD6cv7VVCxzoHLSOT1OJy8qqDBUV2eyWpypJJPeUNrjv2Qs_JtaaPQWhJ0teYE6BFcfQTBj5r85cVBIk8Zzf9ZPQHbSgJO0onuvfisjBLzI6Hkp9PPN9KGmKa-I8JK2uB6rq1giAv73G383vHle5Zsjwia5vp1cxOuWCAJFbGamjg09Xa7sj11sBB6-KNA506aCXP9xDKu-4zXNT5fmKmkDvPU4jaQEQnNH1K-ZguucDdyI_dENbw18xxkF-_6Ea1qP-OkGP2TMF9hkPvcEg4YI9l1IxoUjFMVwNUYL94_8sQ38q6gxCZr6xSJq5oOq9yOrS8V8OF890HoUVS3Tj3l2z23M7n11-FXP45IRFDBh34ydsED8XkXLUrdXYS58fq02ZJIgRJrDORcW07AzzQdzQronOjQdrRmED6l9nc-aUrQU5yM4YB_UX6nfcx0gk5CK8Ebagd-yOdIVMP1fHff5EfC2vfAQ-UiJO4lCR4GTojDaTXhnurcB8pp-OWleQ_UKc-YGoywbb0aqkVm-1lwgSu4oqa2-KFKdqUDFBDQH6YSjxxQVa8vI_RzyCuPU6bw7HlnKxfD1UFTio4yECfg-dBC9-hlV3gmLkOXa-2FZnZvyMOQsuVOxmEHKLWtATPPyO_slanyAY777IPzi-9vqVm-afa8f4VI4PRODWpw-rSOCJnl-oravOvoFfXfv3QaqPGriitV0_g_vmcHkleqQ2OlDgA-gKQgxh35aPWDXWL3cPKm0J5MO2glVNBxkT2ZMtCJNHx4pdcRt00R82OB5wf0D3xGCDNV9n505Q_Ln_e2uUKIGsS9gcZXfkEH2XJBFqPJGlWuf3Dl7ZCy0UOpnnB-Nh51ZzkpYwSO-BLcYj2qZFikMd5m9Bg_pdyBquK61UOOi4J3IKCRvH0mqapV_kdRI3oW7nPsJQ"
        alt="Elevator music boi"
        objectFit="cover"
      />
    </Container>
  )
}

export default HowItWorks
