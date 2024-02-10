import { type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { TabsProvider, useTabsContext } from '../../../context/TabsContext'

const StyledList = styled.ul`
  display: flex;
  gap: 8px;
`

const StyledListItem = styled.li`
  padding: 0;
`

type TabsProps = {
  children: ReactNode
  initialActive: string
}

const Tabs = ({ children, initialActive }: TabsProps) => {
  return (
    <TabsProvider initialValue={initialActive}>
      <StyledList>{children}</StyledList>
    </TabsProvider>
  )
}

type TabProps = ComponentPropsWithoutRef<'button'> & {
  id: string
}

const Tab = ({ id: tabId, children, onClick }: TabProps) => {
  const { active, setActive } = useTabsContext()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActive(tabId)

    if (onClick) {
      onClick(e)
    }
  }

  const isActive = active === tabId

  return (
    <StyledListItem>
      <Button onClick={handleClick} $variant={isActive ? 'primary' : 'default'}>
        {children}
      </Button>
    </StyledListItem>
  )
}

Tabs.Tab = Tab

export default Tabs
