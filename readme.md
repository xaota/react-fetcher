# useFetch for React 19+

> This package from 🇷🇺 Russia with love!
>
> You can read this readme in [Russian](./readme.ru.md).

## Motivation / Features
This hook does not return the request result, loading state, or error.

It returns a promise that can be handled in React 19+ style using the `use` hook / `Suspense` and `ErrorBoundary`.

- [x] Using the `use` hook from React 19+ to await data
- [x] Using the `Suspense` component to await data
- [x] Using the `ErrorBoundary` component to catch errors
- [x] Automatic request cancellation when the component is unmounted (relevant for StrictMode)

## Installation

```shell
$ npm install react-use-fetch
```

## Usage

```tsx
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useFetch from 'react-use-fetch';

const service = () => fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());

const Example: FC = () => {
  const { promise, fetcher } = useFetch(service);

  return (
    <>
      <Button onClick={fetcher}>get todo</Button>

      <ErrorBoundary fallback={<>Something was wrong!</>}>
        <Suspense fallback={<>Loading...</>}>
          <TodoData promise={promise} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
};

const TodoData: FC<{ promise: Promise<any> }> = props => {
  const { promise } = props;
  const todo = use(promise);

  return (
    <>
      {JSON.stringify(todo, null, 2)}
    </>
  );
};
```

## API
`useFetch(service, initial?)`

parms
- `service(...args: Array<any>, signal?: AbortSignal) => Promise<any>` - async function
- `initial` - initial value for promise (default: `undefined`)

returns
- `{ promise: Promise<any>, fetcher: (...args: Array<any>) => void }`

---

- [Contribution guidelines for this project](contributing.md)
