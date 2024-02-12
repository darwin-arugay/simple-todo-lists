import { styled } from 'styled-components'

export const Input = styled.input<{ $isError?: boolean; $fullWidth?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  border-radius: 4px;

  ${(props) =>
    props.$fullWidth &&
    `
    width: 100%;
  `}

  &:focus {
    border: 1.5px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
  }
`
