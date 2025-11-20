import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Table, Key, Link as LinkIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function DatabasePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Database Architecture</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Database Provider
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Neon PostgreSQL</Badge>
              <p className="text-muted-foreground">
                Serverless PostgreSQL database hosted on Neon with connection pooling
                for optimal performance in serverless environments.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                Provider: <span className="text-primary">postgresql</span><br />
                Host: <span className="text-primary">ep-proud-paper-a1cuf7u9-pooler.ap-southeast-1.aws.neon.tech</span><br />
                Database: <span className="text-primary">neondb</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-6 w-6" />
              Prisma Schema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Key className="h-5 w-5" />
                Person Model (Main CRUD Entity)
              </h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                <p><span className="text-blue-500">model</span> Person {'{'}</p>
                <p className="ml-4">id          String   <span className="text-gray-500">@id @default(cuid())</span></p>
                <p className="ml-4">name        String</p>
                <p className="ml-4">email       String   <span className="text-gray-500">@unique</span></p>
                <p className="ml-4">phoneNumber String   <span className="text-gray-500">@map(&quot;phone_number&quot;)</span></p>
                <p className="ml-4">createdAt   DateTime <span className="text-gray-500">@default(now())</span></p>
                <p className="ml-4">updatedAt   DateTime <span className="text-gray-500">@updatedAt</span></p>
                <p>{'}'}</p>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground"><strong>Purpose:</strong> Core entity for Person CRUD operations</p>
                <p className="text-sm text-muted-foreground"><strong>Validations:</strong> Unique email, Australian phone format (04XXXXXXXX)</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Authentication Models (NextAuth.js)
              </h3>
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">User</Badge>
                  <p className="text-sm text-muted-foreground">
                    Stores authenticated user information from Google OAuth
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Account</Badge>
                  <p className="text-sm text-muted-foreground">
                    Links users to OAuth providers (Google) with access tokens
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Session</Badge>
                  <p className="text-sm text-muted-foreground">
                    Manages user sessions with database strategy
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">VerificationToken</Badge>
                  <p className="text-sm text-muted-foreground">
                    Handles email verification tokens for authentication flow
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Migrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Prisma Migrate manages database schema changes with version control:
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-primary">npx prisma migrate dev</p>
              <p className="text-muted-foreground mt-2"># Creates and applies migrations in development</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              All migrations are stored in <code className="bg-muted px-2 py-1 rounded">prisma/migrations</code> with
              automatic rollback support.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button asChild variant="link">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
