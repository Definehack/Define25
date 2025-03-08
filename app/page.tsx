import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plane,
  Clock,
  Wrench,
  Luggage,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Users,
  CalendarClock,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
  <div className="flex items-center gap-2">
    <Plane className="h-6 w-6 text-primary" />
    <span className="text-xl font-bold">SkyOps</span>
  </div>
  <nav className="flex gap-6">
    <Link href="/" className="text-sm font-medium text-primary">
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
    <Link
      href="/hub"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Hub Management
    </Link>
    <Link
      href="/eco-routes"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Eco Routes
    </Link>
  </nav>
  <div className="flex items-center gap-4">
    <Link
      href="/train-crew"
      className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Train Crew
    </Link>
    <Button variant="outline" size="sm">
      <Users className="mr-2 h-4 w-4" />
      Login
    </Button>
  </div>
</div>
          
      </header>
      <main className="flex-1">
        <section className="container py-10">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to SkyOps Flight Operations Management System</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Flights Today</CardTitle>
                  <Plane className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">+5% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.4%</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Tasks</CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">8 urgent, 16 scheduled</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Luggage Processing</CardTitle>
                  <Luggage className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,842</div>
                  <p className="text-xs text-muted-foreground">98.7% successfully routed</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="flights" className="space-y-4">
              <TabsList>
                <TabsTrigger value="flights">Flight Operations</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="hub">Hub Management</TabsTrigger>
              </TabsList>
              <TabsContent value="flights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Flight Operations</CardTitle>
                    <CardDescription>Monitor arrivals and departures across all terminals.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Recent Departures</h3>
                        <div className="space-y-2">
                          {[
                            { id: "SK103", destination: "London (LHR)", time: "10:15", status: "On Time", gate: "A12" },
                            { id: "SK245", destination: "Paris (CDG)", time: "10:30", status: "Boarding", gate: "B04" },
                            {
                              id: "SK371",
                              destination: "Amsterdam (AMS)",
                              time: "10:45",
                              status: "Delayed",
                              gate: "C22",
                            },
                            { id: "SK492", destination: "Berlin (BER)", time: "11:00", status: "On Time", gate: "A08" },
                          ].map((flight) => (
                            <div key={flight.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div>
                                <div className="font-medium">{flight.id}</div>
                                <div className="text-sm text-muted-foreground">{flight.destination}</div>
                              </div>
                              <div className="text-right">
                                <div>{flight.time}</div>
                                <div className="text-sm">Gate {flight.gate}</div>
                              </div>
                              <div className="flex items-center">
                                {flight.status === "On Time" && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                                )}
                                {flight.status === "Delayed" && (
                                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                                )}
                                {flight.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Recent Arrivals</h3>
                        <div className="space-y-2">
                          {[
                            { id: "SK104", origin: "Stockholm (ARN)", time: "09:45", status: "Landed", gate: "D15" },
                            { id: "SK267", origin: "Oslo (OSL)", time: "10:05", status: "Landed", gate: "E02" },
                            {
                              id: "SK389",
                              origin: "Helsinki (HEL)",
                              time: "10:20",
                              status: "Approaching",
                              gate: "D10",
                            },
                            { id: "SK512", origin: "Frankfurt (FRA)", time: "10:40", status: "Delayed", gate: "E08" },
                          ].map((flight) => (
                            <div key={flight.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div>
                                <div className="font-medium">{flight.id}</div>
                                <div className="text-sm text-muted-foreground">{flight.origin}</div>
                              </div>
                              <div className="text-right">
                                <div>{flight.time}</div>
                                <div className="text-sm">Gate {flight.gate}</div>
                              </div>
                              <div className="flex items-center">
                                {flight.status === "Landed" && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />}
                                {flight.status === "Delayed" && (
                                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                                )}
                                {flight.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/flights">View All Flights</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="maintenance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <CardDescription>Track aircraft maintenance tasks and schedules.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md bg-amber-50">
                          <h3 className="font-medium flex items-center text-amber-800">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Urgent Tasks
                          </h3>
                          <div className="text-2xl font-bold text-amber-800">8</div>
                          <p className="text-sm text-amber-700">Requires immediate attention</p>
                        </div>
                        <div className="p-4 border rounded-md bg-blue-50">
                          <h3 className="font-medium flex items-center text-blue-800">
                            <Clock className="h-4 w-4 mr-2" />
                            Scheduled Today
                          </h3>
                          <div className="text-2xl font-bold text-blue-800">16</div>
                          <p className="text-sm text-blue-700">Regular maintenance tasks</p>
                        </div>
                        <div className="p-4 border rounded-md bg-green-50">
                          <h3 className="font-medium flex items-center text-green-800">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Completed Today
                          </h3>
                          <div className="text-2xl font-bold text-green-800">12</div>
                          <p className="text-sm text-green-700">Successfully completed tasks</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium">Recent Maintenance Tasks</h3>
                      <div className="space-y-2">
                        {[
                          {
                            id: "MT-1234",
                            aircraft: "Boeing 737-800",
                            task: "Engine Inspection",
                            status: "Urgent",
                            scheduled: "Today, 14:00",
                          },
                          {
                            id: "MT-1235",
                            aircraft: "Airbus A320",
                            task: "Routine Check",
                            status: "Scheduled",
                            scheduled: "Today, 16:30",
                          },
                          {
                            id: "MT-1236",
                            aircraft: "Boeing 787",
                            task: "Avionics Update",
                            status: "Completed",
                            scheduled: "Today, 09:15",
                          },
                          {
                            id: "MT-1237",
                            aircraft: "Airbus A350",
                            task: "Cabin Inspection",
                            status: "Scheduled",
                            scheduled: "Today, 18:00",
                          },
                        ].map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div>
                              <div className="font-medium">{task.id}</div>
                              <div className="text-sm text-muted-foreground">{task.aircraft}</div>
                            </div>
                            <div className="hidden md:block">
                              <div>{task.task}</div>
                            </div>
                            <div className="text-right">
                              <div>{task.scheduled}</div>
                              <div
                                className={`text-sm ${
                                  task.status === "Urgent"
                                    ? "text-red-500"
                                    : task.status === "Completed"
                                      ? "text-green-500"
                                      : "text-blue-500"
                                }`}
                              >
                                {task.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/maintenance">View All Maintenance</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="hub" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hub Management</CardTitle>
                    <CardDescription>Monitor luggage processing and terminal operations.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium">Luggage Processed Today</h3>
                          <div className="text-2xl font-bold">3,842</div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: "98.7%" }}></div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">98.7% successfully routed</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium">Terminal Capacity</h3>
                          <div className="text-2xl font-bold">76%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "76%" }}></div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Current terminal utilization</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h3 className="font-medium">Mishandled Luggage</h3>
                          <div className="text-2xl font-bold">0.3%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "0.3%" }}></div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">12 items requiring attention</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium">Luggage Processing Status</h3>
                      <div className="space-y-2">
                        {[
                          { terminal: "Terminal A", processed: 1245, inProgress: 124, issues: 2 },
                          { terminal: "Terminal B", processed: 986, inProgress: 87, issues: 5 },
                          { terminal: "Terminal C", processed: 1102, inProgress: 156, issues: 3 },
                          { terminal: "Terminal D", processed: 509, inProgress: 62, issues: 2 },
                        ].map((terminal) => (
                          <div
                            key={terminal.terminal}
                            className="flex items-center justify-between p-2 border rounded-md"
                          >
                            <div className="font-medium">{terminal.terminal}</div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Processed</div>
                                <div className="font-medium text-green-600">{terminal.processed}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">In Progress</div>
                                <div className="font-medium text-blue-600">{terminal.inProgress}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Issues</div>
                                <div className="font-medium text-red-600">{terminal.issues}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/hub">View Hub Management</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
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
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

