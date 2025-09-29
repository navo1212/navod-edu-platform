export function CourseModuleView({ module }: { module: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Week {module.week}: {module.title}</h2>

      {/* Videos */}
      {module.videos.map((videoUrl: string, i: number) => (
        <iframe
          key={i}
          width="100%"
          height="400"
          src={videoUrl}
          title={`Course video ${i + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ))}

      {/* Files */}
      <div className="space-y-2">
        {module.files.map((fileUrl: string, i: number) => (
          <a key={i} href={fileUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
            Download File {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
