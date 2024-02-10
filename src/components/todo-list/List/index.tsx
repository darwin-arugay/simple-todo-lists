import React from 'react'
import { styled } from 'styled-components'

import { ITodo } from '../../../shared/interfaces'
import { TodoItem } from '../Item'

const ListContainer = styled.ul`
  max-height: 350px;
  overflow-y: auto;
`

type ListProps = {
  todos: ITodo[]
}

const List = React.memo(({ todos }: ListProps) => {
  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ListContainer>
  )
})

List.displayName = 'List'

export default List
