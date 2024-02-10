import { FilterType } from '../reducer/todo'
import { ITodo } from '../shared/interfaces'

export const getFilteredTodo = (todos: ITodo[], filter: FilterType) => {
  switch (filter) {
    case FilterType.ALL:
      return todos
    case FilterType.PENDING:
      return todos.filter((todo) => !todo.completed)
    case FilterType.COMPLETED:
      return todos.filter((todo) => todo.completed)

    default:
      throw new Error('Unrecognized filter value')
  }
}
