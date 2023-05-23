import useApi from '../../hooks/useApi'
import Button from '../../components/Button'

function Home() {
  const query = useApi('devices', 'device/all')
  console.log(query.data)
  return (
    <div>
      Home
      <Button text="Refetch" onClick={() => query.refetch()} />
    </div>
  )
}

export default Home
