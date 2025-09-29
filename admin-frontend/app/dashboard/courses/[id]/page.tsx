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






// src/app/courses/[id]/page.tsx
import { CourseModuleView } from '@/components/courses/CourseModuleView';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch course with id ${id}`);
  }

  const course = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      <p className="font-semibold">Price: ${course.price}</p>

      {/* Render all modules */}
      {course.modules?.map((mod: any, i: number) => (
        <CourseModuleView key={`module-${i}`} module={mod} />
      ))}
    </div>
  );
}
