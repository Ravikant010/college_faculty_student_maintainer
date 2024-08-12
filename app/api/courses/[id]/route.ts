// app/api/courses/[id]/route.ts

import { promises as fs } from 'fs';
import path from 'path';
import { AttendanceRecord, CoursesData, Topic } from '@/type';
import { NextRequest, NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'public' , 'courses.json');

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id = params.id;

  try {
    // Read the current data
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data: CoursesData = JSON.parse(fileContents);

    // Find the index of the course to delete
    const courseIndex = data.courses.findIndex(course => course.id === id);

    // If the course doesn't exist, return a 404 error
    if (courseIndex === -1) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Remove the course from the array
    data.courses.splice(courseIndex, 1);

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    // Return a success response
    return new Response(JSON.stringify({ message: 'Course deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error deleting course:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function GET(Request: NextRequest,  { params }: { params: { id: string } }):Promise<Response> {
  const id = params.id;

  try {
    // Read the current data
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data: CoursesData = JSON.parse(fileContents);

    // Find the index of the course to delete
    const courseIndex = data.courses.findIndex(course => course.id === id);
    if (courseIndex === -1) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.json(data.courses[courseIndex])
} 
catch (error) {
  console.error('Error deleting course:', error);
  return new Response(JSON.stringify({ error: 'Internal server error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id = params.id;

  try {
    // Read the request body
    const body = await request.json();
    const { date, presentStudents, topicName, topicLinks } = body;

    if (!date || !Array.isArray(presentStudents) || !topicName) {
      return new Response(JSON.stringify({ error: 'Invalid input: date, presentStudents array, and topicName are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Read the current data
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data: CoursesData = JSON.parse(fileContents);

    // Find the course to update
    const courseIndex = data.courses.findIndex(course => course.id === id);

    if (courseIndex === -1) {
      return new Response(JSON.stringify({ error: 'Course not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const course = data.courses[courseIndex];

    // Update attendance
    const newAttendanceRecord: AttendanceRecord = {
      date,
      presentStudents
    };

    const existingAttendanceIndex = course.attendance.findIndex(record => record.date === date);
    if (existingAttendanceIndex !== -1) {
      course.attendance[existingAttendanceIndex] = newAttendanceRecord;
    } else {
      course.attendance.push(newAttendanceRecord);
    }

    // Update topics
    const newTopic: Topic = {
      id: `topic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: [topicName],
      links: topicLinks || []
    };
    course.topics.push(newTopic);

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    // Return a success response
    return new Response(JSON.stringify({ 
      message: 'Course updated successfully', 
      updatedCourse: course 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}