// app/components/user-dialog.tsx
'use client'

import { addPerson } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState }  from '@/components/mutable-dialog'

export function UserDialog() {
  const handleAddUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const newPerson = await addPerson(data)
      // Reload page to show new person
      window.location.href = '/'
      return {
        success: true,
        message: `Person ${newPerson.name} added successfully`,
        data: newPerson
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add person: ' + (error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleAddUser}
      triggerButtonLabel="Add Person"
      addDialogTitle="Add New Person"
      dialogDescription="Fill out the form below to add a new person to the database."
      submitButtonLabel="Save"
      defaultValues={{ name: '', email: '', phoneNumber: '' }}
    />
  )
}