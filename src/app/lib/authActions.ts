'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createUser(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const payload = await getPayloadHMR({
      config: configPromise,
    })
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: email,
        password: password,
        role: 'user',
      },
    })
    console.log('new user created:', newUser)

    return 'User created! Check your email for a verification link.'
  } catch (error: any) {
    if (error.type) {
      switch (error.type) {
        case 'UserCreationFailed':
          return 'Failed to create user'
        default:
          return 'Something went wrong during user creation.'
      }
    }
    throw error
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const payload = await getPayloadHMR({
      config: configPromise,
    })

    const result = await payload.login({
      collection: 'users',
      data: {
        email: email,
        password: password,
      },
    })
    if (result.token) {
      cookies().set({
        name: 'payload-token',
        value: result.token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      redirect('/')
    } else {
      throw new Error('Token is undefined')
    }
  } catch (error) {
    const typedError = error as any
    if (typedError.type) {
      switch (typedError.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get('email') as string
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  await payload.forgotPassword({
    collection: 'users',
    data: {
      email: email,
    },
    disableEmail: false,
  })
  return 'ok'
}
