export default eventHandler(async (event) => {
  const body = await readBody(event)
  if (body.user === "OC23CIA" && body.pass === "k0mabanoSakura") {
    return true
  }
  else {
    return false
  }
})