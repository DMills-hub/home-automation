import styled from '@styled/index'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  colour?: string
}

interface Props extends React.PropsWithChildren<ButtonProps> {}

const StyledButton = styled.button`
  padding: 10px;
  background-color: ${(props) => props.theme.palette.blue};
  color: ${(props) => props.theme.palette.white};
  font-weight: bold;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const Button = (props: Props) => {
  // @ts-ignore
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default Button
