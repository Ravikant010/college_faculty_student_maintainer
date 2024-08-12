// app/components/CourseList.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from '@/type';
import { useRouter } from 'next/navigation';

interface CourseListProps {
  onCourseDeleted: () => void;
}

export function CourseList({ onCourseDeleted }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetch('/api/courses')
      .then(response => response.json())
      .then((data: Course[]) => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCourses();
        onCourseDeleted();
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
const router = useRouter()
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <Card key={course.id} className='cursor-default' onClick={()=>router.push(`/${course.name}/${course.id}`)}>
          <CardHeader>
            <CardTitle>{course.name + " "+ course.schedule.time}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Students: {course.students.length}</p>
            {/* <p>Topics: {course.topics.length}</p> */}
            {/* <p>Schedule: {course.schedule.time}</p> */}
            {/* <p>Duration: {course.schedule.startDate} to {course.schedule.endDate}</p> */}
            <Button 
              onClick={() => handleDelete(course.id)}
              variant="destructive"
              className="mt-2"
            >
              Delete Course
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}