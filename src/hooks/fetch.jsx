import useSWR from 'swr';

import api from '../services/api';

/**
 * An Axios get function using SWR.
 * @param {A String containing the route param} url
 */
export default function useFetch(route) {
  const { data, error } = useSWR(route, async (swrRoute) => {
    const response = await api.get(swrRoute);

    return response.data;
  });

  return { data, error };
}
