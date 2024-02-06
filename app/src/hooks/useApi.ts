import { useQuery } from 'react-query'

const useApi = (
  key: string,
  apiRoute: string,
  json?: { [key: string]: any }
) => {
  async function getApiData() {
    const prodHref = window.location.href

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? prodHref.substring(0, prodHref.length - 1)
        : process.env.REACT_APP_API_HOST

    const res = await fetch(`${baseUrl}/api/${apiRoute}`, {
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
