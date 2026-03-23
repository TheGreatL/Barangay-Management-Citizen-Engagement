import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  createDocumentRequestSchema,
  documentTypeLabels,
} from '../document.schema'
import type { TCreateDocumentRequest } from '../document.schema'
import { documentService } from '../document.service'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export function DocumentForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateDocumentRequest>({
    resolver: zodResolver(createDocumentRequestSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: TCreateDocumentRequest) => documentService.create(data),
    onSuccess: () => {
      toast.success('Document request submitted successfully!')
      navigate({ to: '/dashboard/documents' })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit request')
    },
  })

  const onSubmit = (data: TCreateDocumentRequest) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Document Type
        </label>
        <select
          {...register('documentType')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select a document</option>
          {Object.entries(documentTypeLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        {errors.documentType && (
          <p className="text-sm text-red-600">{errors.documentType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Purpose (Optional)
        </label>
        <Input
          {...register('purpose')}
          placeholder="What will you use this document for?"
          className="w-full"
        />
        {errors.purpose && (
          <p className="text-sm text-red-600">{errors.purpose.message}</p>
        )}
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request Document'
        )}
      </Button>
    </form>
  )
}
