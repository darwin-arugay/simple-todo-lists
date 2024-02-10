import List from '../List'
import Tabs from '../../Tabs'
import { Button } from '../../Button'
import AddNewTodo from '../AddNewTodo'

import { ActionContainer, Divider } from './styles'
import { useTodoDispatch } from '../../../context/TodoContext'
import { FilterType, ETodoActionKind } from '../../../reducer/todo'

const Todo = () => {
  const dispatch = useTodoDispatch()

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
    <section className='todo-container'>
      <AddNewTodo />
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
        <Button $variant='primary'>Clear All</Button>
      </ActionContainer>
      <Divider $my={1.2} />
      <List />
    </section>
  )
}

export default Todo
