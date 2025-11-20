import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github as GithubIcon } from 'lucide-react'

export default function GitHubPage() {
  const githubRepoUrl = "https://github.com/christianjaymaquiraya-ui/person-search-final"
  const mcpServerUrl = "https://github.com/christianjaymaquiraya-ui/person-crud-mcp-server"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">GitHub Repository</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GithubIcon className="h-6 w-6" />
              Person Search Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Access the complete source code for the Person Search application. This repository contains
              all the code for the Next.js application, Prisma database schema, Auth.js implementation,
              and UI components.
            </p>
            <Button asChild>
              <Link href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                View Main Repository
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GithubIcon className="h-6 w-6" />
              Person CRUD MCP Server
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Access the MCP (Model Context Protocol) server repository that enables Person CRUD operations
              through Claude Desktop. This server provides a programmatic interface to interact with the
              Person database.
            </p>
            <Button asChild variant="outline">
              <Link href={mcpServerUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                View MCP Server Repository
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repository Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Complete Next.js 15 application with App Router</li>
              <li>Prisma ORM with PostgreSQL (Neon) database</li>
              <li>Auth.js (NextAuth v5) with Google OAuth</li>
              <li>Protected routes and middleware</li>
              <li>Responsive UI with Tailwind CSS and shadcn/ui components</li>
              <li>TypeScript for type safety</li>
              <li>Person CRUD operations with validation</li>
              <li>MCP server for Claude Desktop integration</li>
            </ul>
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
