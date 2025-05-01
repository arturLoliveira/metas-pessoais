export interface DeleteGoalRequest {
    id: string
  }
  
  export async function deleteGoal({ id }: DeleteGoalRequest): Promise<void> {
    const response = await fetch(`http://localhost:3333/delete/goals/${id}`, {
      method: 'DELETE',
    })
  
    if (!response.ok) {
      throw new Error('Erro ao deletar a meta')
    }
  }
  