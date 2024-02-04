import React from 'react'
import styled from '@styled/index'

const StyledNavigation = styled.nav`
  display: flex;
  align-items: center;
  min-height: 80px;
  background-color: ${(props: any) => props.theme.palette.zomp};
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`

const StyledHeader = styled.header`
  margin-left: 10px;
  color: ${(props: any) => props.theme.palette.white};
  font-weight: bold;
  font-size: 1.5em;
`

const Navigation = () => {
  return (
    <StyledNavigation>
      <StyledHeader>Home Automation</StyledHeader>
    </StyledNavigation>
  )
}

export default Navigation
