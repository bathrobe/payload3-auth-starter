'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { loginUser } from 'src/app/lib/authActions'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await loginUser(new FormData(event.currentTarget))
    } catch (error: any) {
      setErrorMessage(error.message)
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
        onChange={handleChange}
        value={formData.password}
      />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <button aria-disabled={isSubmitting} type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  )
}

export default Login
