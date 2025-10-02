// // src/app/courses/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api-client';

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<any[]>([]);

//   useEffect(() => {
//     api('/courses').then(setCourses);
//   }, []);


//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {courses.map((c) => (
//         <a key={c._id} href={`/dashboard/courses/${c._id}`} className="border p-4 rounded shadow-sm hover:shadow-md">
//           <h2 className="font-semibold text-lg">{c.title}</h2>
//           <p className="text-sm text-gray-600">{c.description}</p>
//           <p className="font-medium mt-2">${c.price}</p>
//         </a>
//       ))}
//     </div>
//   );
// }


// src/app/courses/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { useCart } from '@/context/CartContext';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api('/courses').then(setCourses);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((c) => (
        <div
          key={c._id}
          className="border p-4 rounded shadow-sm hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <h2 className="font-semibold text-lg">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="font-medium mt-2">${c.price}</p>
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href={`/dashboard/courses/${c._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              View Details
            </a>
            <button
  onClick={() => {
    addToCart(c);
    alert(`Added ${c.title} to cart`);
  }}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
>
  Add to Cart
</button>

          </div>
        </div>
      ))}
    </div>
  );
}
