// app/components/CourseList.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from '@/type';

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(response => response.json())
      .then((data: Course[]) => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Students: {course.students.length}</p>
            <p>Topics: {course.topics.length}</p>
            <p>Schedule: {course.schedule.days.join(', ')} at {course.schedule.time}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}