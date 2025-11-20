// app/components/user-dialog.tsx
'use client'

import { addPerson } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState }  from '@/components/mutable-dialog'

export function UserDialog() {
  const handleAddUser = async (data: UserFormData): Promise<ActionState<User>> => {
    const result = await addPerson(data)
    
    if (result.success && result.data) {
      // Reload page to show new person
      window.location.href = '/'
      return {
        success: true,
        message: `Person ${result.data.name} added successfully`,
        data: result.data
      }
    } else {
      return {
        success: false,
        message: result.error || 'Failed to add person'
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