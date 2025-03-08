import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plane, Search, Filter, CheckCircle2, AlertTriangle, Clock, ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FlightsPage() {
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
            <Link href="/flights" className="text-sm font-medium text-primary">
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
              <h1 className="text-3xl font-bold tracking-tight">Flight Operations</h1>
              <p className="text-muted-foreground">Monitor and manage all flight arrivals and departures</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search flights..." className="pl-8 w-full md:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Flights</TabsTrigger>
              <TabsTrigger value="departures">Departures</TabsTrigger>
              <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Flights</CardTitle>
                  <CardDescription>Showing all scheduled flights for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Flight</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Estimated</TableHead>
                        <TableHead>Gate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "SK103",
                          route: "Copenhagen (CPH) → London (LHR)",
                          scheduled: "10:15",
                          estimated: "10:15",
                          gate: "A12",
                          status: "On Time",
                          type: "departure",
                        },
                        {
                          id: "SK104",
                          route: "Stockholm (ARN) → Copenhagen (CPH)",
                          scheduled: "09:45",
                          estimated: "09:45",
                          gate: "D15",
                          status: "Landed",
                          type: "arrival",
                        },
                        {
                          id: "SK245",
                          route: "Copenhagen (CPH) → Paris (CDG)",
                          scheduled: "10:30",
                          estimated: "10:30",
                          gate: "B04",
                          status: "Boarding",
                          type: "departure",
                        },
                        {
                          id: "SK267",
                          route: "Oslo (OSL) → Copenhagen (CPH)",
                          scheduled: "10:05",
                          estimated: "10:05",
                          gate: "E02",
                          status: "Landed",
                          type: "arrival",
                        },
                        {
                          id: "SK371",
                          route: "Copenhagen (CPH) → Amsterdam (AMS)",
                          scheduled: "10:45",
                          estimated: "11:15",
                          gate: "C22",
                          status: "Delayed",
                          type: "departure",
                        },
                        {
                          id: "SK389",
                          route: "Helsinki (HEL) → Copenhagen (CPH)",
                          scheduled: "10:20",
                          estimated: "10:20",
                          gate: "D10",
                          status: "Approaching",
                          type: "arrival",
                        },
                        {
                          id: "SK492",
                          route: "Copenhagen (CPH) → Berlin (BER)",
                          scheduled: "11:00",
                          estimated: "11:00",
                          gate: "A08",
                          status: "On Time",
                          type: "departure",
                        },
                        {
                          id: "SK512",
                          route: "Frankfurt (FRA) → Copenhagen (CPH)",
                          scheduled: "10:40",
                          estimated: "11:10",
                          gate: "E08",
                          status: "Delayed",
                          type: "arrival",
                        },
                      ].map((flight) => (
                        <TableRow key={flight.id}>
                          <TableCell className="font-medium">{flight.id}</TableCell>
                          <TableCell>{flight.route}</TableCell>
                          <TableCell>{flight.scheduled}</TableCell>
                          <TableCell>{flight.estimated}</TableCell>
                          <TableCell>{flight.gate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {flight.status === "On Time" && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />}
                              {flight.status === "Delayed" && <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />}
                              {flight.status === "Boarding" && <Clock className="h-4 w-4 text-blue-500 mr-1" />}
                              {flight.status}
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

            <TabsContent value="departures" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Departures</CardTitle>
                  <CardDescription>All outbound flights from Copenhagen Airport</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Flight</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Estimated</TableHead>
                        <TableHead>Gate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "SK103",
                          destination: "London (LHR)",
                          scheduled: "10:15",
                          estimated: "10:15",
                          gate: "A12",
                          status: "On Time",
                        },
                        {
                          id: "SK245",
                          destination: "Paris (CDG)",
                          scheduled: "10:30",
                          estimated: "10:30",
                          gate: "B04",
                          status: "Boarding",
                        },
                        {
                          id: "SK371",
                          destination: "Amsterdam (AMS)",
                          scheduled: "10:45",
                          estimated: "11:15",
                          gate: "C22",
                          status: "Delayed",
                        },
                        {
                          status: "Delayed",
                        },
                        {
                          id: "SK492",
                          destination: "Berlin (BER)",
                          scheduled: "11:00",
                          estimated: "11:00",
                          gate: "A08",
                          status: "On Time",
                        },
                        {
                          id: "SK624",
                          destination: "Madrid (MAD)",
                          scheduled: "11:30",
                          estimated: "11:30",
                          gate: "B12",
                          status: "On Time",
                        },
                        {
                          id: "SK738",
                          destination: "Rome (FCO)",
                          scheduled: "12:15",
                          estimated: "12:45",
                          gate: "C10",
                          status: "Delayed",
                        },
                      ].map((flight) => (
                        <TableRow key={flight.id}>
                          <TableCell className="font-medium">{flight.id}</TableCell>
                          <TableCell>{flight.destination}</TableCell>
                          <TableCell>{flight.scheduled}</TableCell>
                          <TableCell>{flight.estimated}</TableCell>
                          <TableCell>{flight.gate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {flight.status === "On Time" && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />}
                              {flight.status === "Delayed" && <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />}
                              {flight.status === "Boarding" && <Clock className="h-4 w-4 text-blue-500 mr-1" />}
                              {flight.status}
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

            <TabsContent value="arrivals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Arrivals</CardTitle>
                  <CardDescription>All inbound flights to Copenhagen Airport</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Flight</TableHead>
                        <TableHead>Origin</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Estimated</TableHead>
                        <TableHead>Gate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "SK104",
                          origin: "Stockholm (ARN)",
                          scheduled: "09:45",
                          estimated: "09:45",
                          gate: "D15",
                          status: "Landed",
                        },
                        {
                          id: "SK267",
                          origin: "Oslo (OSL)",
                          scheduled: "10:05",
                          estimated: "10:05",
                          gate: "E02",
                          status: "Landed",
                        },
                        {
                          id: "SK389",
                          origin: "Helsinki (HEL)",
                          scheduled: "10:20",
                          estimated: "10:20",
                          gate: "D10",
                          status: "Approaching",
                        },
                        {
                          id: "SK512",
                          origin: "Frankfurt (FRA)",
                          scheduled: "10:40",
                          estimated: "11:10",
                          gate: "E08",
                          status: "Delayed",
                        },
                        {
                          id: "SK635",
                          origin: "Barcelona (BCN)",
                          scheduled: "11:15",
                          estimated: "11:15",
                          gate: "D05",
                          status: "On Time",
                        },
                      ].map((flight) => (
                        <TableRow key={flight.id}>
                          <TableCell className="font-medium">{flight.id}</TableCell>
                          <TableCell>{flight.origin}</TableCell>
                          <TableCell>{flight.scheduled}</TableCell>
                          <TableCell>{flight.estimated}</TableCell>
                          <TableCell>{flight.gate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {flight.status === "On Time" && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />}
                              {flight.status === "Delayed" && <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />}
                              {flight.status === "Landed" && <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />}
                              {flight.status === "Approaching" && <Clock className="h-4 w-4 text-blue-500 mr-1" />}
                              {flight.status}
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

            <TabsContent value="delayed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delayed Flights</CardTitle>
                  <CardDescription>All flights currently experiencing delays</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Flight</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Estimated</TableHead>
                        <TableHead>Delay</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "SK371",
                          route: "Copenhagen (CPH) → Amsterdam (AMS)",
                          scheduled: "10:45",
                          estimated: "11:15",
                          delay: "30 min",
                          reason: "Technical check",
                        },
                        {
                          id: "SK512",
                          route: "Frankfurt (FRA) → Copenhagen (CPH)",
                          scheduled: "10:40",
                          estimated: "11:10",
                          delay: "30 min",
                          reason: "Late arrival of aircraft",
                        },
                        {
                          id: "SK738",
                          route: "Copenhagen (CPH) → Rome (FCO)",
                          scheduled: "12:15",
                          estimated: "12:45",
                          delay: "30 min",
                          reason: "Crew scheduling",
                        },
                      ].map((flight) => (
                        <TableRow key={flight.id}>
                          <TableCell className="font-medium">{flight.id}</TableCell>
                          <TableCell>{flight.route}</TableCell>
                          <TableCell>{flight.scheduled}</TableCell>
                          <TableCell>{flight.estimated}</TableCell>
                          <TableCell className="text-amber-500">{flight.delay}</TableCell>
                          <TableCell>{flight.reason}</TableCell>
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

