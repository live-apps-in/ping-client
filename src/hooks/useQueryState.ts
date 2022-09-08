import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "react-query";

interface UseStateQueryResult<TData = unknown>
  extends Omit<UseQueryResult<TData>, "data" | "isLoading"> {
  foundError: any;
}

export function useQueryState<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): [TData, boolean, UseStateQueryResult<TData>] {
  const { data, isLoading, ...otherOptions } = useQuery(options);

  const returnOptions = {
    ...otherOptions,
    foundError:
      otherOptions.isError && !otherOptions.isFetching
        ? otherOptions.error
        : null,
  };

  return [data, isLoading, returnOptions];
}
