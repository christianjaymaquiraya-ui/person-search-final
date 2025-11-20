'use client'

import { updatePerson } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserEditDialogProps {
  user: User
}

export function UserEditDialog({ user }: UserEditDialogProps) {
  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    const result = await updatePerson(user.id, data)
    
    if (result.success && result.data) {
      // Reload page to show updated person
      window.location.href = '/'
      return {
        success: true,
        message: `Person ${result.data.name} updated successfully`,
        data: result.data,
      }
    } else {
      return {
        success: false,
        message: result.error || 'Failed to update person',
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${user.name}`}
      dialogDescription={`Update the details of ${user.name} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }}
    />
  )
}
