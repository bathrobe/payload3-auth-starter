import type { CollectionConfig } from 'payload/types'

const rootUrl = process.env.PROJECT_URL

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/verify?token=${token}`
        return `Welcome!
        
        Verify your email by clicking <a href="${url}">here</a>.`
      },
    },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/reset?token=${token}`
        return `<p>Reset your password by clicking <a href="${url}">here</a>.</p>`
      },
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
