import React from 'react'
import List from '../List'
import Tabs, { Tab } from '../../Tabs'
import { Button } from '../../Button'
import AddNewTodo from '../AddNewTodo'

import { ActionContainer, Divider } from './styles'
import { useTodoDispatch, useTodos } from '../../../context/TodoContext'
import { FilterType, ETodoActionKind } from '../../../reducer/todo'

const Todo = () => {
  const dispatch = useTodoDispatch()
  const { filterType } = useTodos()

  const filterTodo = (filter: FilterType) => {
    dispatch({
      type: ETodoActionKind.FILTER_TODO,
      payload: {
        filter,
      },
    })
  }
  // TODO: Add a count in the buttons (indicator)

  const actions = [
    {
      label: 'All',
      filterTodo() {
        filterTodo(FilterType.ALL)
      },
    },
    {
      label: 'Pending',
      filterTodo() {
        filterTodo(FilterType.PENDING)
      },
    },
    {
      label: 'Completed',
      filterTodo() {
        filterTodo(FilterType.COMPLETED)
      },
    },
  ]

  return (
    <section className='todo-container'>
      <AddNewTodo />
      <Divider $my={1.2} />
      <ActionContainer>
        <Tabs>
          {actions.map((action) => {
            const { label, filterTodo } = action

            return (
              <Tab
                key={label}
                handleClick={filterTodo}
                active={filterType === label.toLocaleLowerCase()}
              >
                {label}
              </Tab>
            )
          })}
        </Tabs>
        <Button $variant='primary'>Clear All</Button>
      </ActionContainer>
      <Divider $my={1.2} />
      <List />
    </section>
  )
}

export default Todo
