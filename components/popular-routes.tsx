"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowRight, Plane } from "lucide-react"

export default function PopularRoutes() {
  const popularRoutes = [
    {
      id: 1,
      from: "New York (JFK)",
      to: "London (LHR)",
      emissionReduction: "28%",
      price: "$429",
      ecoPrice: "$459",
      airlines: ["British Airways", "Virgin Atlantic"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      from: "Los Angeles (LAX)",
      to: "Tokyo (HND)",
      emissionReduction: "25%",
      price: "$689",
      ecoPrice: "$719",
      airlines: ["ANA", "Japan Airlines"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      from: "Paris (CDG)",
      to: "Singapore (SIN)",
      emissionReduction: "32%",
      price: "$745",
      ecoPrice: "$785",
      airlines: ["Singapore Airlines", "Air France"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      from: "Sydney (SYD)",
      to: "Hong Kong (HKG)",
      emissionReduction: "24%",
      price: "$520",
      ecoPrice: "$550",
      airlines: ["Cathay Pacific", "Qantas"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      from: "Amsterdam (AMS)",
      to: "Cape Town (CPT)",
      emissionReduction: "30%",
      price: "$695",
      ecoPrice: "$735",
      airlines: ["KLM", "South African Airways"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      from: "Dubai (DXB)",
      to: "Bangkok (BKK)",
      emissionReduction: "22%",
      price: "$410",
      ecoPrice: "$435",
      airlines: ["Emirates", "Thai Airways"],
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Popular Eco-Friendly Routes</h3>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Leaf className="h-3 w-3 mr-1" />
          Lower Carbon Emissions
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRoutes.map((route) => (
          <Card key={route.id} className="overflow-hidden">
            <div className="relative h-40 bg-slate-100">
              <img
                src={route.image || "/placeholder.svg"}
                alt={`${route.from} to ${route.to}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-600">
                  <Leaf className="h-3 w-3 mr-1" />
                  {route.emissionReduction} less CO2
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="truncate">{route.from}</span>
                <ArrowRight className="h-4 w-4 mx-2 flex-shrink-0" />
                <span className="truncate">{route.to}</span>
              </CardTitle>
              <CardDescription>{route.airlines.join(" • ")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Plane className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Standard:</span>
                </div>
                <span className="font-medium">{route.price}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Eco-friendly:</span>
                </div>
                <span className="font-medium text-green-600">{route.ecoPrice}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

