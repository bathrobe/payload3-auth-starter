import type { CollectionConfig } from 'payload/types'

export const Administrators: CollectionConfig = {
  slug: 'administrators',
  labels: { plural: 'Administrators', singular: 'Administrator' },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
