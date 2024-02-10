import { styled } from 'styled-components'
import { useTodos } from '../../context/TodoContext'

const NoDisplayText = styled.p`
  color: #ccc;
  text-align: center;
`

export const EmptyTaskMessage = () => {
  const { filterType } = useTodos()

  return (
    <NoDisplayText>{`No ${filterType !== 'all' ? filterType : ''} task on your list`}</NoDisplayText>
  )
}
