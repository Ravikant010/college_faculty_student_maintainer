// app/courses/page.tsx
"use client"

import { useState } from "react";
import { CourseList } from "@/components/CourseList";
import { AddCourseForm } from "@/components/AddCourseForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Course } from '@/type';
import { CircularButton } from "@/components/CircleButton";

export default function CoursesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddCourse = async (courseData: Omit<Course, 'id'>) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        setIsDialogOpen(false);
        setRefreshKey(prevKey => prevKey + 1);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleCourseDeleted = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <CourseList key={refreshKey} onCourseDeleted={handleCourseDeleted} />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <CircularButton/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <AddCourseForm onAddCourse={handleAddCourse} />
        </DialogContent>
      </Dialog>
    </div>
  );
}