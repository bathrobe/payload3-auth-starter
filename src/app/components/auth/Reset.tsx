'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPage({ searchParams }: { searchParams: { token: string } }) {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  const token = searchParams.token

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      })
      if (res.ok) {
        setSuccessMessage('Password reset successfully.')
        try {
          const logoutResponse = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (!logoutResponse.ok) {
            throw new Error('Logout failed.')
          }
          console.log('Logged out successfully.')
          router.push('/auth/login')
        } catch (error) {
          console.error('Logout request failed:', error)
        }
      } else {
        throw new Error('Failed to reset password.')
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred.')
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        placeholder="New Password"
        required
        minLength={8}
        onChange={handleChange}
        value={password}
      />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <div>{successMessage && <p>{successMessage}</p>}</div>
      <button aria-disabled={isSubmitting} type="submit" disabled={isSubmitting}>
        Reset Password
      </button>
    </form>
  )
}
