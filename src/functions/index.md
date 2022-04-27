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

请尽量避免重复的代码，因为重复的代码意味着当你需要更改一点逻辑的时候，需要去改动多个地方，这很痛苦。

举个例子想象一下：如果你是一家餐厅的老板，你需要管理各种物料的库存：土豆、番茄、洋葱等等... 如果这个时候你有多个列表来保存这些库存信息，那么每次更新库存的时候，你都要去改多个表格，这真的肥肠痛苦。但如果你只有一个列表的话，那么变更起来，就放心多了。

通常来说，你将同样逻辑的代码写多次，是因为在多个地方这些实现会有一点点的不一样，并不是完全的一样的。在这种情况下，你会把相似的代码写多次。那如果在这种情况下你想去移除相同的代码的时候，你就要抽象出一个更高层次的方法/类/模块来根据不同的情况做不同的事情了。

使用正确的抽象方法是至关重要的，这就是为什么你需要去遵循 SOILD 原则在[类](/classes/)这个板块。错误的抽象方法比重复的代码更糟糕，所以你一定要小心！所以必须要说的是，如果你掌握了正确的抽象方法，请遵循。不要重复你自己，否则你就会想上面的老板一样，不停的去寻找多个地方进行修改。

:-1: Bad:

```js
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary()
    const experience = developer.getExperience()
    const githubLink = developer.getGithubLink()
    const data = {
      expectedSalary,
      experience,
      githubLink,
    }

    render(data)
  })
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary()
    const experience = manager.getExperience()
    const portfolio = manager.getMBAProjects()
    const data = {
      expectedSalary,
      experience,
      portfolio,
    }

    render(data)
  })
}
```

:+1: Good:

```js
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary()
    const experience = employee.getExperience()

    const data = {
      expectedSalary,
      experience,
    }

    switch (employee.type) {
      case 'manager':
        data.portfolio = employee.getMBAProjects()
        break
      case 'developer':
        data.githubLink = employee.getGithubLink()
        break
    }

    render(data)
  })
}
```

### 用 Object.assign 来给对象属性设置默认值

:-1: Bad:

```js
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true,
}

function createMenu(config) {
  config.title = config.title || 'Foo'
  config.body = config.body || 'Bar'
  config.buttonText = config.buttonText || 'Baz'
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true
}

createMenu(menuConfig)
```

:+1: Good:

```js
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true,
}

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true,
    },
    config
  )
  return finalConfig
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig)
```

### 不要把 boolean 判断作为函数的参数

当你把 boolean 作为函数的参数的时候，你就告诉了调用你这个函数的用户，你这个函数做的事情超过了一件事。

因此，如果这个条件指向的两条不太一样的实现路径，那么请把它们拆成两个函数。

:-1: Bad:

```js
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`)
  } else {
    fs.create(name)
  }
}
```

:+1: Good:

```js
function createFile(name) {
  fs.create(name)
}

function createTempFile(name) {
  createFile(`./temp/${name}`)
}
```

### 避免副作用（一）

函数的副作用是值，除了接受一些值返回一些值之外，还做了其他的事情。这些其他的事情可以是：修改了一个文件、修改一些全局变量又或者说把你账上的钱打给了一个陌生人。

现在，假如说你需要有一个副作用函数来做一些事情。像我们上面举的例子，你可能需要修改一个文件。你需要做的就是，把这些副作用尽量收敛在一个函数里做这件事情（比如修改文件）。不要拆分成几个函数或类来做同一件副作用的事情（比如修改同一个文件）。保持一个服务做一件事，有且只有一个。

核心思想就是：尽量避免一些常见的陷阱。例如：无序地在对象之间共享一些状态、使用一些能被任何东西修改的可变数据类型、对副作用的操作并不集中。如果你能兼顾到这些，你会很开心地发现，你比绝大多数程序员都要优秀。

:-1: Bad:

```js
// 下面这个函数直接修改了全部变量的引用。
// 如果我们后面还有用到这个 name 的方法，会发现 name 不再是 string 了，这可能导致一些问题。
let name = 'Ryan McDermott'

function splitIntoFirstAndLastName() {
  name = name.split(' ')
}

splitIntoFirstAndLastName()

console.log(name) // ['Ryan', 'McDermott'];
```

:+1: Good:

```js
function splitIntoFirstAndLastName(name) {
  return name.split(' ')
}

const name = 'Ryan McDermott'
const newName = splitIntoFirstAndLastName(name)

console.log(name) // 'Ryan McDermott';
console.log(newName) // ['Ryan', 'McDermott'];
```

### 避免副作用（二）

在 JavaScript 中，有一些值是不可被改变的(immutable)而有一些值是可变的数据(mutable)。 例如对象喝数组就是两种可变的数据类型，当我们把它们当作参数传递给函数的时候，要特别的小心。因为 JavaScript 中的函数很容易一不小心就修改了对象中属性的值或者数组中的元素，这就很容器引起 BUG。

假如说我们有一个方法，接受一个用来代表购物车列表的数组。如果我们这个函数直接去变更了这个数组的内容，比方说往购物车中增加一个商品。如果此时有另一个函数用到了这个购物车的数组，那么这个函数中处理的数组也会随之改变。这种现象有可能是好事（更加省心），也有可能是坏事，我们来看一个坏的情况：

用户点击了“买单”这个选项，我们的网页此时应该发起一次网络请求，将购物车的数组发给服务端进行处理。但此时又因为网络问题，我们的请求失败了，不得不重新发起请求。又进一步说，这发起重新请求之前，用户又点击了“增加到购物车”这个按钮。那么这个时候我们的网页就会把最新的购物车列表发给服务端进行结账！但事实上用户并不想对后加入的这个商品进行买单，因为他是在点击买单之后再加入的商品。

一个好的实践是：我们写的 `addItemToCart` 方法接受一个购物车的数组，然后返回一个新增了商品后的新数组。这就能保证我们的方法返回的是一个新的数组，那么依旧使用旧数组的“买单”方法就不会收到这个 `addItemtoCart` 的影响。

两条额外要说的东西：

1. 也许在你的工作中，你真的遇到了需要修改原引用对象的需求。那么那是可以的，只要你保证尽量避免一些额外的副作用即可。但你也要知道，跳出我们这个规范的实践中，这种场景真的十分罕见。绝大多数的函数都可以避免产生副作用（保持纯函数）。

2. 克隆一个很大的对象是一件很浪费性能的事情。但好在，在我们的实践当中，我们可以借用很多很棒的三方库来完成这件事情（例如 [immutable-js](https://facebook.github.io/immutable-js/)）。这些库能让我们很自然地操作对象和数组，并产生全新的引用对象，而且还不会像手动克隆对象数字一样造成内存紧张的问题。

:-1: Bad:

```js
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() })
}
```

:+1: Good:

```js
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }]
}
```
