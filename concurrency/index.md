## Concurrency 异步并发规范

### 使用 Promise，不要用回调函数。

回调并不优雅，会导致一大堆的嵌套代码，这些代码并不清晰，对阅读也很有友好。ES6 中的 Promise 是一个全局的内置函数，使用它们来解决这个问题。

:-1: Bad:

```js
import { get } from 'request'
import { writeFile } from 'fs'

get(
  'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
  (requestErr, response, body) => {
    if (requestErr) {
      console.error(requestErr)
    } else {
      writeFile('article.html', body, (writeErr) => {
        if (writeErr) {
          console.error(writeErr)
        } else {
          console.log('File written')
        }
      })
    }
  }
)
```

:+1: Good:

```js
import { get } from 'request-promise'
import { writeFile } from 'fs-extra'

get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((body) => {
    return writeFile('article.html', body)
  })
  .then(() => {
    console.log('File written')
  })
  .catch((err) => {
    console.error(err)
  })
```
