## 变量规范

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
