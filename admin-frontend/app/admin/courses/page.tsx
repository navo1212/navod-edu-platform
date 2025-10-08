// // src/app/admin/courses/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api-client';

// export default function AdminCoursesPage() {
//   const [courses, setCourses] = useState<any[]>([]);

//   useEffect(() => {
//     api('/courses').then(setCourses);
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (confirm('Delete this course?')) {
//       await api(`/courses/${id}`, { method: 'DELETE' });
//       setCourses(courses.filter((c) => c._id !== id));
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Courses</h1>
//       <a href="/admin/courses/new" className="btn">+ Add Course</a>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 text-left">Title</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((c) => (
//             <tr key={c._id} className="border-t">
//               <td className="p-2">{c.title}</td>
//               <td className="p-2">${c.price}</td>
//               <td className="p-2 space-x-2">
//                 <a href={`/admin/courses/${c._id}/edit`} className="text-blue-600 underline">Edit</a>
//                 <button onClick={() => handleDelete(c._id)} className="text-red-600 underline">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// after vedeo


//after ui added

"use client"
import { useEffect, useState } from "react"
import { api } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Plus, Pencil, Trash2, DollarSign, Tag } from "lucide-react"
import Link from "next/link"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    api("/courses")
      .then(setCourses)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return
    }

    setDeletingId(id)
    try {
      await api(`/courses/${id}`, { method: "DELETE" })
      setCourses(courses.filter((c) => c._id !== id))
    } catch (error) {
      alert("Failed to delete course")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 text-balance">Course Management</h1>
            <p className="mt-2 text-slate-600">Create, edit, and manage your course catalog</p>
          </div>
          <Link href="/admin/courses/new">
            <Button className="gap-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 shadow-lg shadow-slate-900/20">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
              <p className="text-slate-600">Loading courses...</p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <Card className="border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-6">
                <BookOpen className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">No courses yet</h3>
              <p className="mt-2 text-slate-600 max-w-md">
                Get started by creating your first course. Add content, set pricing, and publish to your students.
              </p>
              <Link href="/admin/courses/new">
                <Button className="mt-6 gap-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700">
                  <Plus className="h-4 w-4" />
                  Create First Course
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="group overflow-hidden border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* Course Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-300 transition-transform group-hover:scale-110" />
                  </div>
                  {/* Category Badge */}
                  {course.category && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                      <Tag className="h-3 w-3" />
                      {course.category}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  {/* Course Title */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 text-balance">{course.title}</h3>
                    {course.description && (
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{course.description}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <DollarSign className="h-5 w-5 text-slate-600" />
                    {course.price}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/courses/${course._id}/edit`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-slate-300 hover:bg-slate-50 bg-transparent"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(course._id)}
                      disabled={deletingId === course._id}
                      className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      {deletingId === course._id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
