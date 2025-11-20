'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addPerson, updatePerson, deletePerson, getAllPersons } from '@/app/actions/actions'
import { toast } from 'sonner'

type Person = {
  id: string
  name: string
  email: string
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export default function MCPDemoPage() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  })

  // Poll database every 3 seconds
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const result = await getAllPersons()
        if (result.success && result.data) {
          setPeople(result.data as Person[])
        }
      } catch (error) {
        console.error('Error fetching people:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPeople()
    const interval = setInterval(fetchPeople, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleAdd = async () => {
    if (!newPerson.name || !newPerson.email || !newPerson.phoneNumber) {
      toast.error('Please fill in all required fields')
      return
    }

    const result = await addPerson({
      name: newPerson.name,
      email: newPerson.email,
      phoneNumber: newPerson.phoneNumber
    })

    if (result.success) {
      toast.success('Person created successfully')
      setNewPerson({ name: '', email: '', phoneNumber: '' })
      // Refresh list
      const updated = await getAllPersons()
      if (updated.success && updated.data) setPeople(updated.data as Person[])
    } else {
      toast.error(result.error || 'Failed to create person')
    }
  }

  const handleEdit = (person: Person) => {
    setEditingId(person.id)
    setEditForm({
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber
    })
  }

  const handleUpdate = async (id: string) => {
    const result = await updatePerson(id, {
      name: editForm.name,
      email: editForm.email,
      phoneNumber: editForm.phoneNumber
    })

    if (result.success) {
      toast.success('Person updated successfully')
      setEditingId(null)
      // Refresh list
      const updated = await getAllPersons()
      if (updated.success && updated.data) setPeople(updated.data as Person[])
    } else {
      toast.error(result.error || 'Failed to update person')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this person?')) return

    const result = await deletePerson(id)
    if (result.success) {
      toast.success('Person deleted successfully')
      // Refresh list
      const updated = await getAllPersons()
      if (updated.success && updated.data) setPeople(updated.data as Person[])
    } else {
      toast.error(result.error || 'Failed to delete person')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">MCP Demo: Live CRUD</h1>

        <Alert className="mb-8">
          <AlertDescription>
            This page polls the database every few seconds and shows all Person records. When your MCP server performs create, update, or delete operations via Claude Desktop, you will see the changes appear here. You can also create/update/delete manually using the controls below to verify end-to-end behavior.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How this demo works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>This page polls the database every few seconds and shows all Person records. When your MCP server performs create, update, or delete operations via Claude Desktop, you will see the changes appear here.</p>
            <p>You can also create/update/delete manually using the controls below to verify end-to-end behavior.</p>
            <p>For setup instructions, see <Link href="/mcp-setup" className="text-primary underline">mcp-setup</Link>.</p>
          </CardContent>
        </Card>

        {/* Create Person Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Person</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Name"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newPerson.email}
                onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={newPerson.phoneNumber}
                onChange={(e) => setNewPerson({ ...newPerson, phoneNumber: e.target.value })}
              />
              <Button onClick={handleAdd} className="w-full">Add</Button>
            </div>
          </CardContent>
        </Card>

        {/* People List */}
        <Card>
          <CardHeader>
            <CardTitle>People ({people.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : people.length === 0 ? (
              <p className="text-muted-foreground">No people found. Create one above!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((person, index) => (
                      <tr key={person.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm">{index + 1}</td>
                        <td className="py-3 px-4">
                          {editingId === person.id ? (
                            <Input
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            person.name
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingId === person.id ? (
                            <Input
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            person.email
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingId === person.id ? (
                            <Input
                              value={editForm.phoneNumber}
                              onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            person.phoneNumber
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {editingId === person.id ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleUpdate(person.id)}
                                  className="h-8"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                  className="h-8"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(person)}
                                  className="h-8"
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(person.id)}
                                  className="h-8"
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/mcp-setup">MCP Setup</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">About</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/github">GitHub</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
