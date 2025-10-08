// export function CourseModuleView({ module }: { module: any }) {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-lg font-bold">Week {module.week}: {module.title}</h2>

//       {/* Videos */}
//       {module.videos.map((videoUrl: string, i: number) => (
//         <iframe
//           key={i}
//           width="100%"
//           height="400"
//           src={videoUrl}
//           title={`Course video ${i + 1}`}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//       ))}

//       {/* Files */}
//       <div className="space-y-2">
//         {module.files.map((fileUrl: string, i: number) => (
//           <a key={i} href={fileUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
//             Download File {i + 1}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }


//after ui added

"use client"

import { FileDown, PlayCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CourseModule {
  week: number
  title: string
  videos: string[]
  files: string[]
}

export function EnhancedCourseModuleView({ module }: { module: CourseModule }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Module Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="text-lg font-bold">{module.week}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Week {module.week}</p>
            <h2 className="text-2xl font-bold text-foreground">{module.title}</h2>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      {module.videos && module.videos.length > 0 && (
        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg">
          <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Course Videos</h3>
              <span className="ml-auto text-sm text-muted-foreground">
                {module.videos.length} {module.videos.length === 1 ? "video" : "videos"}
              </span>
            </div>
          </div>
          <div className="space-y-6 p-6">
            {module.videos.map((videoUrl: string, i: number) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-muted/20 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
              >
                <div className="relative aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    title={`${module.title} - Video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="border-t border-border/50 bg-muted/30 px-4 py-2">
                  <p className="text-sm font-medium text-muted-foreground">Video {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Files Section */}
      {module.files && module.files.length > 0 && (
        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg">
          <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Course Materials</h3>
              <span className="ml-auto text-sm text-muted-foreground">
                {module.files.length} {module.files.length === 1 ? "file" : "files"}
              </span>
            </div>
          </div>
          <div className="space-y-2 p-6">
            {module.files.map((fileUrl: string, i: number) => {
              const fileName = fileUrl.split("/").pop() || `File ${i + 1}`
              const fileExtension = fileName.split(".").pop()?.toUpperCase() || "FILE"

              return (
                <a
                  key={i}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-border/50 bg-muted/20 px-4 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    {fileExtension}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors duration-300">
                      {fileName}
                    </p>
                    <p className="text-sm text-muted-foreground">Click to download</p>
                  </div>
                  <FileDown className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-y-0.5" />
                </a>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
