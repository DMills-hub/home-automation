import styled from '@styled/index'

const StyledInput = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 3px;
  outline: none;
`

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return <StyledInput {...props} />
}

export default Input
