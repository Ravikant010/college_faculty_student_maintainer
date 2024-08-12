"use client"
import { Course } from '@/type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CourseList } from "@/components/CourseList";
import { AddCourseForm } from "@/components/AddCourseForm";
import { CircularButton } from '@/components/CircleButton';

import AddClassDataForm from '@/components/AddBatchDataForm';
import ClassDataDisplay from '@/components/ClassDataDisplay';
import { Badge } from "@/components/ui/badge"

type Props = {}
interface ClassData {
  date: Date;
  presentStudents: string;
  topicName: string;
  topicLinks: string;
}


export default function Page({}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

    const params = useParams<{ batch: string; id: string }>()
console.log(params)
    const [course, setCourses] = useState<Course | null >(null);
    const handleFetchBatch = async () => {
        try {
          const response = await fetch(`/api/courses/${params.id}`);
          if (response.ok) {
        const json = await response.json()
        setCourses(json)
     
          } else {
            console.error('Failed to delete course');
          }
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      };
      const handleAddBatchData = async (courseData: Omit<Course, 'id'>) => {
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

      

useEffect(()=>{
    handleFetchBatch()
  
},[])
const handleSubmit = async (data:ClassData) => {
  try {
    const response = await fetch(`/api/courses/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update course');
    }
    
    // Handle success (e.g., show a success message, refresh course data)
  } catch (error) {
    // Handle error (e.g., show an error message)
    console.error('Error updating course:', error);
  }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{`${course?.name}-${course?.id}`}</h1>

      <h2>Enrolled Students</h2>
      <div className='flex justify-start'>
      {
  course && course.students.map((e, index)=><Badge className='mx-2 mt-2' key={index}>{e.name}</Badge>)
}
      </div>
      <div className="bg-white rounded-lg p-6">
      {course &&  <ClassDataDisplay course ={course} />}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <CircularButton/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Today Batch Data</DialogTitle>
          </DialogHeader>
    <AddClassDataForm courseId={params.id} onSubmit={handleSubmit}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}