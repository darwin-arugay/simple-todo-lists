import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Button } from './Button'
import styled from 'styled-components'

const StyledList = styled.ul`
  display: flex;
  gap: 8px;
`

const StyledListItem = styled.li`
  padding: 0;
`

type TabsProps = {
  children: ReactNode
}

const Tabs = ({ children }: TabsProps) => {
  return (
    <div>
      <StyledList>{children}</StyledList>
    </div>
  )
}

type TabProps = ComponentPropsWithoutRef<'button'> & {
  handleClick: () => void
  active?: boolean
}

export const Tab = ({ children, handleClick, active, ...otherProps }: TabProps) => {
  return (
    <StyledListItem>
      <Button onClick={handleClick} {...otherProps} $variant={active ? 'primary' : 'default'}>
        {children}
      </Button>
    </StyledListItem>
  )
}

export default Tabs
