export default eventHandler(async (event) => {
  const body = await readBody(event)
  if (body.user === "OC23CIA") {
    return true
  }
  else {
    return false
  }
})