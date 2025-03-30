"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shuffle, Table } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function TableSeatGenerator() {
  const [numTables, setNumTables] = useState<number>(5)
  const [seatsPerTable, setSeatsPerTable] = useState<number>(6)
  const [assignedTable, setAssignedTable] = useState<number | null>(null)
  const [assignedSeat, setAssignedSeat] = useState<number | null>(null)
  const [tables, setTables] = useState<Array<{ id: number; seats: number }>>([])
  const [error, setError] = useState<string>("")

  // Initialize tables when configuration changes
  useEffect(() => {
    if (numTables > 0 && seatsPerTable > 0) {
      const newTables = Array.from({ length: numTables }, (_, i) => ({
        id: i + 1,
        seats: seatsPerTable,
      }))
      setTables(newTables)
      setError("")
    } else {
      setError("Please enter valid numbers greater than 0")
    }
  }, [numTables, seatsPerTable])

  // Generate random table and seat assignment
  const generateRandomAssignment = () => {
    if (numTables <= 0 || seatsPerTable <= 0) {
      setError("Please enter valid numbers greater than 0")
      return
    }

    setError("")
    const randomTable = Math.floor(Math.random() * numTables) + 1
    const randomSeat = Math.floor(Math.random() * seatsPerTable) + 1

    setAssignedTable(randomTable)
    setAssignedSeat(randomSeat)
  }

  // Handle input changes
  const handleNumTablesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setNumTables(isNaN(value) ? 0 : value)
  }

  const handleSeatsPerTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setSeatsPerTable(isNaN(value) ? 0 : value)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Hot Seat Generator</h1>
        <p className="text-muted-foreground">
          Configure the number of tables and seats, then generate a random assignment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="numTables">Number of Tables</Label>
          <Input id="numTables" type="number" min="1" value={numTables} onChange={handleNumTablesChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatsPerTable">Seats Per Table</Label>
          <Input id="seatsPerTable" type="number" min="1" value={seatsPerTable} onChange={handleSeatsPerTableChange} />
        </div>
      </div>

      <Button
        onClick={generateRandomAssignment}
        className="gap-2"
        size="lg"
        disabled={numTables <= 0 || seatsPerTable <= 0}
      >
        <Shuffle className="h-4 w-4" />
        Generate Random Assignment
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {assignedTable !== null && assignedSeat !== null && (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold">Your Assignment</h2>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Table:</span>
                  <span className="text-xl font-bold text-primary">{assignedTable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Seat:</span>
                  <span className="text-xl font-bold text-primary">{assignedSeat}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="relative">
            <div
              className={cn(
                "border-2 rounded-md p-2 h-40",
                assignedTable === table.id ? "border-primary bg-primary/5" : "border-gray-200",
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <Table className="h-4 w-4" />
                  <span className="font-medium">Table {table.id}</span>
                </div>
                <span className="text-xs text-muted-foreground">{table.seats} seats</span>
              </div>

              <div className="grid grid-cols-3 gap-2 h-[calc(100%-28px)]">
                {Array.from({ length: table.seats }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border rounded-sm flex items-center justify-center text-xs",
                      assignedTable === table.id && assignedSeat === i + 1
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-gray-50",
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
