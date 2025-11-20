//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { Person, personSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// Check if user is authenticated
async function checkAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function searchPerson(query: string): Promise<Person[]> {
  await checkAuth()
  console.log('Searching persons with query:', query)
  
  const results = await prisma.person.findMany({
    where: {
      name: {
        startsWith: query,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
  
  console.log('Search results:', results)
  return results
}

export async function addPerson(data: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person> {
  await checkAuth()
  
  const validatedData = personSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data)
  
  const newPerson = await prisma.person.create({
    data: validatedData,
  })
  
  revalidatePath('/')
  return newPerson
}

export async function deletePerson(id: string): Promise<void> {
  await checkAuth()
  
  await prisma.person.delete({
    where: { id },
  })
  
  console.log(`Person with id ${id} has been deleted.`)
  revalidatePath('/')
}

export async function updatePerson(id: string, data: Partial<Omit<Person, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Person> {
  await checkAuth()
  
  const updatedPerson = await prisma.person.update({
    where: { id },
    data,
  })
  
  console.log(`Person with id ${id} has been updated.`)
  revalidatePath('/')
  
  return updatedPerson
}

export const getPersonById = cache(async (id: string) => {
  await checkAuth()
  
  const person = await prisma.person.findUnique({
    where: { id },
  })
  
  return person || null
})

export async function getAllPersons(): Promise<Person[]> {
  await checkAuth()
  
  const persons = await prisma.person.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  
  return persons
}
