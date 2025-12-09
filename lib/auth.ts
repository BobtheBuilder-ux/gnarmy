type SessionPayload = { username: string; exp: number };

const enc = new TextEncoder();
const dec = new TextDecoder();

function toHex(u8: Uint8Array): string {
  let out = '';
  for (let i = 0; i < u8.length; i++) {
    const h = u8[i].toString(16).padStart(2, '0');
    out += h;
  }
  return out;
}

function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return out;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let res = 0;
  for (let i = 0; i < a.length; i++) {
    res |= a[i] ^ b[i];
  }
  return res === 0;
}

async function hmacSha256(message: Uint8Array, secretUtf8: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretUtf8),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const copy = new Uint8Array(message.byteLength);
  copy.set(message);
  const sig = await crypto.subtle.sign({ name: 'HMAC' }, key, copy);
  return new Uint8Array(sig);
}

export async function signSession(payload: SessionPayload, secret: string) {
  const dataBytes = enc.encode(JSON.stringify(payload));
  const sigBytes = await hmacSha256(dataBytes, secret);
  const dataHex = toHex(dataBytes);
  const sigHex = toHex(sigBytes);
  return `${dataHex}.${sigHex}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [dataHex, sigHex] = parts;
  const dataBytes = fromHex(dataHex);
  const expectedBytes = await hmacSha256(dataBytes, secret);
  const providedBytes = fromHex(sigHex);
  if (!constantTimeEqual(providedBytes, expectedBytes)) return null;
  const json = JSON.parse(dec.decode(dataBytes));
  if (typeof json?.exp !== 'number' || Date.now() > json.exp) return null;
  return json;
}

export function safeCompare(a: string, b: string) {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  return constantTimeEqual(ab, bb);
}
