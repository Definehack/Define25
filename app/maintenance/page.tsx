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
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  CalendarClock,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MaintenancePage() {
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
            <Link href="/maintenance" className="text-sm font-medium text-primary">
              Maintenance
            </Link>
            <Link
              href="/hub"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
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
              <h1 className="text-3xl font-bold tracking-tight">Aircraft Maintenance</h1>
              <p className="text-muted-foreground">Track and manage maintenance tasks for all aircraft</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search tasks..." className="pl-8 w-full md:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button>
                <Wrench className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Urgent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-800">8</div>
                <p className="text-sm text-red-700">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-blue-800">
                  <Clock className="h-5 w-5 mr-2" />
                  Scheduled Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-800">16</div>
                <p className="text-sm text-blue-700">Regular maintenance tasks</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-green-800">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Completed Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-800">12</div>
                <p className="text-sm text-green-700">Successfully completed tasks</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>All Maintenance Tasks</CardTitle>
                    <CardDescription>View and manage all maintenance tasks</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Select defaultValue="today">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Task ID</TableHead>
                        <TableHead>Aircraft</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "MT-1234",
                          aircraft: "Boeing 737-800 (SK-ABC)",
                          task: "Engine Inspection",
                          scheduled: "Today, 14:00",
                          technician: "John Smith",
                          status: "Urgent",
                        },
                        {
                          id: "MT-1235",
                          aircraft: "Airbus A320 (SK-DEF)",
                          task: "Routine Check",
                          scheduled: "Today, 16:30",
                          technician: "Maria Johnson",
                          status: "Scheduled",
                        },
                        {
                          id: "MT-1236",
                          aircraft: "Boeing 787 (SK-GHI)",
                          task: "Avionics Update",
                          scheduled: "Today, 09:15",
                          technician: "Robert Chen",
                          status: "Completed",
                        },
                        {
                          id: "MT-1237",
                          aircraft: "Airbus A350 (SK-JKL)",
                          task: "Cabin Inspection",
                          scheduled: "Today, 18:00",
                          technician: "Sarah Williams",
                          status: "Scheduled",
                        },
                        {
                          id: "MT-1238",
                          aircraft: "Boeing 737-800 (SK-MNO)",
                          task: "Landing Gear Check",
                          scheduled: "Today, 15:30",
                          technician: "David Miller",
                          status: "Urgent",
                        },
                        {
                          id: "MT-1239",
                          aircraft: "Airbus A320 (SK-PQR)",
                          task: "Fuel System Inspection",
                          scheduled: "Today, 11:45",
                          technician: "James Wilson",
                          status: "Completed",
                        },
                      ].map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell>{task.aircraft}</TableCell>
                          <TableCell>{task.task}</TableCell>
                          <TableCell>{task.scheduled}</TableCell>
                          <TableCell>{task.technician}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.status === "Urgent"
                                  ? "bg-red-100 text-red-800"
                                  : task.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {task.status === "Urgent" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {task.status === "Scheduled" && <Clock className="h-3 w-3 mr-1" />}
                              {task.status === "Completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {task.status}
                            </div>
                          </TableCell>
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
            </TabsContent>

            <TabsContent value="urgent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Urgent Maintenance Tasks</CardTitle>
                  <CardDescription>Tasks requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Task ID</TableHead>
                        <TableHead>Aircraft</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "MT-1234",
                          aircraft: "Boeing 737-800 (SK-ABC)",
                          task: "Engine Inspection",
                          scheduled: "Today, 14:00",
                          technician: "John Smith",
                          priority: "High",
                        },
                        {
                          id: "MT-1238",
                          aircraft: "Boeing 737-800 (SK-MNO)",
                          task: "Landing Gear Check",
                          scheduled: "Today, 15:30",
                          technician: "David Miller",
                          priority: "Medium",
                        },
                        {
                          id: "MT-1242",
                          aircraft: "Airbus A320 (SK-STU)",
                          task: "Hydraulic System Check",
                          scheduled: "Today, 13:15",
                          technician: "Emma Davis",
                          priority: "High",
                        },
                      ].map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell>{task.aircraft}</TableCell>
                          <TableCell>{task.task}</TableCell>
                          <TableCell>{task.scheduled}</TableCell>
                          <TableCell>{task.technician}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.priority === "High" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {task.priority}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Assign</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Scheduled Maintenance</CardTitle>
                    <CardDescription>Upcoming regular maintenance tasks</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <CalendarClock className="h-4 w-4 mr-2" />
                      Schedule View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Task ID</TableHead>
                        <TableHead>Aircraft</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "MT-1235",
                          aircraft: "Airbus A320 (SK-DEF)",
                          task: "Routine Check",
                          scheduled: "Today, 16:30",
                          technician: "Maria Johnson",
                          duration: "2 hours",
                        },
                        {
                          id: "MT-1237",
                          aircraft: "Airbus A350 (SK-JKL)",
                          task: "Cabin Inspection",
                          scheduled: "Today, 18:00",
                          technician: "Sarah Williams",
                          duration: "1.5 hours",
                        },
                        {
                          id: "MT-1240",
                          aircraft: "Boeing 787 (SK-VWX)",
                          task: "Navigation System Check",
                          scheduled: "Tomorrow, 09:00",
                          technician: "Michael Brown",
                          duration: "3 hours",
                        },
                        {
                          id: "MT-1241",
                          aircraft: "Airbus A320 (SK-YZA)",
                          task: "Oxygen System Check",
                          scheduled: "Tomorrow, 11:30",
                          technician: "Lisa Taylor",
                          duration: "1 hour",
                        },
                      ].map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell>{task.aircraft}</TableCell>
                          <TableCell>{task.task}</TableCell>
                          <TableCell>{task.scheduled}</TableCell>
                          <TableCell>{task.technician}</TableCell>
                          <TableCell>{task.duration}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              Reschedule
                            </Button>
                            <Button size="sm">Start</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Maintenance</CardTitle>
                  <CardDescription>Recently completed maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Task ID</TableHead>
                        <TableHead>Aircraft</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Technician</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "MT-1236",
                          aircraft: "Boeing 787 (SK-GHI)",
                          task: "Avionics Update",
                          completed: "Today, 10:30",
                          technician: "Robert Chen",
                          notes: "All systems functioning normally",
                        },
                        {
                          id: "MT-1239",
                          aircraft: "Airbus A320 (SK-PQR)",
                          task: "Fuel System Inspection",
                          completed: "Today, 12:15",
                          technician: "James Wilson",
                          notes: "Minor issue fixed, documented in report",
                        },
                        {
                          id: "MT-1230",
                          aircraft: "Boeing 737-800 (SK-BCD)",
                          task: "Routine Maintenance",
                          completed: "Yesterday, 16:45",
                          technician: "Anna Martinez",
                          notes: "No issues found",
                        },
                      ].map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.id}</TableCell>
                          <TableCell>{task.aircraft}</TableCell>
                          <TableCell>{task.task}</TableCell>
                          <TableCell>{task.completed}</TableCell>
                          <TableCell>{task.technician}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{task.notes}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Report
                            </Button>
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

