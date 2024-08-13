import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddClassDataFormProps {
  courseId: string;
  onSubmit: (data: ClassData) => void;
}

interface ClassData {
  date: string;
  presentStudents: string;
  topicName: string;
  topicLinks: string;
}

export default function AddClassDataForm({ courseId, onSubmit }: AddClassDataFormProps) {
  const form = useForm<ClassData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      presentStudents: '',
      topicName: '',
      topicLinks: '',
    },
  });

  const handleSubmit = (data: ClassData) => {
    // Convert the data to the format expected by the API
    const formattedData = {
      date: format(data.date, 'yyyy-MM-dd'),
      presentStudents: data.presentStudents.split(',').map(s => s.trim()),
      topicName: data.topicName,
      topicLinks: data.topicLinks.split(',').map(s => s.trim()),
    };
//@ts-ignore
    onSubmit(formattedData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Class Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    //@ts-ignore
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="presentStudents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Present Students</FormLabel>
              <FormControl>
                <Input placeholder="student1, student2, student3" {...field} />
              </FormControl>
              <FormDescription>
                Enter student Names separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to React" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Links</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="https://example.com/react-intro, https://example.com/react-basics" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Enter related links separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Class Data</Button>
      </form>
    </Form>
  );
}