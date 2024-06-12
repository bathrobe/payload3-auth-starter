import Logout from 'src/app/components/auth/Logout'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LogoutPage() {
  const headers = getHeaders()
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const auth = await payload.auth({ headers })
  const { user } = auth
  if (!user) {
    redirect('/')
  }
  return (
    <div>
      <Logout />
    </div>
  )
}
