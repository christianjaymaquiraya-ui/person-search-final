'use client'

import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deletePerson } from '@/app/actions/actions'
import { toast } from "@/hooks/use-toast"

export default function DeleteButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    try {
      console.log('DeleteButton: Attempting to delete person with ID', userId)
      await deletePerson(userId)
      toast({
        title: "Person Deleted",
        description: `Person with ID ${userId} has been deleted successfully.`,
        variant: "default",
      })
      // Reload the page to reflect changes
      window.location.href = '/'
    } catch (error) {
      console.error('DeleteButton: Error deleting person', error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the person.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handleDelete} variant="destructive" >
      <Trash className="w-4 h-4 mr-2" />
      Delete
    </Button>
  )
}
