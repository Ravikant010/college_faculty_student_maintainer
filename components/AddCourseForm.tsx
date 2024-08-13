import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Course } from '@/type';
import { Textarea } from "@/components/ui/textarea";

interface AddCourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

export function AddCourseForm({ onAddCourse }: AddCourseFormProps) {
  const [courseName, setCourseName] = useState('');
  const [studentNames, setStudentNames] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentList = studentNames.split(',').map(name => name.trim());
    const newCourse: Omit<Course, 'id'> = {
      name: courseName,
      students: studentList.map((name, index) => ({ id: `s${index + 1}`, name })),
      topics: [],
      schedule: {
        startDate,
        endDate,
        days: [],  // You might want to add a field for days if needed
        time: scheduleTime
      },
      attendance: []
    };
    onAddCourse(newCourse);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="courseName">Course Name</Label>
        <Input 
          id="courseName" 
          value={courseName} 
          onChange={(e) => setCourseName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="studentNames">Student Names</Label>
        <Textarea 
          id="studentNames" 
          value={studentNames} 
          onChange={(e) => setStudentNames(e.target.value)} 
          placeholder="Enter student names separated by commas"
          required 
        />
      </div>
      <div>
        <Label htmlFor="scheduleTime">Schedule</Label>
        <Input 
          id="scheduleTime" 
          value={scheduleTime} 
          onChange={(e) => setScheduleTime(e.target.value)} 
          placeholder="e.g. 18:00-20:00" 
          required 
        />
      </div>
      <div>
        <Label htmlFor="startDate">Duration</Label>
        <div className="flex space-x-2">
          <Input 
            id="startDate" 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
          <span className="self-center">to</span>
          <Input 
            id="endDate" 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </div>
      </div>
      <Button type="submit">Add Course</Button>
    </form>
  );
}