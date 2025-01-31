import type {Request, Response, NextFunction} from 'express'
import {black, blue, bold, green, lightMagenta, red, yellow} from 'kolorist'

export type Colors = { [key: number]: (str: string | number) => string }

const STATUS_CODES: Colors = {
  1: blue,
  2: green,
  3: lightMagenta,
  4: red,
  5: yellow
}

const getColorCode = (code: number) => {
  const initialCode = Math.floor(code / 100)
  return STATUS_CODES[initialCode] || black
}

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime()

  res.on('finish', (): void => {
    const duration = getDurationInMilliseconds(start)
    const color = getColorCode(res.statusCode)
    console.log(`${req.method} ${req.originalUrl} ${bold(color?.(res.statusCode) || '')} ${duration.toLocaleString()} ms`)
  })

  next()
}
