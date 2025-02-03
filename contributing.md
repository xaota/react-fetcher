## Building


```shell
$ npm install
$ npm run build
```
## Testing
TODO:

## Types

```ts
type FetchService<
  Request extends Array<unknown> = [],
  Response = void
> = (
  ...args: [...Request, AbortSignal | undefined]
) => Promise<Response>;

type FetchHookResult<
  Request extends Array<unknown> = [],
  Response = void
> = {
  promise: Promise<Response>;
  fetcher: (...args: [...Request]) => void;
};
```
