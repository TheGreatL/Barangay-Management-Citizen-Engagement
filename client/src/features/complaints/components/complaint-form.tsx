import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  Loader2,
  Upload,
  MessageSquare,
  MapPin,
  Tag,
  AlertTriangle,
} from 'lucide-react'
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
    },
  })

  const mutation = useMutation({
    mutationFn: (data: TCreateComplaint) => complaintService.create(data),
    onSuccess: () => {
      toast.success('Your report has been received. We are on it!')
      navigate({ to: '/citizen/complaints' })
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Submission failed. Please try again.',
      )
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
      <div className="space-y-8 rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400">
            <MessageSquare className="h-4 w-4" />
            Basic Information
          </label>
          <div className="space-y-2">
            <Input
              {...register('title')}
              placeholder="What happened? Give your report a clear title"
              className={cn(
                'h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 font-bold transition-all focus:bg-white',
                errors.title && 'border-red-300 ring-red-50',
              )}
            />
            {errors.title && (
              <p className="ml-2 text-xs font-bold text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              {...register('description')}
              placeholder="Tell us more. The more details you provide, the faster we can investigate."
              rows={5}
              className={cn(
                'focus:ring-primary/5 w-full rounded-3xl border border-slate-200 bg-slate-50/50 px-6 py-4 text-sm leading-relaxed font-medium text-slate-900 placeholder-slate-400 transition-all focus:bg-white focus:ring-4 focus:outline-none',
                errors.description && 'border-red-300 ring-4 ring-red-50',
              )}
            />
            {errors.description && (
              <p className="ml-2 text-xs font-bold text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400">
              <Tag className="h-4 w-4" />
              Category
            </label>
            <div className="space-y-2">
              <select
                {...register('category')}
                className={cn(
                  'focus:ring-primary/5 h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-6 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:outline-none',
                  errors.category && 'border-red-300 ring-4 ring-red-50',
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
                <p className="ml-2 text-xs font-bold text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400">
              <AlertTriangle className="h-4 w-4" />
              Urgency Level
            </label>
            <div className="space-y-2">
              <select
                {...register('priority')}
                className={cn(
                  'focus:ring-primary/5 h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-6 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:outline-none',
                  errors.priority && 'border-red-300 ring-4 ring-red-50',
                )}
              >
                <option value="low">Low - Routine Issue</option>
                <option value="medium">Medium - Important</option>
                <option value="high">High - Immediate Attention</option>
                <option value="urgent">Urgent - Emergency/Safety Risk</option>
              </select>
              {errors.priority && (
                <p className="ml-2 text-xs font-bold text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400">
            <MapPin className="h-4 w-4" />
            Exact Location
          </label>
          <div className="space-y-2">
            <Input
              {...register('location')}
              placeholder="Street name, landmark, or specific area"
              className={cn(
                'h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-6 font-bold transition-all focus:bg-white',
                errors.location && 'border-red-300 ring-red-50',
              )}
            />
            {errors.location && (
              <p className="ml-2 text-xs font-bold text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400">
            <Upload className="h-4 w-4" />
            Evidence/Photos (Optional)
          </label>
          <div className="group hover:border-primary/50 hover:bg-primary/5 relative rounded-3xl border-2 border-dashed border-slate-200 p-10 text-center transition-all">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              accept="image/*,video/*"
              title="Upload evidence or photos for your report"
            />
            <div className="flex flex-col items-center">
              <div className="group-hover:bg-primary/10 group-hover:text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-all">
                <Upload className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-slate-600">
                Click to upload or drag and drop files
              </p>
              <p className="mt-1 font-serif text-xs font-medium text-slate-400 italic">
                Support for JPG, PNG and MP4 files (Max 10MB)
              </p>
            </div>

            {attachedFiles.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                  >
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                      <Tag className="h-4 w-4 text-slate-300" />
                    </div>
                    <span className="truncate text-[10px] font-black text-slate-500">
                      {file.name}
                    </span>
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
          className="h-14 rounded-2xl px-8 text-xs font-black text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="shadow-primary/20 h-14 rounded-2xl px-12 leading-none font-black shadow-xl transition-all hover:scale-105 active:scale-95"
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
