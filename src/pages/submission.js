import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  Container,
  Row,
  Spacer,
  Button,
  Input,
  Text,
  Progress,
  Grid,
} from '@nextui-org/react'
import MyNavBar from '../components/MyNavBar'
import ProgressBar from '../components/ProgressBar'
import Batch from '../components/Batch'

const { draftSettings } = require('../../package.json')

const Submission = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  // TODO: move this to a BE function
  const openDate = new Date(draftSettings.schedule.open)
  const submissionDate = new Date(draftSettings.schedule.submission)

  return (
    <Container>
      <MyNavBar />
      {/* If we don't yet have an auth'd session, serve the login page */}
      {/* TODO: prolly move this auth check to a Container type deal */}
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      ) : (
        // TODO: If the user has already submitted a playlist, then hide this and show their submission
        <Container display="flex">
          <Spacer y={10} />
          <Row justify="center" align="center">
            <Input
              underlined
              color="primary"
              label="link to your spotify playlist"
              // TODO: check use user's playlist as initial value if present
              placeholder="https://open.spotify.com/playlist/2utjwWZnVjfAv2Helpzz69?si=c13cc5bb49274afc"
              width="80%"
              size="md"
            />
          </Row>
          <Spacer y={2} />
          <Row justify="center">
            <Button width={300}>Save</Button>
          </Row>
          <Spacer y={2} />
          {/* TODO: move this to a  */}
          <ProgressBar
            startDate={openDate}
            endDate={submissionDate}
            endLabel={'Submission deadline'}
          />
        </Container>
      )}

      {/* TODO: if users playlist is present, pull it in */}
      <Batch />
    </Container>
  )
}

export default Submission
