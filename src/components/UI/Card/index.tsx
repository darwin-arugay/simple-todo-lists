import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledCard = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 30rem;
  max-height: 450px;
  min-height: 450px;
  overflow-y: hidden;
  margin: auto;
`

type CardProps = {
  children: ReactNode
}

const Card = ({ children }: CardProps) => {
  return <StyledCard>{children}</StyledCard>
}

export { Card }
