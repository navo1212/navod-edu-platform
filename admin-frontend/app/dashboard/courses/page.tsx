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


// // src/app/courses/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api-client';
// import { useCart } from '@/context/CartContext';

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     api('/courses').then(setCourses);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {courses.map((c) => (
//         <div
//           key={c._id}
//           className="border p-4 rounded shadow-sm hover:shadow-md flex flex-col justify-between"
//         >
//           <div>
//             <h2 className="font-semibold text-lg">{c.title}</h2>
//             <p className="text-sm text-gray-600">{c.description}</p>
//             <p className="font-medium mt-2">${c.price}</p>
//           </div>

//           <div className="mt-4 flex gap-3">
//             {/* <a
//               href={`/dashboard/courses/${c._id}`}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//             >
//               View Details
//             </a> */}
//             <button
//   onClick={() => {
//     addToCart(c);
//     alert(`Added ${c.title} to cart`);
//   }}
//   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
// >
//   Add to Cart
// </button>

//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


//aftr ui added

"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api-client"
import { useCart } from "@/context/CartContext"
import { BookOpen, ShoppingCart, Loader2, Tag, CheckCircle2 } from "lucide-react"

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addedCourseId, setAddedCourseId] = useState<string | null>(null)
  const { addToCart, cart } = useCart()

  useEffect(() => {
    api("/courses")
      .then((data) => {
        console.log("[v0] Courses fetched:", data)
        if (data.length > 0) {
          console.log("[v0] First course keys:", Object.keys(data[0]))
          console.log("[v0] First course id field:", data[0].id)
          console.log("[v0] First course _id field:", data[0]._id)
        }
        setCourses(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAddToCart = (course: any) => {
    const courseId = course.id || course._id
    console.log("[v0] Adding course to cart:", { courseId, title: course.title })

    addToCart({
      id: courseId,
      title: course.title,
      description: course.description,
      price: course.price,
    })
    setAddedCourseId(courseId)
    setTimeout(() => setAddedCourseId(null), 2000)
  }

  const isInCart = (courseId: string) => {
    return cart.some((item) => item.id === courseId)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
        <p className="text-muted-foreground">Explore our collection of courses and start learning today.</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses available</h3>
          <p className="text-muted-foreground">Check back later for new courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => {
            const courseId = c.id || c._id
            return (
              <div
                key={courseId}
                className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50 flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/40" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1 space-y-3">
                    {c.category && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        <span className="uppercase tracking-wide">{c.category}</span>
                      </div>
                    )}

                    <h2 className="font-semibold text-xl group-hover:text-primary transition-colors">{c.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${c.price}</span>
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(c)}
                      disabled={isInCart(courseId)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                        addedCourseId === courseId
                          ? "bg-green-600 text-white"
                          : isInCart(courseId)
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow"
                      }`}
                    >
                      {addedCourseId === courseId ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Added to Cart!
                        </>
                      ) : isInCart(courseId) ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          In Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
