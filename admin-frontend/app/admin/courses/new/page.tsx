// src/app/admin/courses/new/page.tsx
import CourseForm from '@/components/forms/CourseForm';

export default function NewCoursePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create Course</h1>
      <CourseForm />
    </div>
  );
}
