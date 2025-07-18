"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Users, Calendar, DollarSign, TrendingUp } from "lucide-react"

export default function UniversityStudentAgent() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testEndpoint = async (endpoint: string, method = "GET", body?: any) => {
    setLoading(true)
    try {
      const options: RequestInit = { method }
      if (body) {
        options.headers = { "Content-Type": "application/json" }
        options.body = JSON.stringify(body)
      }

      const res = await fetch(endpoint, options)
      const data = await res.json()
      setTestResults({ endpoint, data, status: res.status })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setTestResults({ endpoint, error: errorMessage, status: "Error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            University Student Assistant
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Your personal AI agent for managing university life! Track grades, assignments, study groups, campus
            bookings, and finances. Perfect for Australian ICT students! 🇦🇺
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              No API Key Required
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Mock Data Demo
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              MCP + ChatGPT Compatible
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <GraduationCap className="h-5 w-5" />
                Academic Progress
              </CardTitle>
              <CardDescription>Check GPA, completed subjects, and degree progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/profile")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                📊 View Profile & GPA
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/profile?include_gpa_breakdown=true")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                📈 Detailed GPA Breakdown
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/academic-planning?action=degree_progress")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                🎓 Degree Progress
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <BookOpen className="h-5 w-5" />
                Assignment Tracker
              </CardTitle>
              <CardDescription>Manage assignments, deadlines, and submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/assignments")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                📝 All Assignments
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/assignments?filter=upcoming")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                ⏰ Upcoming Deadlines
              </Button>
              <Button
                onClick={() =>
                  testEndpoint("/api/student/assignments", "POST", {
                    assignmentId: "a2",
                    status: "completed",
                  })
                }
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                ✅ Mark Assignment Complete
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Users className="h-5 w-5" />
                Study Groups
              </CardTitle>
              <CardDescription>Join groups, schedule meetings, collaborate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/study-groups")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                👥 My Study Groups
              </Button>
              <Button
                onClick={() =>
                  testEndpoint("/api/student/study-groups", "POST", {
                    action: "create",
                    groupName: "AI & Machine Learning Club",
                    subjectCode: "COMP3411",
                  })
                }
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                ➕ Create New Group
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Calendar className="h-5 w-5" />
                Campus Bookings
              </CardTitle>
              <CardDescription>Book study rooms, labs, and facilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/bookings")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                🏢 My Bookings
              </Button>
              <Button
                onClick={() =>
                  testEndpoint("/api/student/bookings", "POST", {
                    facility: "Computer Lab 2",
                    date: "2024-02-25",
                    timeSlot: "14:00-16:00",
                    purpose: "Final project coding session",
                    attendees: 3,
                  })
                }
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                📅 Book Study Room
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <DollarSign className="h-5 w-5" />
                Student Finances
              </CardTitle>
              <CardDescription>Track fees, HECS debt, and textbook costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/finances")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                💰 Complete Financial Overview
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/finances?category=tuition")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                🧾 Tuition Fees Status
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/finances?category=hecs")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                🎓 HECS Debt Info
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <TrendingUp className="h-5 w-5" />
                Academic Planning
              </CardTitle>
              <CardDescription>Course recommendations and graduation planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => testEndpoint("/api/student/academic-planning?action=recommend_courses&semester=T1 2025")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                💡 Course Recommendations
              </Button>
              <Button
                onClick={() => testEndpoint("/api/student/academic-planning?action=graduation_check")}
                variant="outline"
                className="w-full justify-start"
                disabled={loading}
              >
                🎯 Graduation Readiness
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">🤖 Connect to ChatGPT</CardTitle>
              <CardDescription>Use this agent as a ChatGPT Action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Plugin URL:</h4>
                <code className="text-sm bg-white p-2 rounded border block break-all">
                  https://your-app.vercel.app/.well-known/ai-plugin.json
                </code>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Steps to add to ChatGPT:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Go to ChatGPT Settings → Beta Features</li>
                  <li>Enable "Actions" if not already enabled</li>
                  <li>Create new Action and paste the URL above</li>
                  <li>ChatGPT will auto-configure from the OpenAPI spec</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">🔗 Connect to Claude</CardTitle>
              <CardDescription>Use this agent via MCP (Model Context Protocol)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">MCP Server URL:</h4>
                <code className="text-sm bg-white p-2 rounded border block break-all">
                  https://your-app.vercel.app/api/mcp
                </code>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Add to Claude Desktop config:</p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {`{
  "mcpServers": {
    "university-assistant": {
      "url": "https://your-app.vercel.app/api/mcp"
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {testResults && (
          <Card>
            <CardHeader>
              <CardTitle>🧪 Test Results</CardTitle>
              <CardDescription>Response from: {testResults.endpoint}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={testResults.status === 200 ? "default" : "destructive"}>
                    Status: {testResults.status}
                  </Badge>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(testResults.data || testResults.error, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-center">🎯 Why This Agent is Powerful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🔒 Private Data Access</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Your personal grades and GPA calculations</li>
                  <li>• Assignment deadlines and submission status</li>
                  <li>• Study group memberships and meetings</li>
                  <li>• Campus facility bookings and availability</li>
                  <li>• Financial information (fees, HECS, textbooks)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🚀 Beyond Public APIs</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Personalized academic planning</li>
                  <li>• Context-aware course recommendations</li>
                  <li>• Integrated university systems access</li>
                  <li>• Custom business logic for your institution</li>
                  <li>• Real-time updates to your personal data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
