import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, Download, Settings, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MCPSetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">MCP Server Setup</h1>

        <Alert className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Model Context Protocol (MCP)</AlertTitle>
          <AlertDescription>
            The Person CRUD MCP Server enables Claude Desktop to perform database operations through a structured protocol.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-6 w-6" />
              Step 1: Clone the MCP Server
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Clone the Person CRUD MCP Server repository:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-primary">git clone https://github.com/christianjaymaquiraya-ui/person-crud-mcp-server.git</p>
              <p className="mt-2">cd person-crud-mcp-server</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Step 2: Install Dependencies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Install required Node.js packages:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-primary">npm install</p>
              <p className="text-muted-foreground mt-2"># or</p>
              <p className="text-primary">pnpm install</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              Step 3: Configure Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Create a <code className="bg-muted px-2 py-1 rounded">.env</code> file with your database credentials:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-gray-400"># .env</p>
              <p className="mt-2 text-primary">DATABASE_URL=postgresql://username:password@host/database</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Use the same DATABASE_URL from your main application for consistency.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Step 4: Configure Claude Desktop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Add the MCP server to Claude Desktop configuration:</p>
            <div className="space-y-3">
              <div>
                <Badge className="mb-2">Windows</Badge>
                <p className="text-sm text-muted-foreground mb-2">
                  Edit <code className="bg-muted px-2 py-1 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>
                </p>
              </div>
              <div>
                <Badge className="mb-2">macOS</Badge>
                <p className="text-sm text-muted-foreground mb-2">
                  Edit <code className="bg-muted px-2 py-1 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                </p>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": [
        "/absolute/path/to/person-crud-mcp-server/dist/index.js"
      ],
      "env": {
        "DATABASE_URL": "your_database_url_here"
      }
    }
  }
}`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              Step 5: Build and Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Build the TypeScript server:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-primary">npm run build</p>
            </div>
            <p className="mt-4">Restart Claude Desktop to load the MCP server.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Available MCP Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <strong>createPerson</strong> - Add new person records
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <strong>searchPerson</strong> - Find persons by name query
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <strong>updatePerson</strong> - Modify existing person records
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <strong>deletePerson</strong> - Remove person records
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <strong>getAllPersons</strong> - List all person records
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/mcp-demo">View MCP Demo →</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary ${className}`}>
      {children}
    </span>
  )
}
