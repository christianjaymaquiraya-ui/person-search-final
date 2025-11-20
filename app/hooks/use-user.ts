'use client'

import { useState, useEffect } from 'react'
import { getPersonById } from '@/app/actions/actions'
import { User } from '@/app/actions/schemas'

export function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (userId) {
      getPersonById(userId).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          setUser(null)
        }
      })
    } else {
      setUser(null)
    }
  }, [userId])

  const mutate = () => {
    if (userId) {
      getPersonById(userId).then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          setUser(null)
        }
      })
    }
  }

  return { user, mutate }
}

