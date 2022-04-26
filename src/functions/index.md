## 函数规范

### 函数参数（2 个及以下最佳）

限制函数入参的个数对单元测试来说是至关重要的，当我们有超过 3 个参数以上的函数需要进行测试时，你将需要写指数级的测试用例来覆盖不同的参数情况。

一个或者两个入参是理想的，三个入参的情况在可能的情况下尽量避免。如果比三个更多的话，就需要重构整合了。通常来说，如果你写的这个函数有着超过三个入参的情况，那么说明你这个函数所做的事情太多了。如果不是，那可以考虑用更高级的对象来容纳这些参数。

既然 JavaScript 允许我们肥肠简单地创建出一个对象来容纳无限多的东西，那么我们可以利用这个特性来尽量简化我们的入参个数（当你需要用到很多入参的时候）。

为了使得函数需要的入参对象属性清晰明了，我们可以使用 ES6 的解构语法，这样有几个好处：

1. 阅读函数定义的时候，一眼就能看出这个函数使用了什么入参，清晰明了。
2. 在调用这个函数的时候，能够以命名参数的形式调用，加上 TypeScript 肥肠友好，可以直接在调用的时候知道在给什么参数传递什么类型。
3. 解构语法对于 JS 中的原始类型，还会自动克隆复制出一个新的原始类型，在一定程度上避免了函数带来的副作用。
4. Linter 工具或者编辑器能够很好的提示你哪些参数在函数体内未被使用。

:-1: Bad:

```js
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

:+1: Good:

```js
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
})
```

### 一个函数只做一件事情

这几乎是你看到目前为止在软件工程中最重要的一条规范了。当一个函数做的事情超过一样的时候，他们会变得更难组合、测试等等。但如果你把保持一个函数只做一件事情的原则，那么这些函数就会变得更容易重构、更容易组合在一起去完成一个新的需求，并且你的代码也会变得更加整洁。

就算在这整个《JS 整洁代码规范》中，你只践行了这一条原则，那么你也已经领先了其他开发者很多了。

:-1: Bad:

```js
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}
```

:+1: Good:

```js
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}
```

### 函数命名应该直白告诉它干了什么

:-1: Bad:

```js
function addToDate(date, month) {
  // ...
}

const date = new Date()

// 光从函数名称里很难看出来，这个日期到底是 add 了个什么？
addToDate(date, 1)
```

:+1: Good:

```js
function addMonthToDate(month, date) {
  // ...
}
const date = new Date()
addMonthToDate(1, date)
```

### 函数抽象应该保持一层

当你的函数超过一层的抽象行为的时候，通常来说，你这个函数做的事情就太多了。把它们拆开来，提高可用性，以便更好的进行测试。

:-1: Bad:

```js
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ]

  const statements = code.split(' ')
  const tokens = []
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    })
  })

  const ast = []
  tokens.forEach((token) => {
    // lex...
  })

  ast.forEach((node) => {
    // parse...
  })
}
```

:+1: Good:

```js
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code)
  const syntaxTree = parse(tokens)
  syntaxTree.forEach((node) => {
    // parse...
  })
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ]

  const statements = code.split(' ')
  const tokens = []
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */)
    })
  })

  return tokens
}

function parse(tokens) {
  const syntaxTree = []
  tokens.forEach((token) => {
    syntaxTree.push(/* ... */)
  })

  return syntaxTree
}
```

### 减少重复的代码
