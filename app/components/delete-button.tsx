'use client'

import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deletePerson } from '@/app/actions/actions'
import { toast } from "@/hooks/use-toast"

export default function DeleteButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    console.log('DeleteButton: Attempting to delete person with ID', userId)
    const result = await deletePerson(userId)
    
    if (result.success) {
      toast({
        title: "Person Deleted",
        description: `Person with ID ${userId} has been deleted successfully.`,
        variant: "default",
      })
      // Reload the page to reflect changes
      window.location.href = '/'
    } else {
      console.error('DeleteButton: Error deleting person', result.error)
      toast({
        title: "Error",
        description: result.error || "An error occurred while deleting the person.",
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
