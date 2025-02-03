import { useCallback, useEffect, useState } from "react";

type FetchService<Request extends Array<unknown> = [], Response = void> = (
  ...args: [...Request, AbortSignal | undefined]
) => Promise<Response>;

type FetchHookResult<Request extends Array<unknown> = [], Response = void> = {
  promise: Promise<Response>;
  fetcher: (...args: [...Request]) => void;
}

/** data service's wraper */
const useFetch = <Request extends Array<unknown> = [], Response = void>(
  service: FetchService<Request, Response>,
  initial: Response = undefined as unknown as Response
): FetchHookResult<Request, Response> => {

  const [abortController, abortControllerSet] = useState<AbortController>(new AbortController());
  const [promise, promiseSet] = useState<Promise<Response>>(Promise.resolve(initial));

  const fetcher = useCallback((...args: [...Request]): void => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const promise = service(...args, signal);

    promise.catch(error => {
      if (signal.aborted) return initial;
      throw error;
    });

    abortControllerSet(abortController);
    promiseSet(promise);
  }, [service]);

  useEffect(() => () => abortController.abort(), [abortController]);

  return { promise, fetcher };
}

export default useFetch;
