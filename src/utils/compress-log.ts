import { compressToBase64 } from 'lz-string'
import * as crypto from 'crypto-js'

export const compressLog = (log: string) => {
  const text = compressToBase64(log)
  return crypto.AES.encrypt(text, 'zzio-games-water').toString()
}
