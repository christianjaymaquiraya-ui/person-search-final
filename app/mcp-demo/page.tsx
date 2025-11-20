import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, PlayCircle, Database } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function MCPDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">MCP Server Demo</h1>

        <Alert className="mb-8">
          <PlayCircle className="h-4 w-4" />
          <AlertDescription>
            This page demonstrates MCP server operations through Claude Desktop for Person CRUD functionality.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              Example 1: Create Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Ask Claude Desktop:</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="italic">&quot;Create a new person named Maria Santos with email maria@example.com and phone 0412345678&quot;</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
              <p className="text-green-600"># MCP Server Response:</p>
              <pre className="mt-2">{`{
  "id": "clxxx123456",
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phoneNumber": "0412345678",
  "createdAt": "2025-11-20T10:30:00.000Z",
  "updatedAt": "2025-11-20T10:30:00.000Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Example 2: Search Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Ask Claude Desktop:</p>
            <div className="bg-muted p-4 rounded-lg">
                            <p className="italic">&quot;Search for people with &apos;john&apos; in their name&quot;</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
              <p className="text-green-600"># MCP Server Response:</p>
              <pre className="mt-2">{`[
  {
    "id": "clxxx123457",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "0423456789"
  },
  {
    "id": "clxxx123458",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "phoneNumber": "0434567890"
  }
]`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              Example 3: Update Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Ask Claude Desktop:</p>
            <div className="bg-muted p-4 rounded-lg">
                            <p className="italic">&quot;Update person with ID clxxx123456 to change their email to newemail@example.com&quot;</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
              <p className="text-green-600"># MCP Server Response:</p>
              <pre className="mt-2">{`{
  "id": "clxxx123456",
  "name": "Maria Santos",
  "email": "maria.new@example.com",
  "phoneNumber": "0412345678",
  "updatedAt": "2025-11-20T11:15:00.000Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              Example 4: Delete Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Ask Claude Desktop:</p>
            <div className="bg-muted p-4 rounded-lg">
                            <p className="italic">&quot;Delete person with ID clxxx123456&quot;</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
              <p className="text-green-600"># MCP Server Response:</p>
              <pre className="mt-2">{`{
  "success": true,
  "message": "Person deleted successfully"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing the MCP Server</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>Ensure the MCP server is properly configured in Claude Desktop</li>
              <li>Restart Claude Desktop after configuration</li>
              <li>Open a new conversation with Claude</li>
              <li>Ask Claude to perform any of the Person CRUD operations</li>
              <li>The MCP server will execute the operation against your Neon database</li>
              <li>Results will be displayed in the conversation</li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/mcp-setup">← Setup Instructions</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
