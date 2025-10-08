// // src/app/admin/courses/new/page.tsx
// import CourseForm from '@/components/forms/CourseForm';

// export default function NewCoursePage() {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Create Course</h1>
//       <CourseForm />
//     </div>
//   );
// }


//after ui added
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CourseForm from "@/components/forms/CourseForm"

export default function NewCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <Link href="/admin/courses">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 text-balance">Create New Course</h1>
            <p className="mt-2 text-slate-600">Fill in the details below to create a new course for your students</p>
          </div>
        </div>

        <CourseForm />
      </div>
    </div>
  )
}
