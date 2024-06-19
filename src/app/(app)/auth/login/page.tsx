import Login from 'src/app/components/auth/Login'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <Login />
      <div className="flex">
        <Link href="/auth/create">Create account</Link>
        <Link href="/auth/forgot">Forgot password</Link>
      </div>
    </>
  )
}
