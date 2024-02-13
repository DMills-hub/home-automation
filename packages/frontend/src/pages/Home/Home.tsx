import useApi from '@hooks/useApi'
import Button from '@components/Button'
import styled from '@styled/index'
import { API_URL } from '@util/api'
import { useMutation } from 'react-query'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  input {
    max-width: 300px;
    padding: 10px;
  }
`

interface Elements {
  address: string
  hardware: string
  name: string
  type: string
}

type ElementKey = keyof Elements

const keys: ElementKey[] = ['address', 'hardware', 'name', 'type']

function Home() {
  const { mutate } = useMutation({
    mutationFn: async (variables: Elements) => {
      console.log('hre')

      await fetch(`${API_URL}/device/add`, {
        method: 'POST',
        body: JSON.stringify(variables)
      })
    }
  })

  const query = useApi('healthy', 'device/health')

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // @ts-ignore
    console.log(e.target.elements)
    // @ts-ignore
    const elements = Object.keys(e.target.elements).reduce(
      (accumalator, curValue) => {
        if (!keys.includes(curValue as keyof Elements)) return accumalator

        return {
          ...accumalator,
          // @ts-ignore
          [curValue]: e.target.elements[curValue].value
        }
      },
      {}
    ) as Elements

    console.log(elements)

    await mutate(elements)
  }

  return (
    <div>
      Home
      <Button onClick={() => query.refetch()}>Refetch</Button>
      <p>Is healthy: {query.data?.healthy}</p>
      <p>Message: {query.data?.message}</p>
      <Form onSubmit={onSubmit}>
        <input name="hardware" placeholder="Hardware..." />
        <input name="address" placeholder="Address..." />
        <input name="name" placeholder="Name..." />
        <input name="type" placeholder="Type..." />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Home
