import { useQuery } from 'react-query'

const useApi = (
  key: string,
  apiRoute: string,
  json?: { [key: string]: any }
) => {
  async function getApiData() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api`

    const res = await fetch(`${apiUrl}/${apiRoute}`, {
      method: 'POST',
      body: json ? JSON.stringify(json) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res)

    return res.json()
  }

  const query = useQuery(key, getApiData)

  return query
}

export default useApi
