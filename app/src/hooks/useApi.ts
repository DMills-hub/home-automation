import { useQuery } from 'react-query'

const useApi = (
  key: string,
  apiRoute: string,
  json?: { [key: string]: any }
) => {
  async function getApiData() {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/${apiRoute}`,
      {
        method: 'POST',
        body: json ? JSON.stringify(json) : undefined,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return res.json()
  }

  const query = useQuery(key, getApiData)

  return query
}

export default useApi
