import { Course, CoursesData, Student, Topic } from "@/type";
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataFilePath = path.join(process.cwd(), 'public', 'courses.json');
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const params: { courseId: string, topicId: string } = { courseId: searchParams.get("courseId") as string, topicId: searchParams.get("topicId") as string }
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data: CoursesData = JSON.parse(fileContents);

        if (data) {
            const course: Course = data.courses.filter(e => e.id == params.courseId)[0]

            if (course) {

                const topic_index = course.topics.findIndex((e: Topic) => e.id === params.topicId);



                return NextResponse.json({ topic: course.topics[topic_index], index: topic_index, courseId: course.id })
            }
            return NextResponse.json({ course })

        }
        return new NextResponse("ok")
    }
    catch (err) {
        console.log(err)
        return NextResponse.error()
    }
}




export async function POST(request: NextRequest) {
    const body: { topic: Topic, index: number, courseId: string, student_names: Student[] } = await request.json()
    try {
        // Step 1: Read the JSON file
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data: CoursesData = JSON.parse(fileContents);

        // Step 2: Find and update the specific course and topic
        const courseIndex = data.courses.findIndex(e => e.id === body.courseId);
        if (courseIndex !== -1) {
            
                    // body.student_names.map((e: Student, index:number) => {
                    //     const existingStudent = data.courses[courseIndex].students.find(student => student.id === e.id && student.name != null) ;
                        
                    //     if (existingStudent) {
                    //       // Do something if the student already exists
                    //       console.log(`Student with ID ${e.id} already exists`);
                    //     } else {
                    //       // Do something if the student doesn't exist
                    //       console.log(`Student with ID ${e.id} does not exist, adding student.`);
                    //       data.courses[courseIndex].students[index]= e; // Or any other action
                    //     }
                    //   });
                     
                
            data.courses[courseIndex].topics[body.index] = body.topic;

            // Step 3: Write the updated data back to the JSON file
            await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
            console.log('Topic updated successfully.');
            return NextResponse.json(data.courses[courseIndex].topics[body.index])
        } else {
            console.error('Course not found.');
        }
    } catch (error) {
        console.error('Error updating the topic:', error);
    }
}