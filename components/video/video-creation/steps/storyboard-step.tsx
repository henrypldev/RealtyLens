"use client"

import * as React from "react"
import Image from "next/image"
import { 
    IconPhoto, 
    IconPlus, 
    IconX, 
    IconLoader2, 
    IconArrowRight,
    IconScissors,
    IconTrash
} from "@tabler/icons-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { getVideoTemplateById } from "@/lib/video/video-templates"
import { uploadVideoSourceImageAction } from "@/lib/actions/video"
import type { VideoImageItem } from "@/hooks/use-video-creation"

interface StoryboardStepProps {
  selectedTemplateId: string
  images: VideoImageItem[]
  onAddImageToSlot: (image: Omit<VideoImageItem, "sequenceOrder" | "startImageUrl" | "startImageId" | "startImageGenerationId" | "endImageUrl" | "endImageId" | "endImageGenerationId">, slotIndex: number) => void
  onUpdateSlotImage: (slotIndex: number, type: "start" | "end", image: { id: string; url: string; imageGenerationId?: string | null }) => void
  onUpdateTransitionType: (slotIndex: number, transitionType: "cut" | "seamless") => void
  onRemoveImage: (id: string) => void
}

export function StoryboardStep({
  selectedTemplateId,
  images,
  onAddImageToSlot,
  onUpdateSlotImage,
  onUpdateTransitionType,
  onRemoveImage,
}: StoryboardStepProps) {
  const template = getVideoTemplateById(selectedTemplateId)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [activeSlotIndex, setActiveSlotIndex] = React.useState<number | null>(null)
  const [activeFrameType, setActiveFrameType] = React.useState<"start" | "end" | "both">("both")
  const [uploadingSlotIndex, setUploadingSlotIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)
  const [dragOverFrame, setDragOverFrame] = React.useState<"start" | "end" | "both">("both")

  const uploadFile = React.useCallback(async (file: File, index: number, frameType: "start" | "end" | "both" = "both") => {
    if (!template) return

    setUploadingSlotIndex(index)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadVideoSourceImageAction(formData)

      if (result.success) {
         if (frameType === "both") {
            const slot = template.slots[index]
            onAddImageToSlot({
               id: result.imageId,
               url: result.url,
               roomType: slot?.roomType || "other",
               roomLabel: slot?.label || "",
            }, index)
         } else {
            onUpdateSlotImage(index, frameType, {
               id: result.imageId,
               url: result.url,
            })
         }
      } else {
          toast.error("Failed to upload image")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploadingSlotIndex(null)
    }
  }, [template, onAddImageToSlot, onUpdateSlotImage])

  const handleAddClick = (index: number, frameType: "start" | "end" | "both" = "both") => {
    setActiveSlotIndex(index)
    setActiveFrameType(frameType)
    // Small timeout to ensure state is set before click (safeguard)
    setTimeout(() => {
        fileInputRef.current?.click()
    }, 0)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || activeSlotIndex === null) return

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    await uploadFile(file, activeSlotIndex, activeFrameType)
    setActiveSlotIndex(null)
  }

  const handleDragOver = (e: React.DragEvent, index: number, frameType: "start" | "end" | "both" = "both") => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "copy"
    setDragOverIndex(index)
    setDragOverFrame(frameType)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOverIndex(null)
    setDragOverFrame("both")
  }

  const handleDrop = async (e: React.DragEvent, index: number, frameType: "start" | "end" | "both" = "both") => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(null)
    setDragOverFrame("both")

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported")
      return
    }

    await uploadFile(file, index, frameType)
  }

  if (!template) {
      return <div>Template not found</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">{template.name}</h2>
           <p className="text-muted-foreground mt-1">{template.description}</p>
        </div>
        
        {/* Progress */}
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border">
           <div className="flex flex-col items-end">
               <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Completion</span>
               <div className="flex items-center gap-1.5">
                   <span className={cn(
                       "text-lg font-bold", 
                       images.length === template.slots.length ? "text-(--accent-green)" : "text-foreground"
                   )}>
                       {images.length}
                   </span>
                   <span className="text-muted-foreground">/</span>
                   <span className="text-muted-foreground">{template.slots.length} shots</span>
               </div>
           </div>
           
           {/* Circular Progress */}
           <div className="relative h-10 w-10">
               <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                   <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                   <path 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke={images.length === template.slots.length ? "var(--accent-green)" : "var(--accent-teal)"} 
                        strokeWidth="4" 
                        strokeDasharray={`${(images.length / template.slots.length) * 100}, 100`}
                        className="transition-all duration-500 ease-out"
                   />
               </svg>
           </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-28 gap-y-12">
         {template.slots.map((slot, index) => {
             // Find image for this slot (sequenceOrder is 1-based)
             const image = images.find(img => img.sequenceOrder === index + 1)
             const nextImage = images.find(img => img.sequenceOrder === index + 2)
             const isUploading = uploadingSlotIndex === index

             return (
                 <div key={index} className="relative space-y-3 group">
                     {/* Transition Bridge (To Next Shot) */}
                     {index < template.slots.length - 1 && (
                         <div className={cn(
                             "absolute -right-22 top-0 bottom-10 w-20 hidden md:flex flex-col items-center justify-center z-40 pointer-events-none",
                             (index + 1) % 4 === 0 && "xl:hidden", // End of row at 4 cols
                             (index + 1) % 3 === 0 && "lg:hidden xl:flex", // End of row at 3 cols
                             (index + 1) % 2 === 0 && "md:hidden lg:flex"  // End of row at 2 cols
                         )}>
                             <div className="flex items-center -space-x-2.5 pointer-events-auto group/match mb-2">
                                 <div className="relative w-10 h-14 rounded-l-xl border-y border-l bg-muted/30 overflow-hidden shadow-xs ring-1 ring-black/5 transition-transform group-hover/match:-translate-x-1">
                                     {image && <Image src={image.endImageUrl || image.url} fill className="object-cover opacity-40" alt="End frame" />}
                                 </div>
                                 <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background border shadow-md transition-all group-hover/match:scale-110 group-hover/match:border-(--accent-teal) group-hover/match:rotate-12">
                                     <IconScissors className="h-3.5 w-3.5 text-muted-foreground group-hover/match:text-(--accent-teal)" title="Continuity Match" />
                                 </div>
                                 <div className="relative w-10 h-14 rounded-r-xl border-y border-r bg-muted/30 overflow-hidden shadow-xs ring-1 ring-black/5 transition-transform group-hover/match:translate-x-1">
                                     {nextImage && <Image src={nextImage.startImageUrl || nextImage.url} fill className="object-cover opacity-40" alt="Start frame" />}
                                 </div>
                                 
                                 {/* Tooltip Label */}
                                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/match:opacity-100 transition-opacity whitespace-nowrap">
                                     <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest bg-background/80 px-1.5 py-0.5 rounded-sm border">Continuity match</span>
                                 </div>
                             </div>
                             
                             {/* Transition Toggle - Right below transition UI */}
                             {image && nextImage && (
                                 <div className="pointer-events-auto mt-1">
                                     <button
                                         onClick={(e) => {
                                             e.stopPropagation();
                                             const currentType = image.transitionType || "cut";
                                             onUpdateTransitionType(index, currentType === "cut" ? "seamless" : "cut");
                                         }}
                                         className={cn(
                                             "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-wider transition-all",
                                             (image.transitionType || "cut") === "seamless"
                                                 ? "bg-(--accent-teal)/10 border-(--accent-teal)/30 text-(--accent-teal) shadow-sm"
                                                 : "bg-background/80 border-muted-foreground/20 text-muted-foreground hover:border-muted-foreground/40"
                                         )}
                                         title={(image.transitionType || "cut") === "seamless" ? "Seamless transition enabled" : "Cut transition (click for seamless)"}
                                     >
                                         {(image.transitionType || "cut") === "seamless" ? (
                                             <>
                                                 <IconArrowRight className="h-3 w-3" />
                                                 <span>Seamless</span>
                                             </>
                                         ) : (
                                             <>
                                                 <IconScissors className="h-3 w-3" />
                                                 <span>Cut</span>
                                             </>
                                         )}
                                     </button>
                                 </div>
                             )}
                         </div>
                     )}

                     {/* Slot Header */}
                     <div className="flex items-center justify-between px-1.5 mb-1">
                         <div className="flex items-center gap-2.5">
                             <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-muted/80 text-xs font-bold text-muted-foreground ring-1 ring-black/5">
                                 {index + 1}
                             </div>
                             <span className="font-bold text-sm tracking-tight">{slot.label}</span>
                         </div>
                         {image && (
                             <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-(--accent-green)/10 border border-(--accent-green)/20">
                                 <div className="h-1.5 w-1.5 rounded-full bg-(--accent-green) animate-pulse" />
                                 <span className="text-[10px] font-bold text-(--accent-green) uppercase tracking-wider">Ready</span>
                             </div>
                         )}
                     </div>

                     <div 
                        onDragLeave={handleDragLeave}
                        className={cn(
                             "relative aspect-video rounded-xl border-2 transition-all duration-200 overflow-hidden bg-muted/30",
                             image 
                                ? "border-transparent shadow-sm" 
                                : "border-dashed border-muted-foreground/20 hover:border-(--accent-teal) hover:bg-(--accent-teal)/5",
                             dragOverIndex === index && dragOverFrame === "both" && "border-(--accent-teal) bg-(--accent-teal)/5 ring-2 ring-(--accent-teal)/20 scale-[1.02]",
                             isUploading && "border-(--accent-teal) cursor-wait"
                        )}
                     >
                         {/* Split View (Always Split now) */}
                         <div className="flex h-full w-full">
                             {/* Start Frame Area */}
                             <div 
                                className={cn(
                                    "relative flex-1 group/start cursor-pointer border-r border-white/10 transition-colors",
                                    !image && "hover:bg-foreground/5"
                                )}
                                onClick={() => image ? handleAddClick(index, "start") : handleAddClick(index, "both")}
                                onDragOver={(e) => handleDragOver(e, index, image ? "start" : "both")}
                                onDrop={(e) => handleDrop(e, index, image ? "start" : "both")}
                             >
                                 {image ? (
                                     <Image
                                         src={image.startImageUrl || image.url}
                                         alt={`${slot.label} start`}
                                         fill
                                         className="object-cover"
                                     />
                                 ) : (
                                     <div className="flex h-full w-full items-center justify-center p-4">
                                         <div className="flex flex-col items-center gap-1.5 opacity-40 group-hover/start:opacity-100 transition-opacity">
                                             <IconPhoto className="h-5 w-5" />
                                             <span className="text-[10px] font-medium uppercase tracking-tighter">Add Start</span>
                                         </div>
                                     </div>
                                 )}
                                 
                                 <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm z-10 group-hover/start:bg-(--accent-teal) transition-colors">Start</div>
                                 
                                 {image && (
                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/start:opacity-100 transition-opacity flex items-center justify-center z-10">
                                         <div className="flex flex-col items-center gap-3">
                                             <button 
                                                onClick={(e) => { e.stopPropagation(); handleAddClick(index, "start"); }}
                                                className="flex flex-col items-center gap-1 group/btn"
                                             >
                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover/btn:bg-white/40 transition-colors">
                                                     <IconPlus className="h-5 w-5" />
                                                 </div>
                                                 <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Change</span>
                                             </button>

                                             {image.startImageUrl !== image.endImageUrl && (
                                                 <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onUpdateSlotImage(index, "start", { 
                                                            id: image.endImageId,
                                                            url: image.endImageUrl,
                                                            imageGenerationId: image.endImageGenerationId
                                                        });
                                                    }}
                                                    className="flex flex-col items-center gap-1 group/btn"
                                                 >
                                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/40 backdrop-blur-md border border-red-500/30 text-white group-hover/btn:bg-red-500/60 transition-colors">
                                                         <IconTrash className="h-4 w-4" />
                                                     </div>
                                                     <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Remove</span>
                                                 </button>
                                             )}
                                         </div>
                                     </div>
                                 )}

                                 {dragOverIndex === index && (dragOverFrame === "start" || (dragOverFrame === "both" && !image)) && (
                                     <div className="absolute inset-0 bg-(--accent-teal)/80 flex flex-col items-center justify-center z-20 animate-in fade-in duration-200">
                                         <IconPlus className="h-8 w-8 text-white animate-bounce" />
                                         <span className="text-xs font-bold text-white mt-2">Drop image</span>
                                     </div>
                                 )}
                             </div>

                             {/* Transition Arrow */}
                             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-background border shadow-sm group-hover:scale-110 transition-transform">
                                 <IconArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                             </div>

                             {/* End Frame Area */}
                             <div 
                                className={cn(
                                    "relative flex-1 group/end cursor-pointer transition-colors",
                                    !image && "hover:bg-foreground/5"
                                )}
                                onClick={() => image ? handleAddClick(index, "end") : handleAddClick(index, "both")}
                                onDragOver={(e) => handleDragOver(e, index, image ? "end" : "both")}
                                onDrop={(e) => handleDrop(e, index, image ? "end" : "both")}
                             >
                                 {image ? (
                                     <Image
                                         src={image.endImageUrl || image.url}
                                         alt={`${slot.label} end`}
                                         fill
                                         className="object-cover"
                                     />
                                 ) : (
                                     <div className="flex h-full w-full items-center justify-center p-4">
                                         <div className="flex flex-col items-center gap-1.5 opacity-40 group-hover/end:opacity-100 transition-opacity">
                                             <IconPhoto className="h-5 w-5" />
                                             <span className="text-[10px] font-medium uppercase tracking-tighter">Add End</span>
                                         </div>
                                     </div>
                                 )}

                                 <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm z-10 group-hover/end:bg-(--accent-teal) transition-colors">End</div>
                                 
                                 {image && (
                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/end:opacity-100 transition-opacity flex items-center justify-center z-10">
                                         <div className="flex flex-col items-center gap-3">
                                             <button 
                                                onClick={(e) => { e.stopPropagation(); handleAddClick(index, "end"); }}
                                                className="flex flex-col items-center gap-1 group/btn"
                                             >
                                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover/btn:bg-white/40 transition-colors">
                                                     <IconPlus className="h-5 w-5" />
                                                 </div>
                                                 <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Change</span>
                                             </button>

                                             {image.startImageUrl !== image.endImageUrl && (
                                                 <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onUpdateSlotImage(index, "end", { 
                                                            id: image.startImageId,
                                                            url: image.startImageUrl,
                                                            imageGenerationId: image.startImageGenerationId
                                                        });
                                                    }}
                                                    className="flex flex-col items-center gap-1 group/btn"
                                                 >
                                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/40 backdrop-blur-md border border-red-500/30 text-white group-hover/btn:bg-red-500/60 transition-colors">
                                                         <IconTrash className="h-4 w-4" />
                                                     </div>
                                                     <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Remove</span>
                                                 </button>
                                             )}
                                         </div>
                                     </div>
                                 )}

                                 {dragOverIndex === index && dragOverFrame === "end" && (
                                     <div className="absolute inset-0 bg-(--accent-teal)/80 flex flex-col items-center justify-center z-20 animate-in fade-in duration-200">
                                         <IconPlus className="h-8 w-8 text-white animate-bounce" />
                                         <span className="text-xs font-bold text-white mt-2">Drop image</span>
                                     </div>
                                 )}
                             </div>

                             {/* Loading Overlay */}
                             {isUploading && (
                                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-50">
                                     <IconLoader2 className="h-8 w-8 animate-spin text-(--accent-teal)" />
                                     <span className="text-xs font-medium mt-2 text-foreground">Uploading...</span>
                                 </div>
                             )}
                         </div>
                     </div>

                     {/* Action Buttons Below Clip */}
                     <div className="flex items-center justify-between gap-3 px-1.5 pt-1">
                        <p className="text-[11px] text-muted-foreground/80 font-medium italic leading-snug max-w-[60%]">
                            {slot.description}
                        </p>
                        
                        {image && (
                             <button 
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     onRemoveImage(image.id)
                                 }}
                                 className="h-8 px-3 flex items-center gap-2 rounded-xl border bg-background hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-[10px] font-bold text-muted-foreground shadow-xs ring-1 ring-black/5"
                             >
                                 <IconX className="h-3.5 w-3.5" />
                                 Clear
                             </button>
                        )}
                     </div>
                 </div>
             )
         })}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
