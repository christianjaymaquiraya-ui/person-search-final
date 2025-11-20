import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Key, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Security Features</h1>

        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertTitle>Enterprise-Grade Security</AlertTitle>
          <AlertDescription>
            This application implements multiple layers of security to protect user data and prevent unauthorized access.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-6 w-6" />
              Authentication Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>OAuth 2.0 Protocol</strong>
                  <p className="text-sm text-muted-foreground">Industry-standard authentication via Google OAuth</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>No Password Storage</strong>
                  <p className="text-sm text-muted-foreground">Credentials managed by Google, not stored locally</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Database Sessions</strong>
                  <p className="text-sm text-muted-foreground">Server-side session storage with automatic expiration</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Secure Cookies</strong>
                  <p className="text-sm text-muted-foreground">HttpOnly, Secure, SameSite cookies prevent XSS and CSRF</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Protected Routes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>All application routes require authentication:</p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
              <p className="text-primary">✓ / (Home)</p>
              <p className="text-primary">✓ /about</p>
              <p className="text-primary">✓ /database</p>
              <p className="text-primary">✓ /mcp-setup</p>
              <p className="text-primary">✓ /mcp-demo</p>
              <p className="text-primary">✓ /auth-setup</p>
              <p className="text-primary">✓ /security</p>
              <p className="text-primary">✓ /github</p>
              <p className="text-green-500 mt-2">✓ All API routes</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Unauthenticated users are automatically redirected to /login
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6" />
              API Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Server-Side Authentication Checks</strong>
                  <p className="text-sm text-muted-foreground">All server actions verify user session before database operations</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Input Validation</strong>
                  <p className="text-sm text-muted-foreground">Zod schemas validate all person data (name, email, phone)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>SQL Injection Prevention</strong>
                  <p className="text-sm text-muted-foreground">Prisma ORM uses parameterized queries</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Rate Limiting</strong>
                  <p className="text-sm text-muted-foreground">Database connection pooling prevents resource exhaustion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Database Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>SSL/TLS Encryption</strong>
                  <p className="text-sm text-muted-foreground">All database connections use SSL (sslmode=require)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Unique Constraints</strong>
                  <p className="text-sm text-muted-foreground">Email uniqueness enforced at database level</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Connection Pooling</strong>
                  <p className="text-sm text-muted-foreground">Neon connection pooler prevents connection exhaustion</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Environment Variable Protection</strong>
                  <p className="text-sm text-muted-foreground">Credentials stored in .env, never committed to Git</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              MCP Server Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Advanced Implementation</AlertTitle>
              <AlertDescription>
                The MCP server can be secured with OAuth tokens to ensure only authenticated Claude Desktop sessions can perform database operations.
              </AlertDescription>
            </Alert>
            <div className="space-y-3 mt-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Environment Isolation</strong>
                  <p className="text-sm text-muted-foreground">MCP server uses separate DATABASE_URL configuration</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Input Validation</strong>
                  <p className="text-sm text-muted-foreground">All MCP operations validate parameters before execution</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Error Handling</strong>
                  <p className="text-sm text-muted-foreground">Graceful error responses prevent information leakage</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span>Never commit .env file to version control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Rotate AUTH_SECRET regularly in production</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>Use environment-specific OAuth credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Monitor Neon database logs for suspicious activity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">5.</span>
                <span>Keep dependencies updated for security patches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">6.</span>
                <span>Review OAuth consent screen regularly</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
