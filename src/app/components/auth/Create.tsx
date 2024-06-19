'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { createUser } from 'src/app/lib/authActions'

export default function CreateAccount() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await createUser(new FormData(event.currentTarget))
      setVerifyMessage(result)
      setIsVerifying(true)
    } catch (error: any) {
      console.log('error is', error)
      setErrorMessage(error.message || 'An error occurred.')
    }
    setIsSubmitting(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength={8}
        onChange={handleChange}
        value={formData.password}
      />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <div>{verifyMessage && <p>{verifyMessage}</p>}</div>
      <button
        aria-disabled={isSubmitting || isVerifying}
        type="submit"
        disabled={isSubmitting || isVerifying}
      >
        Create Account
      </button>
    </form>
  )
}
