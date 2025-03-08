"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Leaf, Clock, DollarSign } from "lucide-react"

export default function FlightMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedRoute, setSelectedRoute] = useState<string>("nyc-sfo")

  useEffect(() => {
    // This would be replaced with actual map initialization code
    // using a library like Leaflet or Mapbox
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Simulate map with a placeholder
      mapElement.innerHTML = `
        <div class="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden">
          <img 
            src="/placeholder.svg?height=600&width=1000" 
            alt="Map placeholder" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="text-lg font-medium">Interactive Flight Map</div>
              <div class="text-sm text-gray-500">Showing eco-friendly routes</div>
            </div>
          </div>
          
          <!-- Simulated flight paths -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
            <!-- Standard route: NYC to SFO -->
            <path d="M 750 250 Q 500 150 250 300" stroke="#6b7280" strokeWidth="3" fill="none" strokeDasharray="${selectedRoute === "nyc-sfo" ? "0" : "5,5"}"/>
            
            <!-- Eco route: NYC to SFO -->
            <path d="M 750 250 Q 500 350 250 300" stroke="#10b981" strokeWidth="3" fill="none" ${selectedRoute === "nyc-sfo" ? "" : "strokeOpacity='0.3'"}/>
            
            <!-- Standard route: LDN to DXB -->
            <path d="M 450 200 Q 550 300 650 200" stroke="#6b7280" strokeWidth="3" fill="none" strokeDasharray="${selectedRoute === "ldn-dxb" ? "0" : "5,5"}"/>
            
            <!-- Eco route: LDN to DXB -->
            <path d="M 450 200 Q 550 250 650 200" stroke="#10b981" strokeWidth="3" fill="none" ${selectedRoute === "ldn-dxb" ? "" : "strokeOpacity='0.3'"}/>
            
            <!-- Standard route: TYO to SYD -->
            <path d="M 800 250 Q 700 400 600 450" stroke="#6b7280" strokeWidth="3" fill="none" strokeDasharray="${selectedRoute === "tyo-syd" ? "0" : "5,5"}"/>
            
            <!-- Eco route: TYO to SYD -->
            <path d="M 800 250 Q 650 350 600 450" stroke="#10b981" strokeWidth="3" fill="none" ${selectedRoute === "tyo-syd" ? "" : "strokeOpacity='0.3'"}"/>
            
            <!-- City markers -->
            <circle cx="250" cy="300" r="5" fill="#1e40af"/>
            <circle cx="750" cy="250" r="5" fill="#1e40af"/>
            <circle cx="450" cy="200" r="5" fill="#1e40af"/>
            <circle cx="650" cy="200" r="5" fill="#1e40af"/>
            <circle cx="800" cy="250" r="5" fill="#1e40af"/>
            <circle cx="600" cy="450" r="5" fill="#1e40af"/>
            
            <!-- City labels -->
            <text x="240" y="285" fontSize="12" fill="#1e40af" fontWeight="bold">NYC</text>
            <text x="755" y="235" fontSize="12" fill="#1e40af" fontWeight="bold">SFO</text>
            <text x="440" y="185" fontSize="12" fill="#1e40af" fontWeight="bold">LDN</text>
            <text x="655" y="185" fontSize="12" fill="#1e40af" fontWeight="bold">DXB</text>
            <text x="805" y="235" fontSize="12" fill="#1e40af" fontWeight="bold">TYO</text>
            <text x="605" y="435" fontSize="12" fill="#1e40af" fontWeight="bold">SYD</text>
          </svg>
          
          <div class="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md">
            <div class="flex items-center gap-2 text-sm">
              <div class="flex items-center">
                <div class="w-4 h-1 bg-green-500 rounded mr-1"></div>
                <span>Eco-friendly route</span>
              </div>
              <div class="flex items-center">
                <div class="w-4 h-1 bg-gray-500 rounded mr-1 border-dashed"></div>
                <span>Standard route</span>
              </div>
            </div>
          </div>
        </div>
      `
    }
  }, [selectedRoute])

  const routes = {
    "nyc-sfo": {
      from: "New York (JFK)",
      to: "San Francisco (SFO)",
      standardTime: "6h 15m",
      ecoTime: "6h 45m",
      standardEmission: "1,250 kg CO2",
      ecoEmission: "875 kg CO2",
      standardPrice: "$349",
      ecoPrice: "$379",
      savings: "30%",
      description:
        "This eco-friendly route takes advantage of favorable jet streams and optimized cruising altitude to reduce fuel consumption.",
    },
    "ldn-dxb": {
      from: "London (LHR)",
      to: "Dubai (DXB)",
      standardTime: "7h 05m",
      ecoTime: "7h 25m",
      standardEmission: "1,420 kg CO2",
      ecoEmission: "1,065 kg CO2",
      standardPrice: "$520",
      ecoPrice: "$545",
      savings: "25%",
      description:
        "By adjusting the flight path to avoid areas with contrail formation, this route significantly reduces the climate impact.",
    },
    "tyo-syd": {
      from: "Tokyo (HND)",
      to: "Sydney (SYD)",
      standardTime: "9h 30m",
      ecoTime: "9h 55m",
      standardEmission: "1,680 kg CO2",
      ecoEmission: "1,176 kg CO2",
      standardPrice: "$650",
      ecoPrice: "$675",
      savings: "30%",
      description:
        "This route uses continuous descent approach and optimized cruising speed to minimize fuel consumption and emissions.",
    },
  }

  const currentRoute = routes[selectedRoute as keyof typeof routes]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div ref={mapRef} className="h-[500px] rounded-lg overflow-hidden border"></div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Route Comparison</CardTitle>
            <CardDescription>
              {currentRoute.from} to {currentRoute.to}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="eco" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="eco">Eco-Friendly</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Flight Time</span>
                  </div>
                  <span className="font-medium">{currentRoute.standardTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span>Emissions</span>
                  </div>
                  <span className="font-medium">{currentRoute.standardEmission}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Price</span>
                  </div>
                  <span className="font-medium">{currentRoute.standardPrice}</span>
                </div>
              </TabsContent>
              <TabsContent value="eco" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Flight Time</span>
                  </div>
                  <span className="font-medium">{currentRoute.ecoTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span>Emissions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{currentRoute.ecoEmission}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Leaf className="h-3 w-3 mr-1" />
                      {currentRoute.savings} less
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Price</span>
                  </div>
                  <span className="font-medium">{currentRoute.ecoPrice}</span>
                </div>
                <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                  <p>{currentRoute.description}</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium">Select Route to View:</p>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={selectedRoute === "nyc-sfo" ? "default" : "outline"}
                  className={selectedRoute === "nyc-sfo" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedRoute("nyc-sfo")}
                >
                  New York to San Francisco
                </Button>
                <Button
                  variant={selectedRoute === "ldn-dxb" ? "default" : "outline"}
                  className={selectedRoute === "ldn-dxb" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedRoute("ldn-dxb")}
                >
                  London to Dubai
                </Button>
                <Button
                  variant={selectedRoute === "tyo-syd" ? "default" : "outline"}
                  className={selectedRoute === "tyo-syd" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedRoute("tyo-syd")}
                >
                  Tokyo to Sydney
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

