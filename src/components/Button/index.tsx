import styled from 'styled-components'

type TVariant = 'default' | 'primary' | 'outlined'

export const Button = styled.button<{ $variant?: TVariant }>`
  height: 35px;
  color: ${(props) => (props.$variant === 'primary' ? '#fff' : '#0cafff')};
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.$variant === 'primary' ? '#0cafff' : 'transparent')};
  border: 1px solid ${(props) => (props.$variant === 'outlined' ? '#0cafff' : 'transparent')};
  cursor: pointer;
  font-size: 0.875rem;
  border-radius: 4px;

  &:hover {
    border: 1px solid #0cafff;
    background-color: ${(props) => (props.$variant === 'primary' ? '#0c99df' : '')};
    color: ${(props) => (props.$variant === 'primary' ? '#fff' : '#0cafff')};
  }

  &:disabled {
    background-color: #7fd5ff;
    color: #fff;
    border-color: transparent;
    cursor: not-allowed;
  }
`
