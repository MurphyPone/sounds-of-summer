// TODO: I'm pretty sure I should be able to pass around the session from component to component,
// but it doesn't like the `.property` on an untyped thing
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const { draftSettings } = require('../../package.json')

// used to gate visibility of certain pages based on authenticaiton status
export default function AuthFilter({ children }) {
  const router = useRouter()

  const session = useSession()

  function inParticipantList(id) {
    return draftSettings.participants.includes(id)
  }

  function isAuthed(status) {
    return status == 'authenticated'
  }

  return (
    <>
      {console.log(
        `AuthFiler: isAuthed(${session.status}): `,
        isAuthed(session.status)
      )}
      {console.log(
        `AuthFiler: inParticipantList(${session.data?.token.id}): `,
        inParticipantList(session.data?.token.id)
      )}
      {/* {isAuthed(session.status) && inParticipantList(session.data?.token.id) */}
      {isAuthed(session.status) && inParticipantList(session.data?.token.id)
        ? children
        : ''}
    </>
  )
}
