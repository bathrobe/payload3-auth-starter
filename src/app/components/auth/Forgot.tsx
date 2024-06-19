'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { forgotPassword } from 'src/app/lib/authActions'

export default function CreateAccount() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await forgotPassword(new FormData(event.currentTarget))
      setFormMessage(
        'If there is an account associated with this email, a reset password link has been sent to it.',
      )
    } catch (error: any) {
      setErrorMessage(error || 'An error occurred.')
    }
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
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <div>{formMessage && <p>{formMessage}</p>}</div>
      <button aria-disabled={isSubmitting} type="submit" disabled={isSubmitting}>
        Reset Password
      </button>
    </form>
  )
}
