// app/courses/[id]/page.tsx
export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
    cache: 'no-store',
  });
  const course = await res.json();

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
    </div>
  );
}
