import styled, { css } from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { getIconBySeverity } from '../../../utils/getIconBySeverity'
import { Severity } from '../../../shared/interfaces'

type AlertProps = {
  severity?: Severity
  onClose?: () => void
  text: string
  show?: boolean
}

const StyledAlert = styled.div<{ $severity: Severity }>`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0.75rem 0;
  max-width: 30rem;
  gap: 5px;

  background-color: var(--color-info-bg);
  color: var(--color-info-text);

  ${(props) =>
    props.$severity &&
    css`
      background-color: var(--color-${props.$severity}-bg);
      color: var(--color-${props.$severity}-text);
    `}
`

const StyledIcon = styled.div.attrs((props) => ({
  as: getIconBySeverity(props?.id),
}))`
  font-size: 1.2rem;
`

const StyledCloseIcon = styled(IoClose)<{ $severity: Severity }>`
  ${(props) =>
    props.$severity &&
    css`
      color: var(--color-${props.$severity}-text);
    `}
  font-size: 1.2rem;
`

const LeftContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

const Typography = styled.p`
  font-weight: 400;
  text-align: center;
`

const ActionContainer = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const Alert = ({ severity = 'info', text, show, onClose }: AlertProps) => {
  if (!show) return null
  const showCloseIcon = typeof onClose !== 'undefined'

  return (
    <StyledAlert $severity={severity}>
      <LeftContainer>
        <IconContainer>
          <StyledIcon id={severity} />
        </IconContainer>
        <Typography>{text}</Typography>
      </LeftContainer>
      {showCloseIcon && (
        <ActionContainer>
          <StyledCloseIcon $severity={severity} onClick={onClose} />
        </ActionContainer>
      )}
    </StyledAlert>
  )
}

export { Alert }
