// // app/courses/[id]/page.tsx
// export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
//     cache: 'no-store',
//   });
//   const course = await res.json();

//   return (
//     <div>
//       <h1>{course.title}</h1>
//       <p>{course.description}</p>
//       <p>Price: ${course.price}</p>
//     </div>
//   );
// }


// //after video add






// // src/app/courses/[id]/page.tsx
// import { CourseModuleView } from '@/components/courses/CourseModuleView';

// export default async function CourseDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch course with id ${id}`);
//   }

//   const course = await res.json();

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">{course.title}</h1>
//       <p>{course.description}</p>
//       <p className="font-semibold">Price: ${course.price}</p>

//       {/* Render all modules */}
//       {course.modules?.map((mod: any, i: number) => (
//         <CourseModuleView key={`module-${i}`} module={mod} />
//       ))}
//     </div>
//   );
// }


//after ui added

import { EnhancedCourseModuleView } from "@/components/courses/CourseModuleView"
import { BookOpen, DollarSign, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch course with id ${id}`)
  }

  const course = await res.json()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-5xl mx-auto p-8 space-y-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="uppercase tracking-wide">{course.category || "Course"}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>

            <p className="text-lg text-muted-foreground max-w-3xl">{course.description}</p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{course.price}</span>
              </div>
              {course.modules && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.modules.length} modules</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8 space-y-6">
        <h2 className="text-2xl font-semibold">Course Content</h2>

        {course.modules && course.modules.length > 0 ? (
          <div className="space-y-6">
            {course.modules.map((mod: any, i: number) => (
              <EnhancedCourseModuleView key={`module-${i}`} module={mod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No modules available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
