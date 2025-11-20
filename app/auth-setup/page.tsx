import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Key, Chrome, Lock, Settings } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthSetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Authentication Setup</h1>

        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>OAuth 2.0 with Google</AlertTitle>
          <AlertDescription>
            This application uses Auth.js (NextAuth v5) with Google OAuth for secure authentication.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="h-6 w-6" />
              Step 1: Google Cloud Console Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-3">
              <li>Go to <Link href="https://console.cloud.google.com" target="_blank" className="text-primary hover:underline">Google Cloud Console</Link></li>
              <li>Create a new project or select an existing one</li>
              <li>Navigate to &quot;APIs &amp; Services&quot; → &quot;Credentials&quot;</li>
              <li>Click &quot;Create Credentials&quot; → &quot;OAuth 2.0 Client ID&quot;</li>
              <li>Configure the OAuth consent screen if prompted</li>
              <li>Set Application Type to &quot;Web application&quot;</li>
              <li>Add authorized redirect URIs:
                <div className="bg-muted p-3 rounded-lg font-mono text-sm mt-2 ml-6">
                  <p>http://localhost:3000/api/auth/callback/google</p>
                  <p>https://yourdomain.vercel.app/api/auth/callback/google</p>
                </div>
              </li>
              <li>Save and copy your Client ID and Client Secret</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6" />
              Step 2: Environment Variables
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Add the following to your <code className="bg-muted px-2 py-1 rounded">.env</code> file:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p className="text-gray-400"># Database</p>
              <p>DATABASE_URL=your_neon_database_url</p>
              <p className="mt-3 text-gray-400"># Auth.js (NextAuth v5)</p>
              <p>AUTH_SECRET=your_secret_key_min_32_chars</p>
              <p>AUTH_GOOGLE_ID=your_google_client_id</p>
              <p>AUTH_GOOGLE_SECRET=your_google_client_secret</p>
              <p className="mt-3 text-gray-400"># Base URL</p>
              <p>NEXTAUTH_URL=http://localhost:3000</p>
            </div>
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Generate a secure AUTH_SECRET using: <code className="bg-muted px-2 py-1 rounded">openssl rand -base64 32</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Step 3: Auth.js Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The application is configured with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Adapter:</strong> PrismaAdapter for database session storage</li>
              <li><strong>Provider:</strong> Google OAuth 2.0</li>
              <li><strong>Session Strategy:</strong> Database (not JWT)</li>
              <li><strong>Custom Pages:</strong> Custom /login page</li>
              <li><strong>Callbacks:</strong> Session callback to include user ID</li>
            </ul>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database" }
})`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Step 4: Protected Routes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Middleware protects all routes except /login:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre>{`// middleware.ts
export default auth((req) => {
  if (!req.auth && pathname !== "/login") {
    return NextResponse.redirect("/login")
  }
})`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li>User visits any protected page</li>
              <li>Middleware checks for active session</li>
              <li>If not authenticated, redirect to /login</li>
              <li>User clicks &quot;Sign in with Google&quot;</li>
              <li>OAuth flow with Google</li>
              <li>User grants permissions</li>
              <li>Auth.js creates user/account/session in database</li>
              <li>User is redirected to the homepage</li>
              <li>Session persists across page refreshes</li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/security">Security Features →</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
