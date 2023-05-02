const { draftSettings } = require('../../package.json')

const openDate = new Date(draftSettings.schedule.open)
const submissionDate = new Date(draftSettings.schedule.submission)
const roundOneDate = new Date(draftSettings.schedule.round1)
const roundTwoDate = new Date(draftSettings.schedule.round2)

// Only render the children if the window to view the gated info has elapsed
export function RoundOneFilter({ children, debug = true }) {
  const now = new Date()

  if (debug) {
    return children
  }

  if (now > submissionDate) return children
  else return <></>
}

export function RoundTwoFilter({ children, debug = true }) {
  const now = new Date()

  if (debug) {
    return children
  }

  if (now > roundOneDate) return children
  else return <></>
}

export function ResultsFilter({ children, debug = true }) {
  const now = new Date()

  if (debug) {
    return children
  }

  if (now > roundTwoDate) return children
  else return <></>
}

export default function CalendarFilter({ children, date, debug }) {
  const now = new Date()
  const openDate = new Date(date)

  console.log(
    `CalendarFilter: now ${now}, openDate ${openDate}, now > openDate: ${
      now > openDate
    } `
  )

  if (debug) {
    return children
  }

  if (now > openDate) return children
  else return <></>
}
