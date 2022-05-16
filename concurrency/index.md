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

### 能用 Async/Await 就不要用 Promise

Promise 对于回调函数来说已经是一个更清晰的替代品了， `async/await` 甚至是一个更清晰的替代品，我们愿意称之为异步的终极解决方案（像写同步代码一样写异步代码）。

你仅仅只需要在函数定义的时候在开头加一个 `async` 修饰符，就能在函数体那使用 `await` 来标记后面的代码是异步代码，仅仅当它结束的时候才会继续后面的执行，否则函数将会被挂起。

:-1: Bad:

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

:+1: Good:

```js
import { get } from 'request-promise'
import { writeFile } from 'fs-extra'

async function getCleanCodeArticle() {
  try {
    const body = await get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
    await writeFile('article.html', body)
    console.log('File written')
  } catch (err) {
    console.error(err)
  }
}

getCleanCodeArticle()
```
