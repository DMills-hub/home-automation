import { useQuery } from 'react-query'
import { API_URL } from '@util/api'

const useApi = (
  key: string,
  apiRoute: string,
  json?: { [key: string]: any }
) => {
  async function getApiData() {
    const res = await fetch(`${API_URL}/${apiRoute}`, {
      method: 'POST',
      body: json ? JSON.stringify(json) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return res.json()
  }

  const query = useQuery(key, getApiData)

  return query
}

export default useApi
