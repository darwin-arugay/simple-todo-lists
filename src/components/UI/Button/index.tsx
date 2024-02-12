import styled from 'styled-components'

type TVariant = 'default' | 'primary' | 'outlined'

export const Button = styled.button<{ $variant?: TVariant; $fullWidth?: boolean }>`
  height: 35px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;

  ${(props) =>
    props.$fullWidth &&
    `
    width: 100%;
    `}

  /* Default styles */
  color: var(--color-primary-text);
  background-color: transparent;

  /* Variant styles */
  ${(props) =>
    props.$variant === 'primary' &&
    `
    color: #fff;
    background-color: var(--color-primary-text);

    &:hover {
      background-color: #0c99df;
    }
  `}

  ${(props) =>
    props.$variant === 'outlined' &&
    `
    color: var(--color-primary-text);
    border: 1px solid var(--color-primary-text);

    &:hover {
      background-color: var(--color-primary-text);
      color: #fff;
    }
  `}

  /* Disabled styles */
  &:disabled {
    background-color: #7fd5ff;
    color: #fff;
    border-color: transparent;
    cursor: not-allowed;
  }
`
