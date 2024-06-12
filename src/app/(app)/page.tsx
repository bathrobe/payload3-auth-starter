import Link from 'next/link'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'

export default async function Home() {
  const headers = getHeaders()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const result = await payload.auth({ headers })
  if (!result.user) {
    return <Link href="/auth/login">Login</Link>
  } else {
    return (
      <div>
        <h1>Home</h1>
        <p>You're logged in.</p>
        <Link href="/auth/logout">Logout</Link>
      </div>
    )
  }
}
