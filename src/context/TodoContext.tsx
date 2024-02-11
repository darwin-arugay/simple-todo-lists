import { Dispatch, ReactNode, useContext, createContext, useReducer } from 'react'

import { type Actions, type TodoState, todoReducer, FilterType } from '../reducer/todo'

// https://react.dev/learn/scaling-up-with-reducer-and-context

const initialTodos: TodoState = {
  todos: [
    {
      id: 1,
      title: 'Learn React JS',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn Vue JS from basics to advanced',
      completed: false,
    },
    {
      id: 3,
      title: 'Update the resume',
      completed: false,
    },
  ],
  filterType: FilterType.ALL,
  feedback: null,
}

const TodoContext = createContext<TodoState>(initialTodos)
const TodoContextDispatch = createContext<Dispatch<Actions> | undefined>(undefined)

type TodoProviderProps = {
  children: ReactNode
}
// <typeof todoReducer, TodoState>
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer<typeof todoReducer>(todoReducer, initialTodos)

  return (
    <TodoContext.Provider value={todos}>
      <TodoContextDispatch.Provider value={dispatch}>{children}</TodoContextDispatch.Provider>
    </TodoContext.Provider>
  )
}

export const useTodoDispatch = () => {
  const dispatch = useContext(TodoContextDispatch)
  if (dispatch === undefined) {
    throw new Error('useDispatchTodo must be used within a TodoProvider')
  }
  return dispatch
}

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}
