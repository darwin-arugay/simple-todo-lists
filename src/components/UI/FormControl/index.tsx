import React, { ReactNode } from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 30px;
  gap: 5px;
`

type FormControlProps = {
  children: ReactNode
}

const FormControl = React.memo(({ children }: FormControlProps) => {
  return <Container>{children}</Container>
})

FormControl.displayName = 'FormControl'

export { FormControl }
