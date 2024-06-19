import Reset from '@/app/components/auth/Reset'
import { redirect } from 'next/navigation'

export default function ResetPageWrapper({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token

  if (!token) {
    redirect('/')
  }

  return <Reset searchParams={searchParams} />
}
