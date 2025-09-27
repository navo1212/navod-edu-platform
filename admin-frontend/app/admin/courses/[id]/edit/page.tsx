// // src/app/admin/courses/[id]/edit/page.tsx
// import CourseForm from '@/components/forms/CourseForm';

// export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params; // ✅ unwrap the promise

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-semibold">Edit Course</h1>
//       <CourseForm courseId={id} />
//     </div>
//   );
// }


// src/app/admin/courses/[id]/edit/page.tsx
import CourseForm from '@/components/forms/CourseForm';

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
    cache: 'no-store', // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch course with id ${id}`);
  }

  const course = await res.json();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit Course</h1>
      <CourseForm course={course} />
    </div>
  );
}
