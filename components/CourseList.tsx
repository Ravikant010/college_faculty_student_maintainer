export function CourseList() {
    // ... existing code ...
  
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          // ... course card code ...
        ))}
      </div>
    )
  }