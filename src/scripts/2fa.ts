import { createHmac } from 'crypto'

function base32Decode(encoded: string): Buffer {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  encoded = encoded.replace(/=+$/, '').toUpperCase()
  
  let bits = ''
  for (const char of encoded) {
	const val = base32chars.indexOf(char)
	if (val === -1) throw new Error('Invalid base32 character')
	bits += val.toString(2).padStart(5, '0')
  }
  
  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
	bytes.push(parseInt(bits.substr(i, 8), 2))
  }
  
  return Buffer.from(bytes)
}

export function get_two_factor(): string {
  const secretKey = process.env.GOOGLE_TOTP_SECRET.toUpperCase();
  const timeStep = 30
  
  // Decode base32 secret
  const key = base32Decode(secretKey)
  
  // Get current time counter
  const counter = Math.floor(Date.now() / 1000 / timeStep)
  
  // Convert counter to 8-byte buffer (big-endian)
  const counterBuffer = Buffer.alloc(8)
  counterBuffer.writeBigInt64BE(BigInt(counter))
  
  // Generate HMAC
  const hmac = createHmac('sha1', key)
  hmac.update(counterBuffer)
  const hash = hmac.digest()
  
  // Dynamic truncation
  const offset = hash[hash.length - 1] & 0xf
  const code = (
	((hash[offset] & 0x7f) << 24) |
	((hash[offset + 1] & 0xff) << 16) |
	((hash[offset + 2] & 0xff) << 8) |
	(hash[offset + 3] & 0xff)
  ) % 1000000
  
  // Pad with zeros if necessary
  return code.toString().padStart(6, '0')
}