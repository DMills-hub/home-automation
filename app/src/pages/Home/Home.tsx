import useApi from '@hooks/useApi'
import Button from '@components/Button'

function Home() {
  const query = useApi('healthy', 'device/health')
  return (
    <div>
      Home
      <Button text="Refetch" onClick={() => query.refetch()} />
      <p>Is healthy: {query.data?.healthy}</p>
      <p>Message: {query.data?.message}</p>
    </div>
  )
}

export default Home
