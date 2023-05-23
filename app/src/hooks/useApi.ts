import { useQuery } from "react-query";

const useApi = (key: string, apiRoute: string) => {
  async function getApiData() {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/${apiRoute}`,
      {
        method: "POST",
      }
    );
    return res.json();
  }

  const query = useQuery(key, getApiData);

  return query;
};

export default useApi;
