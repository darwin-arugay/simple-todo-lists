import { useTodos } from '../../context/TodoContext'
import { Alert } from '../UI/Alert'

export const EmptyTaskMessage = () => {
  const { filterType } = useTodos()

  return <Alert text={`No ${filterType !== 'all' ? filterType : ''} task on your list`} show />
}
