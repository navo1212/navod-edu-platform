'use client';
import { useState } from 'react';
import { api } from '@/lib/api-client';

export function AddFile({ courseId, week }: { courseId: string; week: number }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api(`/courses/${courseId}/modules/${week}/add-file`, {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    alert('File added!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste file link (Google Drive/Dropbox)" />
      <button className="btn">Add File</button>
    </form>
  );
}
