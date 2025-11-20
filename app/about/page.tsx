import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Shield, Terminal, Layout } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Person Search Application</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Person Search is a comprehensive full-stack application demonstrating modern web development practices
              for a BSIT internship project. It provides complete CRUD (Create, Read, Update, Delete) functionality
              for managing person records with enterprise-grade security and database integration.
            </p>
            <p className="mb-4">
              This application showcases professional-level implementation of authentication, database management,
              and API integration, serving as a practical example of production-ready web development.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-6 w-6" />
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Next.js 15 (App Router)</li>
                  <li>React 19</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>shadcn/ui Components</li>
                  <li>React Hook Form + Zod</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Backend</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Next.js API Routes</li>
                  <li>Server Actions</li>
                  <li>Prisma ORM</li>
                  <li>PostgreSQL (Neon)</li>
                  <li>Auth.js (NextAuth v5)</li>
                  <li>MCP Server Protocol</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Database Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              <strong>Neon Serverless PostgreSQL</strong> with Prisma ORM for type-safe database operations.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Person Model:</strong> Core CRUD entity with name, email, phone number, timestamps</p>
              <p><strong>Auth Models:</strong> User, Account, Session, VerificationToken for OAuth management</p>
              <p><strong>Migrations:</strong> Version-controlled schema changes with Prisma Migrate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Authentication & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Google OAuth 2.0 authentication via Auth.js</li>
              <li>Protected routes with middleware</li>
              <li>Database-persisted sessions</li>
              <li>Server-side authentication checks on all CRUD operations</li>
              <li>Input validation with Zod schemas</li>
              <li>SQL injection prevention via Prisma</li>
              <li>SSL-encrypted database connections</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              MCP Server Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Model Context Protocol (MCP) server enables Claude Desktop to perform Person CRUD operations:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Create new person records</li>
              <li>Search persons by name</li>
              <li>Update existing records</li>
              <li>Delete persons</li>
              <li>List all persons</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Complete CRUD operations for Person entities</li>
              <li>Real-time search with server-side filtering</li>
              <li>Google OAuth authentication</li>
              <li>Protected routes requiring authentication</li>
              <li>Responsive design (mobile, tablet, desktop)</li>
              <li>Dark mode support</li>
              <li>Form validation with error handling</li>
              <li>Database-backed session management</li>
              <li>MCP server for AI integration</li>
              <li>Comprehensive documentation pages</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About the Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Developed by a <strong>BSIT 3rd Year student majoring in Web Development</strong> as part of an internship
              weekly task demonstrating full-stack development capabilities.
            </p>
            <p className="text-sm text-muted-foreground">
              This project fulfills requirements for Weeks 3-5, including Person CRUD functionality, database integration,
              MCP server implementation, and OAuth authentication with comprehensive documentation.
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

