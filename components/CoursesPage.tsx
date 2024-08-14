
"use client"
import { useState } from "react";
import { CourseList } from "@/components/CourseList";
import { AddCourseForm } from "@/components/AddCourseForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Course } from '@/type';
import { CircularButton } from "@/components/CircleButton";
import Link from "next/link";


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
<>
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
      </>
  );
}