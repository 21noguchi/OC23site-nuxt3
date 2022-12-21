import { readBody } from 'h3'
export default eventHandler(async event => {
  const body = await readBody(event)
  console.log(body)
  // TODO: Handle body and update user
  return `User updated!`
})