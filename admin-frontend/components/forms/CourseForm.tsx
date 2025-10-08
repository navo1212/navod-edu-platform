// // src/components/forms/CourseForm.tsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api-client';

// interface CourseFormProps {
//   courseId?: string;
// }

// export default function CourseForm({ courseId }: CourseFormProps) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState<number>(0);
//   const [category, setCategory] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (courseId) {
//       api(`/courses/${courseId}`).then((c) => {
//         setTitle(c.title);
//         setDescription(c.description);
//         setPrice(c.price);
//         setCategory(c.category);
//       });
//     }
//   }, [courseId]);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (courseId) {
//         await api(`/courses/${courseId}`, {
//           method: 'PATCH',
//           body: JSON.stringify({ title, description, price, category }),
//         });
//         alert('Course updated');
//       } else {
//         await api(`/courses`, {
//           method: 'POST',
//           body: JSON.stringify({ title, description, price, category }),
//         });
//         alert('Course created');
//       }
//       window.location.href = '/admin/courses';
//     } catch (err: any) {
//       alert(err.message || 'Error saving course');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-3 max-w-md">
//       <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <input className="input" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
//       <input className="input" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//       <button className="btn w-full" disabled={loading}>
//         {loading ? 'Saving...' : 'Save Course'}
//       </button>
//     </form>
//   );
// }

// update eka ,before edit course









// 'use client';
// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api-client';

// interface CourseFormProps {
//   courseId?: string;
// }

// export default function CourseForm({ courseId }: CourseFormProps) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState<number | ''>('');
//   const [category, setCategory] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (courseId) {
//       api(`/courses/${courseId}`).then((c) => {
//         setTitle(c.title);
//         setDescription(c.description);
//         setPrice(c.price);
//         setCategory(c.category);
//       });
//     }
//   }, [courseId]);

//   const validate = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!title.trim()) newErrors.title = 'Title is required';
//     if (!description.trim()) newErrors.description = 'Description is required';
//     if (!category.trim()) newErrors.category = 'Category is required';
//     if (!price || price <= 0) newErrors.price = 'Price must be greater than 0';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       if (courseId) {
//         await api(`/courses/${courseId}`, {
//           method: 'PATCH',
//           body: JSON.stringify({ title, description, price: Number(price), category }),
//         });
//         alert('✅ Course updated successfully');
//       } else {
//         await api(`/courses`, {
//           method: 'POST',
//           body: JSON.stringify({ title, description, price: Number(price), category }),
//         });
//         alert('✅ Course created successfully');
//       }
//       window.location.href = '/admin/courses';
//     } catch (err: any) {
//       alert(err.message || 'Error saving course');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-3 max-w-md">
//       <div>
//         <input
//           className="input"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//       </div>

//       <div>
//         <textarea
//           className="input"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//       </div>

//       <div>
//         <input
//           className="input"
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(Number(e.target.value) || '')}
//         />
//         {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//       </div>

//       <div>
//         <input
//           className="input"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
//       </div>

//       <button className="btn w-full" disabled={loading}>
//         {loading ? 'Saving…' : 'Save Course'}
//       </button>
//     </form>
//   );
// }


// 'use client';
// import { useState } from 'react';
// import { api } from '@/lib/api-client';

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
// }

// interface CourseFormProps {
//   course?: Course;
// }

// export default function CourseForm({ course }: CourseFormProps) {
//   const [title, setTitle] = useState(course?.title || '');
//   const [description, setDescription] = useState(course?.description || '');
//   const [price, setPrice] = useState<number | ''>(course?.price ?? '');
//   const [category, setCategory] = useState(course?.category || '');
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (course?._id) {
//         await api(`/courses/${course._id}`, {
//           method: 'PATCH',
//           body: JSON.stringify({ title, description, price: Number(price), category }),
//         });
//         alert('✅ Course updated successfully');
//       } else {
//         await api(`/courses`, {
//           method: 'POST',
//           body: JSON.stringify({ title, description, price: Number(price), category }),
//         });
//         alert('✅ Course created successfully');
//       }
//       window.location.href = '/admin/courses';
//     } catch (err: any) {
//       alert(err.message || 'Error saving course');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-3 max-w-md">
//       <input
//         className="input"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="input"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <input
//         className="input"
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(Number(e.target.value) || '')}
//       />

//       <input
//         className="input"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />

//       <button className="btn w-full" disabled={loading}>
//         {loading ? 'Saving…' : 'Save Course'}
//       </button>
//     </form>
//   );
// }


//after ui added

"use client"
import { useState } from "react"
import type React from "react"

import { api } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Course {
  _id: string
  title: string
  description: string
  price: number
  category: string
}

interface CourseFormProps {
  course?: Course
}

export default function EnhancedCourseForm({ course }: CourseFormProps) {
  const [title, setTitle] = useState(course?.title || "")
  const [description, setDescription] = useState(course?.description || "")
  const [price, setPrice] = useState<number | "">(course?.price ?? "")
  const [category, setCategory] = useState(course?.category || "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (course?._id) {
        await api(`/courses/${course._id}`, {
          method: "PATCH",
          body: JSON.stringify({ title, description, price: Number(price), category }),
        })
      } else {
        await api(`/courses`, {
          method: "POST",
          body: JSON.stringify({ title, description, price: Number(price), category }),
        })
      }
      setSuccess(true)
      setTimeout(() => {
        window.location.href = "/admin/courses"
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Error saving course")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center animate-in zoom-in duration-300">
              <svg
                className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">
                {course ? "Course Updated!" : "Course Created!"}
              </h3>
              <p className="text-muted-foreground">Redirecting to courses list...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-2 text-balance">
            {course ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-muted-foreground">
            {course ? "Update course information below" : "Fill in the details to create a new course"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Course Title
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Introduction to Web Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pl-11 h-12 bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <Textarea
                id="description"
                placeholder="Describe what students will learn in this course..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="pl-11 min-h-[120px] bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                required
              />
            </div>
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Field */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-foreground">
                Price
              </Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || "")}
                  className="pl-11 h-12 bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <Input
                  id="category"
                  type="text"
                  placeholder="e.g., Programming, Design"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-11 h-12 bg-background border-input focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              <span>{course ? "Update Course" : "Create Course"}</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
