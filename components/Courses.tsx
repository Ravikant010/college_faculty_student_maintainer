// app/courses/page.jsx
"use client"

import { useState } from "react"
import { CircularButton } from "@/components/CircleButton"
import { CourseList } from "@/components/CourseList"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCourse = (event) => {
    event.preventDefault()
    // Add logic to save the new course
    setIsDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <CourseList />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <CircularButton onClick={() => setIsDialogOpen(true)} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Input id="courseName" placeholder="Enter course name" />
            </div>
            <div>
              <Label htmlFor="courseDescription">Description</Label>
              <Input id="courseDescription" placeholder="Enter course description" />
            </div>
            <Button type="submit">Add Course</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}