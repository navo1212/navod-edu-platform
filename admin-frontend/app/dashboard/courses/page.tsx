// src/app/courses/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api('/courses').then(setCourses);
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((c) => (
        <a key={c._id} href={`/dashboard/courses/${c._id}`} className="border p-4 rounded shadow-sm hover:shadow-md">
          <h2 className="font-semibold text-lg">{c.title}</h2>
          <p className="text-sm text-gray-600">{c.description}</p>
          <p className="font-medium mt-2">${c.price}</p>
        </a>
      ))}
    </div>
  );
}
