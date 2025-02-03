# useFetch for React 19+

> You can read this readme in [English](./readme.md).

## Motivation / Features
Этот хук не возвращает результат запроса, состояние загрузки или ошибку.

Он возвращает промис, который можно обработать в стиле react 19+ с помощью хука `use` / `Suspense` и `ErrorBoundary`.

- [x] Использование хука `use` из react 19+ для ожидания данных
- [x] Использование компонента `Suspense` для ожидания данных
- [x] Использование компонента `ErrorBoundary` для отлова ошибок
- [x] Автоматическая отмена запроса при размонтировании компонента (актуально для StrictMode)

## Installation

```shell
$ npm install react-fetcher-hook
```

## Usage

```tsx
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useFetch from 'react-fetcher-hook';

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

### Abortable Requests (for StrictMode)
```tsx
const service = (signal: AbortSignal) => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url, { signal }).then(res => res.json());
}
```

### Request with Arguments

Вы можете передать любое количество аргументов в функцию `service`.
Если у функции `service` последний аргумент имеет тип `AbortSignal`, то запрос будет отменяемым.

```tsx
const service = (entity: string, id: number, signal: AbortSignal) => {
  const url = `https://jsonplaceholder.typicode.com/${entity}/${id}`;
  return fetch(url, { signal }).then(res => res.json());
}
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
