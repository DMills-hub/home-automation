import styled from '@styled/index'
import NavItem, { NavItemProps } from './components/NavItem'
import { FaPlusCircle, FaHome } from 'react-icons/fa'
import Header from '@components/Header'

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${(props: any) => props.theme.palette.zomp};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  margin-right: 20px;
  padding: 10px;
  min-width: 200px;
  gap: 15px;
`

const StyledHeader = styled(Header)`
  margin-bottom: 15px;
  color: ${(props) => props.theme.palette.white};
`

const navItems: NavItemProps[] = [
  {
    text: 'Home',
    path: '/',
    icon: <FaHome />
  },
  {
    text: 'Add Device',
    path: '/device/add',
    icon: <FaPlusCircle />
  }
]

const Navigation = () => {
  return (
    <StyledNavigation>
      <StyledHeader>Home Automation</StyledHeader>
      {navItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </StyledNavigation>
  )
}

export default Navigation
