# JavaScript 整洁代码规范

## 变量

### 使用通俗易懂的变量命名

:-1: Bad:

```js
const yyyymmdstr = moment().format('YYYY/MM/DD')
```

:+1: Good:

```js
const currentDate = moment().format('YYYY/MM/DD')
```

### 相同类型的变量使用同一个单词

:-1: Bad:

```js
getUserInfo()
getClientData()
getCustomerRecord()
```

:+1: Good:

```js
getUser()
```

### 使用能被搜索到的命名

通常情况下，我们花在读代码的时间比写代码的时间要更多。对于一个团队来说，整洁、高可读性的代码是肥肠重要的。
直接使用一些常量值或许对最终程序执行来说更加高效（一点点），但我们会伤害那些看我们代码的人。
请让你的代码变得“可被搜素”，一些类似 `buddy.js` 或者 `ESLint` 的工具能够帮助我们识别出未命名的常量。

:-1: Bad:

```js
setTimeout(blastOff, 86400000)
```

:+1: Good:

```js
const MILLSECONDSS_PER_DAY = 60 * 60 * 24 * 1000 // 86400000
setTimeout(blastOff, MILLSECONDSS_PER_DAY)
```

### 使用清晰明了的变量

:-1: Bad:

```js
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
)
```

:+1: Good:

```js
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
const [_, city, zipCode] = address.match(cityZipCodeRegex) || []
saveCityZipCode(city, zipCode)
```

### 尽量避免约定俗成

清晰明确总比约定俗成要好。

:-1: Bad:

```js
const locations = ['Austin', 'New York', 'San Francisco']
locations.forEach((l) => {
  doStuff()
  doSomeOtherStuff()
  // ...
  // ...
  // ...
  // 等等，`l` 是什么来着？
  dispatch(l)
})
```

:+1: Good:

```js
const locations = ['Austin', 'New York', 'San Francisco']
locations.forEach((location) => {
  doStuff()
  doSomeOtherStuff()
  // ...
  // ...
  // ...
  dispatch(location)
})
```

### 如无必要，勿增实体（不要添加不必要的信息）

如果你的类名或者对象名已经告诉了你上下文信息，你就不需要在你的变量名中再重复了。

:-1: Bad:

```js
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue',
}

function paintCar(car, color) {
  car.carColor = color
}
```

:+1: Good:

```js
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue',
}

function paintCar(car, color) {
  car.color = color
}
```

### 在函数中使用参数默认值来替代双竖线运算符

首先，参数默认值要比双竖线运算符来得更加整洁。
:warning: 但要注意的是，参数默认值只有在 `undefined` 的时候才会生效，而 `||` 运算符在值为 `falsy` 的时候都会生效。

:-1: Bad:

```js
function doSomething(name) {
  const name = name || 'Yuetong Yu'
  // ...
}
```

:+1: Good:

```js
function doSomething(name = 'Yuetong Yu') {
  // ...
}
```

## 函数

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
