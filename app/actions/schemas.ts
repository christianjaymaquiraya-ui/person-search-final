// app/actions/schemas.ts

import { z } from 'zod'

export const personSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().regex(/^04\d{8}$/, { message: "Phone number must be a valid Australian mobile number (e.g., 0422018632)." }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Person = z.infer<typeof personSchema>

export const personFormSchema = personSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type PersonFormData = z.infer<typeof personFormSchema>

// Keep User type for compatibility with existing components (will be renamed to Person)
export type User = Person
export const userSchema = personSchema
export const userFormSchema = personFormSchema
export type UserFormData = PersonFormData
