export default class HTTPException extends Error {
  /**
   * @param {*} statusCode : The error status code
   * @param {*} message : The error message
   */
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super()
  }
}
