## Comments 注释规范

### 只有涉及到业务逻辑的代码才需要注释

代码中的注释在某种意义上来说是一种道歉，并不是必须的。好的代码不需要注释。所以，只有当我们使用了一些奇特的方式或者不那么直观的实现逻辑的时候，才需要写上注释，也最好写上。

:-1: Bad:

```js
function hashIt(data) {
  // The hash
  let hash = 0

  // Length of string
  const length = data.length

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i)
    // Make the hash
    hash = (hash << 5) - hash + char
    // Convert to 32-bit integer
    hash &= hash
  }
}
```

:+1: Good:

```js
function hashIt(data) {
  let hash = 0
  const length = data.length

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char

    // Convert to 32-bit integer
    hash &= hash
  }
}
```

### 你的代码库中不要留下注释

版本控制出现是有原因的，不要在你的代码中留下老的代码。

:-1: Bad:

```js
doStuff()
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

:+1: Good:

```js
doStuff()
```

### 不要有历史注释

请记住：_版本控制出现是有原因的_！没有用的代码没有必要出现，特别是历史注释，完全没有意义。学会使用 `git log`，你就能看到某一行/某个文件的历史变更！

:-1: Bad:

```js
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
  return a + b
}
```

:+1: Good:

```js
function combine(a, b) {
  return a + b
}
```

### 使用很浮夸的注释

:-1: Bad:

```js
////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
$scope.model = {
  menu: 'foo',
  nav: 'bar',
}

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function () {
  // ...
}
```

:+1: Good:

```js
$scope.model = {
  menu: 'foo',
  nav: 'bar',
}

const actions = function () {
  // ...
}
```
