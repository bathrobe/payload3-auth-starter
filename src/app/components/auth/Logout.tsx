'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const logout = async () => {
    let res
    try {
      res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
      return
    }

    if (!res.ok) {
      try {
        await fetch('/api/administrators/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Admin logout request failed:', error)
      }
      return
    }

    setIsLoggedOut(true)
    router.push('/')
  }

  return (
    <button onClick={logout} disabled={isLoggedOut}>
      {isLoggedOut ? 'Logged Out' : 'Logout'}
    </button>
  )
}

export default Logout
