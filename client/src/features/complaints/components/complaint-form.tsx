import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { createComplaintSchema } from '../complaint.schema'
import type { TCreateComplaint } from '../complaint.schema'
import { complaintService } from '../complaint.service'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'

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
  })

  const mutation = useMutation({
    mutationFn: (data: TCreateComplaint) => complaintService.create(data),
    onSuccess: () => {
      toast.success('Complaint submitted successfully!')
      navigate({ to: '/dashboard/complaints' })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit complaint')
    },
  })

  const onSubmit = (data: TCreateComplaint) => {
    mutation.mutate({ ...data, attachments: attachedFiles })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setAttachedFiles(files)
      setValue('attachments', files)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Complaint Title
        </label>
        <Input
          {...register('title')}
          placeholder="Brief description of your complaint"
          className="w-full"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Detailed Description
        </label>
        <textarea
          {...register('description')}
          placeholder="Please provide detailed information about your complaint"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="safety">Safety</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Priority
          </label>
          <select
            {...register('priority')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          {errors.priority && (
            <p className="text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Location
        </label>
        <Input
          {...register('location')}
          placeholder="Where did this incident occur?"
          className="w-full"
        />
        {errors.location && (
          <p className="text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Attach Photos/Videos (Optional)
        </label>
        <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-gray-400">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            accept="image/*,video/*"
          />
          <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag and drop files here, or click to select
          </p>
          {attachedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachedFiles.map((file, idx) => (
                <p key={idx} className="text-xs text-gray-500">
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Complaint'
        )}
      </Button>
    </form>
  )
}
