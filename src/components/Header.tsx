import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ddd;
  border-radius: 3px;
`

const StyledHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #2a80e5;
  margin: 0;
`

const StyledSubHeading = styled.p`
  font-size: 0.875rem;
  margin: 0;
  color: #777;
  text-align: center;
`

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeading>Your Daily Agenda</StyledHeading>
      <StyledSubHeading>
        Boost your productivity by keeping track of your tasks in one place.
      </StyledSubHeading>
    </StyledHeader>
  )
}

export default Header
