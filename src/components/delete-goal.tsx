import { X } from 'lucide-react'
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { deleteGoal } from '../http/delete-goal.ts'
import { useQueryClient } from '@tanstack/react-query'

interface DeleteGoalDialogProps {
  goalId: string
  goalTitle: string
}

export function DeleteGoalDialog({ goalId, goalTitle }: DeleteGoalDialogProps) {
  const queryClient = useQueryClient()

  async function handleDelete() {
    try {
      await deleteGoal(goalId)

      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })

      toast.success('Meta excluída com sucesso!')
    } catch {
      toast.error('Erro ao excluir a meta.')
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <DialogTitle>Excluir meta</DialogTitle>
          <DialogClose>
            <X className="size-5 text-zinc-600" />
          </DialogClose>
        </div>

        <DialogDescription>
          Tem certeza que deseja excluir a meta{' '}
          <strong className="text-zinc-200">"{goalTitle}"</strong>?
        </DialogDescription>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="secondary" onClick={handleDelete}>
              Confirmar exclusão
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  )
}
