import { useMemo } from 'react'
import List from '../List'
import Tabs from '../../UI/Tabs'
// import { Button } from '../../UI/Button'
import NewTodo from '../NewTodo'
import { EmptyTaskMessage } from '../EmptyTaskMessage'
import { Card } from '../../UI/Card'
import Header from '../../Header'

import { ActionContainer, Divider } from './styles'
import { useTodoDispatch, useTodos } from '../../../context/TodoContext'
import { FilterType, ETodoActionKind } from '../../../reducer/todo'
import { getFilteredTodo } from '../../../utils/getFilteredTodos'

const Todo = () => {
  const dispatch = useTodoDispatch()
  const { todos, filterType } = useTodos()

  const filteredTodos = useMemo(() => getFilteredTodo(todos, filterType), [todos, filterType])

  const filterTodo = (filter: FilterType) => {
    dispatch({
      type: ETodoActionKind.FILTER_TODO,
      payload: {
        filter,
      },
    })
  }

  const actions = [
    {
      label: 'All',
      filterTodo() {
        filterTodo(FilterType.ALL)
      },
      id: FilterType.ALL,
    },
    {
      label: 'Pending',
      filterTodo() {
        filterTodo(FilterType.PENDING)
      },
      id: FilterType.PENDING,
    },
    {
      label: 'Completed',
      filterTodo() {
        filterTodo(FilterType.COMPLETED)
      },
      id: FilterType.COMPLETED,
    },
  ]

  return (
    <Card>
      <Header />
      <NewTodo />
      <Divider $my={1.2} />
      <ActionContainer>
        <Tabs initialActive='all'>
          {actions.map((action) => {
            const { label, filterTodo, id } = action
            return (
              <Tabs.Tab key={label} id={id} onClick={filterTodo}>
                {label}
              </Tabs.Tab>
            )
          })}
        </Tabs>
        {/* <Button $variant='primary' disabled>
          Clear All
        </Button> */}
      </ActionContainer>
      <Divider $my={1.2} />
      <>{filteredTodos.length ? <List todos={filteredTodos} /> : <EmptyTaskMessage />}</>
    </Card>
  )
}

export default Todo
