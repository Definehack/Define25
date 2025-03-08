import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Plane,
  Search,
  Filter,
  ArrowLeft,
  Luggage,
  Building2,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HubPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkyOps</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/flights"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Flights
            </Link>
            <Link
              href="/maintenance"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Maintenance
            </Link>
            <Link href="/hub" className="text-sm font-medium text-primary">
              Hub Management
            </Link>
            <Link
              href="/reports"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-10">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hub Management</h1>
              <p className="text-muted-foreground">Monitor luggage processing and terminal operations</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8 w-full md:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Luggage className="h-5 w-5 mr-2" />
                  Luggage Processed Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,842</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "98.7%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">98.7% successfully routed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Terminal Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">76%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "76%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Current terminal utilization</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Mishandled Luggage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0.3%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "0.3%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">12 items requiring attention</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="luggage" className="space-y-4">
            <TabsList>
              <TabsTrigger value="luggage">Luggage Management</TabsTrigger>
              <TabsTrigger value="terminals">Terminal Status</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="luggage" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Luggage Processing Status</CardTitle>
                    <CardDescription>Real-time luggage tracking across all terminals</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select terminal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Terminals</SelectItem>
                        <SelectItem value="a">Terminal A</SelectItem>
                        <SelectItem value="b">Terminal B</SelectItem>
                        <SelectItem value="c">Terminal C</SelectItem>
                        <SelectItem value="d">Terminal D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Terminal</TableHead>
                        <TableHead>Processed</TableHead>
                        <TableHead>In Progress</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          terminal: "Terminal A",
                          processed: 1245,
                          inProgress: 124,
                          issues: 2,
                          efficiency: "98.4%",
                        },
                        {
                          terminal: "Terminal B",
                          processed: 986,
                          inProgress: 87,
                          issues: 5,
                          efficiency: "97.8%",
                        },
                        {
                          terminal: "Terminal C",
                          processed: 1102,
                          inProgress: 156,
                          issues: 3,
                          efficiency: "99.1%",
                        },
                        {
                          terminal: "Terminal D",
                          processed: 509,
                          inProgress: 62,
                          issues: 2,
                          efficiency: "99.2%",
                        },
                      ].map((terminal) => (
                        <TableRow key={terminal.terminal}>
                          <TableCell className="font-medium">{terminal.terminal}</TableCell>
                          <TableCell className="text-green-600">{terminal.processed}</TableCell>
                          <TableCell className="text-blue-600">{terminal.inProgress}</TableCell>
                          <TableCell className="text-red-600">{terminal.issues}</TableCell>
                          <TableCell>{terminal.efficiency}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Luggage Transfers</CardTitle>
                  <CardDescription>Latest luggage movements between flights</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>From Flight</TableHead>
                        <TableHead>To Flight</TableHead>
                        <TableHead>Transfer Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "LG-78945",
                          fromFlight: "SK104 (ARN)",
                          toFlight: "SK245 (CDG)",
                          transferTime: "45 min",
                          status: "Completed",
                        },
                        {
                          id: "LG-78946",
                          fromFlight: "SK267 (OSL)",
                          toFlight: "SK371 (AMS)",
                          transferTime: "35 min",
                          status: "In Progress",
                        },
                        {
                          id: "LG-78947",
                          fromFlight: "SK389 (HEL)",
                          toFlight: "SK492 (BER)",
                          transferTime: "50 min",
                          status: "Scheduled",
                        },
                        {
                          id: "LG-78948",
                          fromFlight: "SK512 (FRA)",
                          toFlight: "SK103 (LHR)",
                          transferTime: "30 min",
                          status: "Delayed",
                        },
                      ].map((luggage) => (
                        <TableRow key={luggage.id}>
                          <TableCell className="font-medium">{luggage.id}</TableCell>
                          <TableCell>{luggage.fromFlight}</TableCell>
                          <TableCell>{luggage.toFlight}</TableCell>
                          <TableCell>{luggage.transferTime}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                luggage.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : luggage.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : luggage.status === "Delayed"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {luggage.status === "Completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {luggage.status === "Delayed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {luggage.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Track
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terminals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Terminal Status</CardTitle>
                  <CardDescription>Current operational status of all terminals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        terminal: "Terminal A",
                        gates: 12,
                        activeGates: 10,
                        capacity: "83%",
                        status: "Operational",
                        flights: 24,
                      },
                      {
                        terminal: "Terminal B",
                        gates: 15,
                        activeGates: 12,
                        capacity: "80%",
                        status: "Operational",
                        flights: 28,
                      },
                      {
                        terminal: "Terminal C",
                        gates: 18,
                        activeGates: 15,
                        capacity: "83%",
                        status: "Operational",
                        flights: 32,
                      },
                      {
                        terminal: "Terminal D",
                        gates: 10,
                        activeGates: 6,
                        capacity: "60%",
                        status: "Partial Maintenance",
                        flights: 14,
                      },
                    ].map((terminal) => (
                      <Card key={terminal.terminal} className="border shadow-none">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{terminal.terminal}</CardTitle>
                          <CardDescription>{terminal.status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold">{terminal.gates}</div>
                                <div className="text-xs text-muted-foreground">Total Gates</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">{terminal.activeGates}</div>
                                <div className="text-xs text-muted-foreground">Active Gates</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">{terminal.flights}</div>
                                <div className="text-xs text-muted-foreground">Flights Today</div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Capacity</span>
                                <span>{terminal.capacity}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    Number.parseInt(terminal.capacity) > 90
                                      ? "bg-red-500"
                                      : Number.parseInt(terminal.capacity) > 75
                                        ? "bg-amber-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: terminal.capacity }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Luggage Issues</CardTitle>
                  <CardDescription>Luggage requiring special attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Issue Type</TableHead>
                        <TableHead>Flight</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Time Reported</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "LG-78901",
                          issue: "Damaged Tag",
                          flight: "SK104 (ARN)",
                          location: "Terminal A",
                          reported: "10:15",
                          status: "Pending",
                        },
                        {
                          id: "LG-78902",
                          issue: "Missing Luggage",
                          flight: "SK267 (OSL)",
                          location: "Terminal B",
                          reported: "09:45",
                          status: "In Progress",
                        },
                        {
                          id: "LG-78903",
                          issue: "Routing Error",
                          flight: "SK389 (HEL)",
                          location: "Terminal C",
                          reported: "11:20",
                          status: "Resolved",
                        },
                        {
                          id: "LG-78904",
                          issue: "Special Handling",
                          flight: "SK512 (FRA)",
                          location: "Terminal D",
                          reported: "10:50",
                          status: "In Progress",
                        },
                      ].map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell className="font-medium">{issue.id}</TableCell>
                          <TableCell>{issue.issue}</TableCell>
                          <TableCell>{issue.flight}</TableCell>
                          <TableCell>{issue.location}</TableCell>
                          <TableCell>{issue.reported}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                issue.status === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : issue.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {issue.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              Assign
                            </Button>
                            <Button size="sm">Resolve</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">SkyOps</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SkyOps Flight Operations Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

