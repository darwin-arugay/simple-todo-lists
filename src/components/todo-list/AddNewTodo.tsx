import { useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../Button'
import Form, { type FormHandle } from '../Form'

import { useTodoDispatch } from '../../context/TodoContext'
import { ETodoActionKind } from '../../reducer/todo'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input<{ $isError?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  border-radius: 4px;

  &:focus {
    border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 30px;
  gap: 5px;
`

const AddNewTodo = () => {
  const dispatch = useTodoDispatch()
  const form = useRef<FormHandle>(null)
  const input = useRef<HTMLInputElement>(null)
  const [isError, setIsError] = useState(false)

  const handleSubmit = (data: unknown) => {
    const { title } = data as { title: string }

    if (!title) {
      setIsError(true)
      input.current?.focus()
    } else {
      setIsError(false)
      dispatch({
        type: ETodoActionKind.ADD_TODO,
        payload: {
          title,
        },
      })

      form.current?.clear()
    }
  }

  return (
    <Form onSave={handleSubmit} ref={form} id='add-todo'>
      <Container>
        <FormControl>
          <Input type='text' name='title' id='title' $isError={isError} ref={input} />
          {isError && <ErrorText>This is required.</ErrorText>}
        </FormControl>
        <Button $variant='outlined'>Add</Button>
      </Container>
    </Form>
  )
}

export default AddNewTodo
