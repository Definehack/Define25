import FlightMap from "@/components/flight-map"
import PopularRoutes from "@/components/popular-routes"
import RouteSearch from "@/components/route-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <h1 className="text-xl font-bold">EcoFlight</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600">
              Home
            </Link>
            <a href="#" className="text-sm font-medium hover:text-green-600">
              About
            </a>
            <a href="#" className="text-sm font-medium hover:text-green-600">
              Contact
            </a>
            <a href="#" className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Sign In
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Eco-Friendly Flight Routes</h2>
          <p className="text-gray-600 mb-6">
            Discover flight routes with lower carbon emissions and help reduce your environmental impact while
            traveling.
          </p>

          <RouteSearch />
        </div>

        <Tabs defaultValue="map" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="popular">Popular Routes</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="bg-white rounded-lg shadow-md p-4">
            <FlightMap />
          </TabsContent>
          <TabsContent value="popular" className="bg-white rounded-lg shadow-md p-4">
            <PopularRoutes />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EcoFlight</h3>
              <p className="text-gray-300 text-sm">
                Helping travelers make environmentally conscious choices with lower carbon emission flight routes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-green-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    Carbon Offset Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    Partner Airlines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: info@ecoflight.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Green Street, Eco City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EcoFlight. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}