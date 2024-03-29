import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import { IconButton } from '../../UI/IconButton'
import { ETodoActionKind } from '../../../reducer/todo'
import { useTodoDispatch } from '../../../context/TodoContext'
import { Input } from '../../UI/Input'
import Form, { FormHandle } from '../../UI/Form'
import { IoClose, IoCheckmarkOutline } from 'react-icons/io5'
import { BiSolidEditAlt } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'

type TodoItemProps = {
  id: number
  completed: boolean
  title: string
}

const CancelIcon = styled(IoClose)`
  color: var(--color-error-text);
`
const SaveIcon = styled(IoCheckmarkOutline)`
  color: var(--color-success-text);
`

const EdiIcon = styled(BiSolidEditAlt)`
  color: var(--color-primary-text);
`

const DeleteIcon = styled(MdOutlineDelete)`
  color: var(--color-error-text);
`
const StyledTodoItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
  display: flex;
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
  align-items: center;
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

  const handleToggleTodo = () => {
    dispatch({
      type: ETodoActionKind.TOGGLE_COMPLETE,
      payload: {
        id,
      },
    })

    if (!completed) {
      dispatch({
        type: ETodoActionKind.DISPLAY_FEEDBACK,
        payload: {
          feedback: {
            type: 'info',
            text: 'Congats, you successfully accomplished another task! 👏💪',
            show: true,
          },
        },
      })
    }
  }

  const deleteTodo = () => {
    dispatch({
      type: ETodoActionKind.DELETE_TODO,
      payload: {
        id: id,
      },
    })

    dispatch({
      type: ETodoActionKind.DISPLAY_FEEDBACK,
      payload: {
        feedback: {
          type: 'warning',
          text: `An item with id of ${id} has been deleted.`,
          show: true,
        },
      },
    })
  }

  const handleSave = (data: unknown) => {
    const { title: updatedTitle } = data as { title: string }
    if (!updatedTitle) {
      dispatch({
        type: ETodoActionKind.DISPLAY_FEEDBACK,
        payload: {
          feedback: {
            show: true,
            text: 'Please fill the required field.',
            type: 'error',
          },
        },
      })
    } else {
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

      dispatch({
        type: ETodoActionKind.DISPLAY_FEEDBACK,
        payload: {
          feedback: {
            type: 'success',
            text: `An item with id of ${id} was successfully updated.`,
            show: true,
          },
        },
      })

      setIsEditing(false)
    }
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
            onChange={handleToggleTodo}
          />

          {isEditing ? (
            <Input name='title' id='title' ref={inputRef} defaultValue={title} $fullWidth />
          ) : (
            <TodoTextItem $completed={completed}>{title}</TodoTextItem>
          )}
        </StyledTodoItemContainer>
        <ActionContainer>
          {isEditing && !completed ? (
            <>
              <IconButton type='submit'>
                <SaveIcon />
              </IconButton>
              <IconButton type='button' onClick={handleEdit}>
                <CancelIcon />
              </IconButton>
            </>
          ) : !completed ? (
            <IconButton onClick={handleEdit} type='button'>
              <EdiIcon />
            </IconButton>
          ) : (
            <IconButton onClick={deleteTodo} type='button'>
              <DeleteIcon />
            </IconButton>
          )}
        </ActionContainer>
      </StyledTodoItem>
    </Form>
  )
})

TodoItem.displayName = 'TodoItem'

export { TodoItem }
