import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { Button } from '../../Button'

import { useTodoDispatch, useTodos } from '../../../context/TodoContext'
import { FilterType, ETodoActionKind } from '../../../reducer/todo'
import { ITodo } from '../../../shared/interfaces'

const ListContainer = styled.ul<{ $padding: string }>`
  // padding: ${(props) => props.$padding};
  min-height: 40vh;
  overflow-y: auto;
`

const ListItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`

const TodoTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const TodoTextItem = styled.span<{ $completed?: boolean }>`
  font-size: 0.875rem;
  cursor: pointer;
  color: ${(props) => (props.$completed ? '#ccc' : '')};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : '')};
`

const NoDisplayText = styled.p`
  color: #ccc;
  text-align: center;
`

const Checkbox = styled.input`
  cursor: pointer;
`

const getFilteredTodo = (todos: ITodo[], filter: FilterType) => {
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

const List = () => {
  const { todos, filterType } = useTodos()
  const dispatch = useTodoDispatch()
  let content = null
  // const [checkboxValue, setCheckoxValue] = useState(false)

  const filteredTodos = useMemo(() => getFilteredTodo(todos, filterType), [todos, filterType])

  const deleteTodo = (todoId: number) => {
    console.log('Deleted', todoId)
    dispatch({
      type: ETodoActionKind.DELETE_TODO,
      payload: {
        id: todoId,
      },
    })
  }

  const handleToggleTodo = (event: undefined | React.ChangeEvent<HTMLInputElement>, id: number) => {
    console.log(id)
    event?.stopPropagation()
    dispatch({
      type: ETodoActionKind.TOGGLE_COMPLETE,
      payload: {
        id,
      },
    })
  }

  if (!filteredTodos.length) {
    content = (
      <NoDisplayText>{`No ${filterType !== 'all' ? filterType : ''} task on your list`}</NoDisplayText>
    )
  } else {
    content = filteredTodos.map((todo) => (
      <ListItem key={todo.id}>
        {/* TODO: Fixed */}
        {/* onClick={() => handleToggleTodo(undefined, todo.id)} */}
        <TodoTextContainer>
          <Checkbox
            type='checkbox'
            checked={todo.completed}
            onChange={(e) => handleToggleTodo(e, todo.id)}
          />
          <TodoTextItem $completed={todo.completed}>{todo.title}</TodoTextItem>
        </TodoTextContainer>
        <Button disabled={todo.completed} onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </ListItem>
    ))
  }

  return <ListContainer $padding={!filteredTodos.length ? '1.5rem 0' : ''}>{content}</ListContainer>
}

export default List
