import styled from 'styled-components'

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: fit-content;
`

export const Divider = styled.hr<{ $mb?: number; $my?: number }>`
  border: none;
  border-bottom: 1px solid #cccc;
  margin-bottom: ${(props) => (props.$mb ? `${props.$mb}rem` : '')};
  margin: ${(props) => (props.$my ? `${props.$my}rem 0` : '')};
`
