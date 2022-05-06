## 对象和数据结构

### 多使用 getter 和 setter

通常来说，使用 getter 去访问一个对象的属性要比直接用访问运算符要好一些。你可能会问为什么，这里是我给出的一些回答：

- 当你想要拓展访问某个对象属性的行为的时候，不再需要去整个代码库里找到每一个访问对象的地方（通常这个过程是比较痛苦的，而且也容易遗漏）。
- 在进行 `set` 操作的时候，更容易地添加一些校验行为。
- 封装对象内部行为。
- 在访问对象属性和设置对象属性的时候非常方便的添加 log。
- 当我们对象上的属性是来自服务端的时候，可以给我们的对象属性实现懒加载访问。

:-1: Bad:

```js
function makeBankAccount() {
  // ...

  return {
    balance: 0,
    // ...
  }
}

const account = makeBankAccount()
account.balance = 100
```

:+1: Good:

```js
function makeBankAccount() {
  // 内部私有 balance
  let balance = 0

  // 我们所说的 `getter`，对外暴露出去
  function getBalance() {
    return balance
  }

  // 我们所说的 `setter`，对外暴露出去
  function setBalance(amount) {
    // 我们可以在这里做一些数据的校验
    balance = amount
  }

  return {
    // ...
    getBalance,
    setBalance,
  }
}

const account = makeBankAccount()
account.setBalance(100)
```

### 让对象有私有属性

我们也可以通过闭包来完成这件事情（在 ES5 及以下）

:-1: Bad:

```js
const Employee = function (name) {
  this.name = name
}

Employee.prototype.getName = function getName() {
  return this.name
}

const employee = new Employee('John Doe')
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
delete employee.name
console.log(`Employee name: ${employee.getName()}`) // Employee name: undefined
```

:+1: Good:

```js
function makeEmployee(name) {
  return {
    getName() {
      return name
    },
  }
}

const employee = makeEmployee('John Doe')
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
delete employee.name
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
```
