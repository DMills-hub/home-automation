import styled from '@styled/index'
import PageContainer from '@components/styled/PageContainer'
import Input from '@components/Input'
import Button from '@components/Button'

const Form = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const StyledPageContainer = styled(PageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Controller = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-weight: bold;
`

const SubmitButton = styled(Button)`
  font-size: 18px;
`

const AddDevice = () => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <StyledPageContainer>
      <Form onSubmit={onSubmit}>
        <Controller>
          <Label>Name</Label>
          <Input name="name" placeholder="Name..." />
        </Controller>
        <Controller>
          <Label>Hardware</Label>
          <Input name="hardware" placeholder="Hardware..." />
        </Controller>
        <Controller>
          <Label>Address</Label>
          <Input name="address" placeholder="Address..." />
        </Controller>
        <Controller>
          <Label>Type</Label>
          <Input name="type" placeholder="Type..." />
        </Controller>
        <SubmitButton type="submit">Save Device</SubmitButton>
      </Form>
    </StyledPageContainer>
  )
}

export default AddDevice
