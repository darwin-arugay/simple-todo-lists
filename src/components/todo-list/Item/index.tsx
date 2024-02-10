import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import { Button } from '../../UI/Button'
import { ETodoActionKind } from '../../../reducer/todo'
import { useTodoDispatch } from '../../../context/TodoContext'
import { Input } from '../../UI/Input'
import Form, { FormHandle } from '../../UI/Form'

type TodoItemProps = {
  id: number
  completed: boolean
  title: string
}

const StyledTodoItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  // justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`

const StyledTodoItemContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
`

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
`

const TodoTextItem = styled.span<{ $completed?: boolean }>`
  font-size: 0.875rem;
  cursor: pointer;
  color: ${(props) => (props.$completed ? '#ccc' : '')};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : '')};
`

const Checkbox = styled.input`
  cursor: pointer;
`

const TodoItem = React.memo(({ id, completed, title }: TodoItemProps) => {
  const dispatch = useTodoDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<FormHandle>(null)

  const [isEditing, setIsEditing] = useState(false)

  const handleToggleTodo = (event: undefined | React.ChangeEvent<HTMLInputElement>, id: number) => {
    event?.stopPropagation()
    dispatch({
      type: ETodoActionKind.TOGGLE_COMPLETE,
      payload: {
        id,
      },
    })
  }

  const deleteTodo = () => {
    dispatch({
      type: ETodoActionKind.DELETE_TODO,
      payload: {
        id: id,
      },
    })
  }

  const handleSave = (data: unknown) => {
    const { title: updatedTitle } = data as { title: string }
    dispatch({
      type: ETodoActionKind.UPDATE_TODO,
      payload: {
        todo: {
          id,
          completed,
          title: updatedTitle,
        },
      },
    })

    setIsEditing(false)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsEditing((prev) => !prev)
  }

  return (
    <Form ref={formRef} id='update-todo' onSave={handleSave}>
      <StyledTodoItem key={id}>
        <StyledTodoItemContainer>
          <Checkbox
            type='checkbox'
            checked={completed}
            disabled={isEditing}
            onChange={(e) => handleToggleTodo(e, id)}
          />

          {isEditing ? (
            <Input name='title' id='title' ref={inputRef} defaultValue={title} />
          ) : (
            <TodoTextItem $completed={completed}>{title}</TodoTextItem>
          )}
        </StyledTodoItemContainer>
        <ActionContainer>
          {!completed ? (
            isEditing ? (
              <>
                <Button $variant='primary' type='submit'>
                  Save
                </Button>
                <Button $variant='outlined' type='submit' onClick={handleEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button $variant='outlined' disabled={completed} onClick={handleEdit} type='button'>
                Edit
              </Button>
            )
          ) : (
            <Button onClick={deleteTodo} type='button'>
              Delete
            </Button>
          )}
        </ActionContainer>
      </StyledTodoItem>
    </Form>
  )
})

TodoItem.displayName = 'TodoItem'

export { TodoItem }
