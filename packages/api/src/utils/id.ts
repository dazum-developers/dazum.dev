export function genId(length: number) {
  // Define the characters we want to use
  const characters = 'abcdef0123456789'
  let result = ''

  // Generate random characters until we reach the desired length
  for (let i = 0; i < length; i++) {
    // eslint-disable-next-line sonarjs/pseudo-random
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}
