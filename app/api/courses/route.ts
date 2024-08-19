// app/api/courses/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { Course, CoursesData } from '@/type';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
const dataFilePath = path.join(process.cwd(), 'public', 'courses.json');

export async function GET(): Promise<Response> {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const data: CoursesData = JSON.parse(fileContents);
  return Response.json(data.courses);
}
export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the request body
    const newCourse: Omit<Course, 'id'> = await request.json();

    // Generate a new ID
    const id = Date.now().toString();

    // Create the new course object
    const courseWithId: Course = {
      ...newCourse,
      id,
      students: newCourse.students || [],
      topics: newCourse.topics || [],
      attendance: newCourse.attendance || []
    };

    // Get existing courses
    let courses: Course[] = await kv.get('courses') || [];

    // Add the new course
    courses.push(courseWithId);

    // Save the updated courses
    await kv.set('courses', courses);

    // Return the newly created course
    return NextResponse.json(courseWithId, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}