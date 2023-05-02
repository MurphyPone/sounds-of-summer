// Only render the children if the window to view the gated info has elapsed
export default function CalendarFilter({ children, date, debug }) {
  const now = new Date()
  const openDate = new Date(date)

  if (debug) {
    console.log(
      `CalendarFilter: now ${now}, openDate ${openDate}, now > openDate: ${
        now > openDate
      } `
    )
    return children
  }

  if (now > openDate) return children
  else return <></>
}
