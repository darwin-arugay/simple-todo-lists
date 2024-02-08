import { ITodo } from '../shared/interfaces'

export enum FilterType {
  ALL = 'all',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum ETodoActionKind {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  FILTER_TODO = 'FILTER_TODO',
  TOGGLE_COMPLETE = 'TOGGLE_COMPLETE',
  DELETE_TODO = 'DELETE_TODO',
}

type ADD_TODO = {
  type: ETodoActionKind.ADD_TODO
  payload: {
    title: string
  }
}

type REMOVE_TODO = {
  type: ETodoActionKind.REMOVE_TODO
  payload: {
    id: number
  }
}

type TOGGLE_COMPLETE = {
  type: ETodoActionKind.TOGGLE_COMPLETE
  payload: {
    id: number
  }
}

type FILTER_TODO = {
  type: ETodoActionKind.FILTER_TODO
  payload: {
    filter: FilterType
  }
}

type DELETE_TODO = {
  type: ETodoActionKind.DELETE_TODO
  payload: {
    id: number
  }
}

export type Actions = ADD_TODO | REMOVE_TODO | FILTER_TODO | TOGGLE_COMPLETE | DELETE_TODO

export type TodoState = {
  todos: ITodo[]
  filterType: FilterType
}

export const todoReducer = (state: TodoState, action: Actions) => {
  const { todos } = state
  const { payload, type } = action
  const gereratedId = Math.floor(1_000_000 * Math.random())

  switch (type) {
    case ETodoActionKind.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: gereratedId,
            completed: false,
            title: payload.title,
          },
        ],
      }

    case ETodoActionKind.TOGGLE_COMPLETE: {
      const result = todos.map((todo) => {
        if (todo.id === payload.id) {
          console.log('inside if', payload.id)
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
      console.group('Result')
      console.table(result)
      console.groupEnd()
      return {
        ...state,
        todos: result,
      }
    }

    case ETodoActionKind.FILTER_TODO:
      return {
        ...state,
        filterType: payload.filter,
      }

    case ETodoActionKind.DELETE_TODO:
      console.log(payload.id)
      return {
        ...state,
        todos: todos.filter((todo) => todo.id !== payload.id),
      }

    default:
      throw new Error('Unrecongnize filter action')
  }
}
