import { styled } from 'styled-components'

export const Input = styled.input<{ $isError?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  border-radius: 4px;

  &:focus {
    border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  }
`
