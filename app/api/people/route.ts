import { NextRequest, NextResponse } from 'next/server'
import { Person } from '@/app/actions/schemas'
import { searchPerson, getAllPersons } from '@/app/actions/actions'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    let persons: Person[]

    if (query) {
      persons = await searchPerson(query)
    } else {
      const result = await getAllPersons()
      if (!result.success || !result.data) {
        return NextResponse.json({ error: result.error || 'Failed to fetch persons' }, { status: 500 })
      }
      persons = result.data
    }

    if (persons.length === 0) {
      return NextResponse.json({ message: 'No persons found' }, { status: 404 })
    }

    return NextResponse.json(persons)
  } catch (error) {
    console.error('Error searching persons:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}