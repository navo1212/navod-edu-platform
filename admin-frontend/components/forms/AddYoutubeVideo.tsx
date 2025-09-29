'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

export function AddYoutubeVideo({ courseId, week }: { courseId: string; week: number }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/courses/${courseId}/modules/${week}/add-youtube-video`, {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    alert('YouTube video added!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube embed link" />
      <button className="btn">Add Video</button>
    </form>
  );
}
