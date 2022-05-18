## Error Handling 错误处理规范

在程序中抛出错误说一个很好的习惯！哪怕它会中断你的程序运行导致 Node 进程退出或者浏览器白屏，但它能准确清晰地让你知道你的程序在哪儿出现了错误，并且能在控制台或 log 等地方看到明确的调用栈。

### 不要省略错误捕获

如果你捕获了一个错误但却没有干实事的话，那你很可能会在以后忽略这个 BUG 最终导致问题的出现。我们经常做的一件事就是把捕获到的错误直接干脆地打印(`console.log`)到控制台当中，这也会导致你的错误会被淹没在海量的控制台当中最终找不到原因。

既然当你写下 `try/catch` 这行代码的时候，你就知道你包起来的这段代码有可能会出现错误。那么就意味着你“应该”对可能出现的错误有应对的策略。所以，你应该有相应的处理代码而不是简单的打印出来。

:-1: Bad:

```js
try {
  functionThatMightThrow()
} catch (error) {
  console.log(error)
}
```

:+1: Good:

```js
try {
  functionThatMightThrow()
} catch (error) {
  // 你可以这样做，比用 console.log 会好一些
  console.error(error)
  // 另一种选择
  notifyUserOfError(error)
  // 再另一种选择
  reportErrorToService(error)
  // 或者全部都做
}
```

### 不要忽视 Promise 中的 Reject

跟 `try/catch` 同理。

:-1: Bad:

```js
getdata()
  .then((data) => {
    functionThatMightThrow(data)
  })
  .catch((error) => {
    console.log(error)
  })
```

:+1: Good:

```js
getdata()
  .then((data) => {
    functionThatMightThrow(data)
  })
  .catch((error) => {
    // 你可以这样做，比用 console.log 会好一些
    console.error(error)
    // 另一种选择
    notifyUserOfError(error)
    // 再另一种选择
    reportErrorToService(error)
    // 或者全部都做
  })
```
