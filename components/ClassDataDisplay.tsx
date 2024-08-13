import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course } from '@/type';
type ClassDataDisplayProps = {
  course: Course;
};


const ClassDataDisplay: React.FC<ClassDataDisplayProps> = ({ course }) => {
  const totalStudentsPresentOnClassDays = course.attendance.reduce((total, record) => {
    if (record.presentStudents.length > 0) {
      return total + record.presentStudents.length;
    }
    return total;
  }, 0);

  function extractLabelAndURL(text: string): { label: string; url: string } {
    // Regular expression to match and split the text
    const regex = /^(.*?)\n\s*(https?:\/\/[^\s]+)/;
    const matches = text.match(regex);
  
    // Return extracted label and URL or default values
    return {
      label: matches ? matches[1].trim() : 'NO LINK AVAILABLE FOR THIS CLASS',
      url: matches ? ` ${matches[2]}` : '',
    };
  }
  
  return (
    <div className="p-4 space-y-6 border  rounded-lg
    ">
        {course.attendance.map((attendanceRecord, index) => (
          <div key={index} className="border-t pt-4">
            <h4 className="text-lg font-medium mb-2">Date: {attendanceRecord.date}</h4>

            {/* Students */}
            <div>
              <h5 className="text-md font-semibold">Students</h5>
              <ul className="list-disc pl-5">
                {
                  
                }
                {course.students
                  .filter((student) => attendanceRecord.presentStudents.includes(student.name))
                  .map((student) => (
                    <li key={student.id}>
                      {student.id}: {student.name || "Name not provided"}
                    </li>
                  ))}
              </ul>
            </div>
            {/* <div>
          <h5 className="text-md font-semibold">Total Students Present on Class Days</h5>
          <p>{totalStudentsPresentOnClassDays}</p>
        </div> */}
    <div>
    <h5 className="text-md font-semibold mt-2">Topics</h5>
      <p className='ml-4 mt-1s'>{course.topics[index].name}</p>
      </div>



     <div>
              <h5 className="text-md font-semibold">Links</h5>
              <div className='whitespace-pre-wrap list-none'>
              {course.topics[index].links.map((link, index) => (
                  <li key={index} className="break-words">
{extractLabelAndURL(link).label}
<br/>
                    <a href={extractLabelAndURL(link).url} className="text-blue-500 underline">
                      {extractLabelAndURL(link).url}
                    </a>
                    <br/>
                  </li>
                ))}
                </div>
            </div> 
          </div>
        ))}
      </div>
  
  );
};

export default ClassDataDisplay;