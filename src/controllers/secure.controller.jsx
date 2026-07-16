const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function secureLoginCredentials(email) {
  const payload = {
    email,
    ipAddress: '0.0.0.0',
    latitude:  '0.0',
    longitude: '0.0',
    pushToken: '',
  }
  const res  = await fetch(`${BASE_URL}/api/secure/login/credentials`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  const data = await res.json()
  return { code: res.status, message: data.message ?? '', data }
}
