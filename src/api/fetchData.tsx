import { useEffect, useState } from "react";

const useFetchData = (fetchUrl: string) => {
  const [data, setData] = useState<any>();

  // Assuming that error won't happen durign fetching.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchUrl);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, [fetchUrl]);
  return data;
};

export default useFetchData;
