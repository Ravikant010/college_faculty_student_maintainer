// app/api/courses/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { Course, CoursesData } from '@/type';
import { NextResponse } from 'next/server';

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

    // Read the existing data
    let data: CoursesData;
    try {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      data = JSON.parse(fileContents);
    } catch (error) {
      console.error('Error reading or parsing data file:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Create the new course object
    const courseWithId: Course = {
      ...newCourse,
      id: Date.now().toString(),
      students: newCourse.students || [],
      topics: newCourse.topics || [],
      attendance: newCourse.attendance || []
    };

    // Add the new course to the data
    data.courses.push(courseWithId);

    // Write the updated data back to the file
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing data file:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Return the newly created course
    return NextResponse.json(courseWithId, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}