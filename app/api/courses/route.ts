import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'courses.json');

export async function GET() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  return Response.json(data.courses);
}

export async function POST(request:NextRequest) {
  const newCourse = await request.json();
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  newCourse.id = Date.now().toString(); // Simple ID generation
  data.courses.push(newCourse);
  
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  return Response.json(newCourse, { status: 201 });
}