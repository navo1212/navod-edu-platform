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


'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface CourseFormProps {
  course?: Course;
}

export default function CourseForm({ course }: CourseFormProps) {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [price, setPrice] = useState<number | ''>(course?.price ?? '');
  const [category, setCategory] = useState(course?.category || '');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (course?._id) {
        await api(`/courses/${course._id}`, {
          method: 'PATCH',
          body: JSON.stringify({ title, description, price: Number(price), category }),
        });
        alert('✅ Course updated successfully');
      } else {
        await api(`/courses`, {
          method: 'POST',
          body: JSON.stringify({ title, description, price: Number(price), category }),
        });
        alert('✅ Course created successfully');
      }
      window.location.href = '/admin/courses';
    } catch (err: any) {
      alert(err.message || 'Error saving course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md">
      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value) || '')}
      />

      <input
        className="input"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="btn w-full" disabled={loading}>
        {loading ? 'Saving…' : 'Save Course'}
      </button>
    </form>
  );
}
