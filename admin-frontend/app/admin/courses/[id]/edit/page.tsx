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







// src/app/admin/courses/[id]/page.tsx
'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { AddYoutubeVideo } from '@/components/forms/AddYoutubeVideo';
import { AddFile } from '@/components/forms/AddFile';
import { api } from '@/lib/api-client';

export default function AdminCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap params

  const [course, setCourse] = useState<any>(null);
  const [newModule, setNewModule] = useState({ week: '', title: '' });

  useEffect(() => {
    api(`/courses/${id}`).then(setCourse);
  }, [id]);

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { week: Number(newModule.week), title: newModule.title };
    const updated = await api(`/courses/${id}/modules`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setCourse(updated);
    setNewModule({ week: '', title: '' });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Manage Course: {course.title}</h1>

      {/* Add Module Form */}
      <form onSubmit={handleAddModule} className="space-y-3 border p-4 rounded">
        <h2 className="text-lg font-semibold">Add New Module</h2>
        <input
          type="number"
          placeholder="Week number"
          value={newModule.week}
          onChange={(e) => setNewModule({ ...newModule, week: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Module title"
          value={newModule.title}
          onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
          className="input"
          required
        />
        <button className="btn">+ Add Module</button>
      </form>

      {/* Modules List */}
      {course.modules?.map((mod: any) => (
        <div key={mod.week} className="border p-4 rounded space-y-4">
          <h2 className="text-xl font-semibold">
            Week {mod.week}: {mod.title}
          </h2>

          {/* Add video/file */}
          <AddYoutubeVideo courseId={course._id} week={mod.week} />
          <AddFile courseId={course._id} week={mod.week} />

          {/* Existing videos */}
          {mod.videos.length > 0 && (
            <div className="space-y-2">
              {mod.videos.map((v: string, i: number) =>
                v?.trim() ? ( // ✅ only render if not empty
                  <iframe
                    key={i}
                    src={v}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null
              )}
            </div>
          )}

          {/* Existing files */}
          {mod.files.length > 0 && (
            <div className="space-y-2">
              {mod.files.map((f: string, i: number) =>
                f?.trim() ? ( // ✅ only render if not empty
                  <a
                    key={i}
                    href={f}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 underline"
                  >
                    Download File {i + 1}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
