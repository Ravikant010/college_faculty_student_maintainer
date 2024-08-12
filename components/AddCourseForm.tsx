// app/components/AddCourseForm.tsx
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Course } from '@/type';

interface AddCourseFormProps {
  onAddCourse: (course: Omit<Course, 'id'>) => void;
}

export function AddCourseForm({ onAddCourse }: AddCourseFormProps) {
  const [courseName, setCourseName] = useState('');
  const [numStudents, setNumStudents] = useState(0);
  const [numTopics, setNumTopics] = useState(0);
  const [scheduleTime, setScheduleTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Omit<Course, 'id'> = {
      name: courseName,
      students: Array(numStudents).fill({}).map((_, index) => ({ id: `s${index + 1}`, name: '' })),
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
        <Label htmlFor="courseName">Topic Names</Label>
        <Input 
          id="courseName" 
          value={courseName} 
          onChange={(e) => setCourseName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="numStudents">Students</Label>
        <Input 
          id="numStudents" 
          type="number" 
          value={numStudents} 
          onChange={(e) => setNumStudents(parseInt(e.target.value))} 
          required 
        />
      </div>
      {/* <div>
        <Label htmlFor="numTopics">Topics</Label>
        <Input 
          id="numTopics" 
          type="number" 
          value={numTopics} 
          onChange={(e) => setNumTopics(parseInt(e.target.value))} 
          required 
        />
      </div> */}
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