export default eventHandler(async (event) => {
  const body = await readBody(event)
  if (body.pass === "k0mabanoSakura") {
    return true
  }
  else {
    return false
  }
})