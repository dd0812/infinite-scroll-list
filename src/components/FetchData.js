import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userList, setUserList] = useState([]);

  const loadUserInfo = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(
        `https://randomuser.me/api/?results=500`
      );
      console.log(res);
      await setUserList((prev) => [...new Set([...prev, ...res.data.results])]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    loadUserInfo();
  }, [page]);

  return { loading, error, userList };
}

export default useFetch;