// // src/app/admin/courses/[id]/edit/page.tsx
// import CourseForm from '@/components/forms/CourseForm';

// export default async function EditCoursePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
//     cache: 'no-store', // always fetch fresh data
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch course with id ${id}`);
//   }

//   const course = await res.json();

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Edit Course</h1>
//       <CourseForm course={course} />
//     </div>
//   );
// }


// // video upload ew add krt psse







// // src/app/admin/courses/[id]/page.tsx
// 'use client';

// import { use } from 'react';
// import { useEffect, useState } from 'react';
// import { AddYoutubeVideo } from '@/components/forms/AddYoutubeVideo';
// import { AddFile } from '@/components/forms/AddFile';
// import { api } from '@/lib/api-client';

// export default function AdminCoursePage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params); // ✅ unwrap params

//   const [course, setCourse] = useState<any>(null);
//   const [newModule, setNewModule] = useState({ week: '', title: '' });

//   useEffect(() => {
//     api(`/courses/${id}`).then(setCourse);
//   }, [id]);

//   const handleAddModule = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const body = { week: Number(newModule.week), title: newModule.title };
//     const updated = await api(`/courses/${id}/modules`, {
//       method: 'POST',
//       body: JSON.stringify(body),
//     });
//     setCourse(updated);
//     setNewModule({ week: '', title: '' });
//   };

//   if (!course) return <p>Loading...</p>;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold">Manage Course: {course.title}</h1>

//       {/* Add Module Form */}
//       <form onSubmit={handleAddModule} className="space-y-3 border p-4 rounded">
//         <h2 className="text-lg font-semibold">Add New Module</h2>
//         <input
//           type="number"
//           placeholder="Week number"
//           value={newModule.week}
//           onChange={(e) => setNewModule({ ...newModule, week: e.target.value })}
//           className="input"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Module title"
//           value={newModule.title}
//           onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
//           className="input"
//           required
//         />
//         <button className="btn">+ Add Module</button>
//       </form>

//       {/* Modules List */}
//       {course.modules?.map((mod: any) => (
//         <div key={mod.week} className="border p-4 rounded space-y-4">
//           <h2 className="text-xl font-semibold">
//             Week {mod.week}: {mod.title}
//           </h2>

//           {/* Add video/file */}
//           <AddYoutubeVideo courseId={course._id} week={mod.week} />
//           <AddFile courseId={course._id} week={mod.week} />

//           {/* Existing videos */}
//           {mod.videos.length > 0 && (
//             <div className="space-y-2">
//               {mod.videos.map((v: string, i: number) =>
//                 v?.trim() ? ( // ✅ only render if not empty
//                   <iframe
//                     key={i}
//                     src={v}
//                     width="100%"
//                     height="300"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 ) : null
//               )}
//             </div>
//           )}

//           {/* Existing files */}
//           {mod.files.length > 0 && (
//             <div className="space-y-2">
//               {mod.files.map((f: string, i: number) =>
//                 f?.trim() ? ( // ✅ only render if not empty
//                   <a
//                     key={i}
//                     href={f}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block text-blue-600 underline"
//                   >
//                     Download File {i + 1}
//                   </a>
//                 ) : null
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

//after ui added


"use client"

import type React from "react"

import { use } from "react"
import { useEffect, useState } from "react"
import { AddYoutubeVideo } from "@/components/forms/AddYoutubeVideo"
import { AddFile } from "@/components/forms/AddFile"
import { api } from "@/lib/api-client"
import { ArrowLeft, Plus, BookOpen, Video, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [course, setCourse] = useState<any>(null)
  const [newModule, setNewModule] = useState({ week: "", title: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    api(`/courses/${id}`).then(setCourse)
  }, [id])

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const body = { week: Number(newModule.week), title: newModule.title }
      const updated = await api(`/courses/${id}/modules`, {
        method: "POST",
        body: JSON.stringify(body),
      })
      setCourse(updated)
      setNewModule({ week: "", title: "" })
    } catch (error) {
      console.error("Failed to add module:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Manage Course</h1>
            <p className="text-lg text-muted-foreground">{course.title}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{course.modules?.length || 0} modules</span>
          </div>
        </div>
      </div>

      {/* Add Module Form */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Add New Module</h2>
        </div>

        <form onSubmit={handleAddModule} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="week" className="text-sm font-medium text-foreground">
                Week Number
              </label>
              <input
                id="week"
                type="number"
                placeholder="e.g., 1"
                value={newModule.week}
                onChange={(e) => setNewModule({ ...newModule, week: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Module Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Introduction to React"
                value={newModule.title}
                onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Module
              </>
            )}
          </button>
        </form>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {course.modules?.length > 0 ? (
          course.modules.map((mod: any) => (
            <div
              key={mod.week}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Module Header */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary font-semibold">
                    {mod.week}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Week {mod.week}</h2>
                    <p className="text-sm text-muted-foreground">{mod.title}</p>
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6 space-y-6">
                {/* Add Content Forms */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AddYoutubeVideo courseId={course._id} week={mod.week} />
                  <AddFile courseId={course._id} week={mod.week} />
                </div>

                {/* Existing Videos */}
                {mod.videos.length > 0 && mod.videos.some((v: string) => v?.trim()) && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Video className="h-4 w-4 text-primary" />
                      Videos ({mod.videos.filter((v: string) => v?.trim()).length})
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {mod.videos.map((v: string, i: number) =>
                        v?.trim() ? (
                          <div key={i} className="rounded-lg overflow-hidden border border-border bg-background">
                            <iframe
                              src={v}
                              width="100%"
                              height="400"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full"
                            />
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}

                {/* Existing Files */}
                {mod.files.length > 0 && mod.files.some((f: string) => f?.trim()) && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileText className="h-4 w-4 text-primary" />
                      Files ({mod.files.filter((f: string) => f?.trim()).length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mod.files.map((f: string, i: number) =>
                        f?.trim() ? (
                          <a
                            key={i}
                            href={f}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                          >
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                File {i + 1}
                              </p>
                              <p className="text-xs text-muted-foreground">Click to download</p>
                            </div>
                          </a>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {mod.videos.filter((v: string) => v?.trim()).length === 0 &&
                  mod.files.filter((f: string) => f?.trim()).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No content added yet. Add videos or files above.</p>
                    </div>
                  )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No modules yet. Add your first module above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
