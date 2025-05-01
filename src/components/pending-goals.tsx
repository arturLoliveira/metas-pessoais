import { Plus, X } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'
import { deleteGoal } from '../http//delete-goal'
import { toast } from 'sonner'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (isLoading || !data) {
    return null
  }

  async function handleCreateGoalCompletion(goalId: string) {
    await createGoalCompletion({ goalId })

    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
  }

  async function handleDeleteGoal(goalId: string) {
    try {
      await deleteGoal({ id: goalId })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      toast.success('Meta excluída com sucesso!')
    } catch {
      toast.error('Erro ao excluir a meta.')
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals.map(goal => (
        <div key={goal.id} className="relative">
          <OutlineButton
            onClick={() => handleCreateGoalCompletion(goal.id)}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            className="pr-10" // espaço para o botão X
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>

          <button
            onClick={() => handleDeleteGoal(goal.id)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500"
            title="Excluir"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
