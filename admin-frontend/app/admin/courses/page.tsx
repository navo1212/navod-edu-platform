// src/app/admin/courses/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api('/courses').then(setCourses);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this course?')) {
      await api(`/courses/${id}`, { method: 'DELETE' });
      setCourses(courses.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Courses</h1>
      <a href="/admin/courses/new" className="btn">+ Add Course</a>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id} className="border-t">
              <td className="p-2">{c.title}</td>
              <td className="p-2">${c.price}</td>
              <td className="p-2 space-x-2">
                <a href={`/admin/courses/${c._id}/edit`} className="text-blue-600 underline">Edit</a>
                <button onClick={() => handleDelete(c._id)} className="text-red-600 underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
