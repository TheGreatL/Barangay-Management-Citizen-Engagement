import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Upload, MessageSquare, MapPin, Tag, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { createComplaintSchema } from '../complaint-schema'
import type { TCreateComplaint } from '../complaint-schema'
import { complaintService } from '../complaint-service'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'
import { cn } from '@/shared/lib/utils'

export function ComplaintForm() {
  const navigate = useNavigate()
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCreateComplaint>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: {
      priority: 'medium',
    }
  })

  const mutation = useMutation({
    mutationFn: (data: TCreateComplaint) => complaintService.create(data),
    onSuccess: () => {
      toast.success('Your report has been received. We are on it!')
      navigate({ to: '/citizen/complaints' })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Submission failed. Please try again.')
    },
  })

  const onSubmit = (data: TCreateComplaint) => {
    mutation.mutate(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setAttachedFiles(files)
      setValue('attachments', files)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Basic Information
          </label>
          <div className="space-y-2">
            <Input
              {...register('title')}
              placeholder="What happened? Give your report a clear title"
              className={cn(
                "h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 font-bold focus:bg-white transition-all",
                errors.title && "border-red-300 ring-red-50"
              )}
            />
            {errors.title && (
              <p className="text-xs font-bold text-red-500 ml-2">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              {...register('description')}
              placeholder="Tell us more. The more details you provide, the faster we can investigate."
              rows={5}
              className={cn(
                "w-full rounded-3xl border border-slate-200 bg-slate-50/50 px-6 py-4 font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm leading-relaxed",
                errors.description && "border-red-300 ring-4 ring-red-50"
              )}
            />
            {errors.description && (
              <p className="text-xs font-bold text-red-500 ml-2">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Category
          </label>
          <div className="space-y-2">
            <select
              {...register('category')}
              className={cn(
                "w-full h-14 rounded-2xl border border-slate-200 bg-slate-50/50 px-6 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm appearance-none",
                errors.category && "border-red-300 ring-4 ring-red-50"
              )}
            >
              <option value="">Select Category</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Public Health">Public Health</option>
              <option value="Peace & Order">Peace & Order</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-xs font-bold text-red-500 ml-2">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Urgency Level
          </label>
          <div className="space-y-2">
            <select
              {...register('priority')}
              className={cn(
                "w-full h-14 rounded-2xl border border-slate-200 bg-slate-50/50 px-6 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm appearance-none",
                errors.priority && "border-red-300 ring-4 ring-red-50"
              )}
            >
              <option value="low">Low - Routine Issue</option>
              <option value="medium">Medium - Important</option>
              <option value="high">High - Immediate Attention</option>
              <option value="urgent">Urgent - Emergency/Safety Risk</option>
            </select>
            {errors.priority && (
              <p className="text-xs font-bold text-red-500 ml-2">{errors.priority.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Exact Location
        </label>
        <div className="space-y-2">
          <Input
            {...register('location')}
            placeholder="Street name, landmark, or specific area"
            className={cn(
              "h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 font-bold focus:bg-white transition-all",
              errors.location && "border-red-300 ring-red-50"
            )}
          />
          {errors.location && (
            <p className="text-xs font-bold text-red-500 ml-2">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Evidence/Photos (Optional)
        </label>
          <div className="relative group rounded-3xl border-2 border-dashed border-slate-200 p-10 text-center transition-all hover:border-primary/50 hover:bg-primary/5">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              accept="image/*,video/*"
              title="Upload evidence or photos for your report"
            />
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <Upload className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                Click to upload or drag and drop files
              </p>
              <p className="mt-1 text-xs text-slate-400 font-medium font-serif italic">
                Support for JPG, PNG and MP4 files (Max 10MB)
              </p>
            </div>
            
            {attachedFiles.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                       <Tag className="h-4 w-4 text-slate-300" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate({ to: '/citizen/complaints' })}
          className="rounded-2xl h-14 px-8 font-black text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-2xl h-14 px-12 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 leading-none"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting Report...
            </>
          ) : (
            'Send Report Now'
          )}
        </Button>
      </div>
    </form>
  )
}
