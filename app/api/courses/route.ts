// app/api/courses/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { Course, CoursesData } from '@/type';

const dataFilePath = path.join(process.cwd(), 'public', 'courses.json');

export async function GET(): Promise<Response> {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const data: CoursesData = JSON.parse(fileContents);
  return Response.json(data.courses);
}

export async function POST(request: Request): Promise<Response> {

  const newCourse: Omit<Course, 'id'> = await request.json();
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const data: CoursesData = JSON.parse(fileContents);
  
  const courseWithId: Course = {
    ...newCourse,
    id: Date.now().toString(),
    students: newCourse.students || [],
    topics: newCourse.topics || [],
    attendance: newCourse.attendance || []
  };
  
  data.courses.push(courseWithId);
  
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  return Response.json(courseWithId, { status: 201 });
}