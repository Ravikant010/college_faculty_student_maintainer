// types/course.ts

export interface Student {
    id: string;
    name: string;
  }
  
  export interface Topic {
    id: string;
    name: string;
    links: string[];
  }
  
  export interface Schedule {
    startDate: string;
    endDate: string;
    days: string[];
    time: string;
  }
  
  export interface AttendanceRecord {
    date: string;
    presentStudents: string[];
  }
  
  export interface Course {
    id: string;
    name: string;
    students: Student[];
    topics: Topic[];
    schedule: Schedule;
  }