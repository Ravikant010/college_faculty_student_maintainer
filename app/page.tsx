import filename from "@/filename";
import Link from "next/link";
import CoursesPage from "@/components/CoursesPage";


export default async function Page() {


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      
      <CoursesPage />

    </div>
  );
}