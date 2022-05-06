## Classes

### 使用 ES6 的类来替代 ES5 的函数

在 ES5 中很难通过函数实现可读性高、维护性高的继承、构造函数和私有成员等面向对象的编程思想。如果你需要去实现继承之类的行为，请考虑使用 ES6 的语法。

但也请记住，在我们这整个规范当中，我们更倾向于使用各种小的、纯粹的函数来实现我们的需求，除非我们真的需要一个超大的复杂的对象。

:-1: Bad:

```js
const Animal = function (age) {
  if (!(this instanceof Animal)) {
    throw new Error('Instantiate Animal with `new`')
  }

  this.age = age
}

Animal.prototype.move = function move() {}

const Mammal = function (age, furColor) {
  if (!(this instanceof Mammal)) {
    throw new Error('Instantiate Mammal with `new`')
  }

  Animal.call(this, age)
  this.furColor = furColor
}

Mammal.prototype = Object.create(Animal.prototype)
Mammal.prototype.constructor = Mammal
Mammal.prototype.liveBirth = function liveBirth() {}

const Human = function (age, furColor, languageSpoken) {
  if (!(this instanceof Human)) {
    throw new Error('Instantiate Human with `new`')
  }

  Mammal.call(this, age, furColor)
  this.languageSpoken = languageSpoken
}

Human.prototype = Object.create(Mammal.prototype)
Human.prototype.constructor = Human
Human.prototype.speak = function speak() {}
```

:+1: Good:

```js
class Animal {
  constructor(age) {
    this.age = age
  }

  move() {
    /* ... */
  }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age)
    this.furColor = furColor
  }

  liveBirth() {
    /* ... */
  }
}

class Human extends Mammal {
  constructor(age, furColor, languageSpoken) {
    super(age, furColor)
    this.languageSpoken = languageSpoken
  }

  speak() {
    /* ... */
  }
}
```

### 使用链式调用

这种调用的方式你会发现在 JS 中是一种很有特点的行为，如果你足够注意一些，你能在 jQuery 和 Loadash 等优秀的库中发现大量的链式调用的使用。这会让你的代码看起来更简洁，更专注于你要实现的方法。

如果你不知道怎么开始，就在你的每个类的方法中都返回 `this` 吧。

:-1: Bad:

```js
class Car {
  constructor(make, model, color) {
    this.make = make
    this.model = model
    this.color = color
  }

  setMake(make) {
    this.make = make
  }

  setModel(model) {
    this.model = model
  }

  setColor(color) {
    this.color = color
  }

  save() {
    console.log(this.make, this.model, this.color)
  }
}

const car = new Car('Ford', 'F-150', 'red')
car.setColor('pink')
car.save()
```

:+1: Good:

```js
class Car {
  constructor(make, model, color) {
    this.make = make
    this.model = model
    this.color = color
  }

  setMake(make) {
    this.make = make
    // ⚠️注意：返回一个 this 来实现链式调用
    return this
  }

  setModel(model) {
    this.model = model
    // ⚠️注意：返回一个 this 来实现链式调用
    return this
  }

  setColor(color) {
    this.color = color
    // ⚠️注意：返回一个 this 来实现链式调用
    return this
  }

  save() {
    console.log(this.make, this.model, this.color)
    // ⚠️注意：返回一个 this 来实现链式调用
    return this
  }
}

const car = new Car('Ford', 'F-150', 'red').setColor('pink').save()
```

### 组合优于继承

这是一条经典的四大设计模式之一，我们应该更多的考虑使用组合来实现我们的需求而不是继承。使用继承有很多优点，使用组合也同时有很多优点。最重要的是，每当我们下意识地使用继承来实现某个需求的时候，换个角度想一想，能不能用组合来实现这个需求。在大多数情况下，组合都会是更好的实现方式。

你可能又要问了，“那我什么时候用继承呢？”。这个问题的答案取决于你的具体情况，但我能列举几个情况，在这些情况下，你使用继承可能会是一个更好的选择：

1. 你的继承是用来表达“是什么”的关系，而不是用来表达“有什么”的关系。例如：人类之于动物 和 用户详情之于用户。
2. 你能够直接复用父类的方法。
3. 你需要通过更改基类的方法变更所有的子类实例对象的行为。

:-1: Bad:

```js
class Employee {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  // ...
}

// 坏的实践，因为员工“有”税收数据，员工税收数据并不是员工的一种。
class EmployeeTaxData extends Employee {
  constructor(ssn, salary) {
    super()
    this.ssn = ssn
    this.salary = salary
  }

  // ...
}
```

:+1: Good:

```js
class EmployeeTaxData {
  constructor(ssn, salary) {
    this.ssn = ssn
    this.salary = salary
  }

  // ...
}

class Employee {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  setTaxData(ssn, salary) {
    this.taxData = new EmployeeTaxData(ssn, salary)
  }
  // ...
}
```
