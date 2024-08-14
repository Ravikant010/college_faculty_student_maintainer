"use client"
import filename from "@/filename";
import Link from "next/link";
import CoursesPage from "@/components/CoursesPage";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";


export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value === "DontHackMeTgc@123") {
      localStorage.setItem("role", "admin")
      window.location.reload()
      // You might want to add some feedback or redirection here
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <CoursesPage />
      {typeof window !== 'undefined' && 
      <div className="fixed bottom-4 left-4 flex items-center space-x-2 w-fit">
        {
          localStorage.getItem("role") == "admin" ? <div>
            <span className="text-sm text-gray-600">you are admin:</span>
            <Button onClick={() => {

              localStorage.removeItem("role")
              window.location.reload()
            }} size="sm" variant={"ghost"}>
              logout
            </Button>
          </div> :
            <div className="flex flex-col">
              <p className="capitalize text-sm text-gray-600">You are not Admin Cant make any changes respect our privacy </p>
              

              <p className="text-sm text-gray-600">Enter admin password:</p>

              <Input
                ref={inputRef}
                type="password"
                className="my-4"
              />
              <Button onClick={handleSubmit} size="sm">
                Submit
              </Button>
            </div>
        }
      

      </div>
}
    </div>
  );
}