import styled from 'styled-components'

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  & svg {
    font-size: 1.5rem;
  }

  &:disabled svg {
    color: #ccc;
  }
`
