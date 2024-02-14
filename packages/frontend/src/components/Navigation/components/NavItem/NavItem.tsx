import styled from '@styled/index'
import { Link } from 'react-router-dom'

export interface NavItemProps {
  path: string
  text: string
  icon: JSX.Element
}

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.white};
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  height: max-content;
  gap: 10px;
  text-decoration: none;
  transition: 0.3s ease-in-out all;

  &:hover {
    gap: 20px;
  }
`

const NavItem = (props: NavItemProps) => {
  return (
    <StyledLink to={props.path}>
      {props.icon}
      {props.text}
    </StyledLink>
  )
}

export default NavItem
