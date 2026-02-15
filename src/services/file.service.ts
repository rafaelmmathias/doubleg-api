
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'

export const generateHash = (filePath: string): string => {
  const buffer = fs.readFileSync(filePath)
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

export const moveToFinalPath = (
  tempPath: string,
  hash: string,
  ext: string
) => {
  const finalPath = path.resolve(`uploads/${hash}${ext}`)
  fs.renameSync(tempPath, finalPath)
  return finalPath
}
