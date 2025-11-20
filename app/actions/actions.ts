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

export async function addPerson(data: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data?: Person; error?: string }> {
  try {
    await checkAuth()
    
    const validatedData = personSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data)
    
    const newPerson = await prisma.person.create({
      data: validatedData,
    })
    
    revalidatePath('/')
    return { success: true, data: newPerson }
  } catch (error) {
    console.error('Error adding person:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to add person' }
  }
}

export async function deletePerson(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await checkAuth()
    
    await prisma.person.delete({
      where: { id },
    })
    
    console.log(`Person with id ${id} has been deleted.`)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting person:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete person' }
  }
}

export async function updatePerson(id: string, data: Partial<Omit<Person, 'id' | 'createdAt' | 'updatedAt'>>): Promise<{ success: boolean; data?: Person; error?: string }> {
  try {
    await checkAuth()
    
    const updatedPerson = await prisma.person.update({
      where: { id },
      data,
    })
    
    console.log(`Person with id ${id} has been updated.`)
    revalidatePath('/')
    
    return { success: true, data: updatedPerson }
  } catch (error) {
    console.error('Error updating person:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update person' }
  }
}

export const getPersonById = cache(async (id: string) => {
  await checkAuth()
  
  const person = await prisma.person.findUnique({
    where: { id },
  })
  
  return person || null
})

export async function getAllPersons(): Promise<{ success: boolean; data?: Person[]; error?: string }> {
  try {
    await checkAuth()
    
    const persons = await prisma.person.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return { success: true, data: persons }
  } catch (error) {
    console.error('Error fetching persons:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch persons' }
  }
}
