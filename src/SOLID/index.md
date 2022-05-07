## SOLID 原则

### 单一职责原则(Single Responsibility Principle)

“一个类应该只有一个更改的理由”，如果我们试图在一个大类里面塞进去很多很多的函数的时候，就像是一整台飞机只搭一个行李一样。问题就在于，此时你的类就不再是概念上的统一了，你将会遇到各种各样的理由去更改这个类里面的方法。减少更改一个类中的函数的次数是肥肠重要的，因为每当你试图去更改一个类中的方法的时候，你很可能不知道这个类将会如何影响这个类的其他函数，特别是如果你创建了一个超大的类。

:-1: Bad:

```js
class UserSettings {
  constructor(user) {
    this.user = user
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

:+1: Good:

```js
class UserAuth {
  constructor(user) {
    this.user = user
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user
    this.auth = new UserAuth(user)
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

### 开闭原则(Open/Closed Principle)

“软件实体应当对拓展开放，对修改封闭”，这是什么意思呢？这个原则的主旨在于，你应该允许用户来继承/拓展你的代码，并且拒绝他们修改你的代码。

:-1: Bad:

```js
class AjaxAdapter extends Adapter {
  constructor() {
    super()
    this.name = 'ajaxAdapter'
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super()
    this.name = 'nodeAdapter'
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter
  }

  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then((response) => {
        // transform response and return
      })
    } else if (this.adapter.name === 'nodeAdapter') {
      return makeHttpCall(url).then((response) => {
        // transform response and return
      })
    }
  }
}

function makeAjaxCall(url) {
  // request and return promise
}

function makeHttpCall(url) {
  // request and return promise
}
```

:+1: Good:

```js
class AjaxAdapter extends Adapter {
  constructor() {
    super()
    this.name = 'ajaxAdapter'
  }

  request(url) {
    // request and return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super()
    this.name = 'nodeAdapter'
  }

  request(url) {
    // request and return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter
  }

  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // transform response and return
    })
  }
}
```

### 里氏替换原则(Liskov Substitution Principle)

这是一个听起来吓人但其实很简单的原则，它的正式定义是：“如果 S 是 T 的子类型，那么 T 的类型对象可以被 S 的类型对象所替换，则不需要更改任何对象上的属性。”，这个定义看起来更吓人了。

比较通俗的解释是：如果你有一个子类和一个父类，那么你应该做到这两个类的实例对象可以丝滑切换而不引起程序的错误。这个概念初次看起来会比较令人感到困惑，我们来看一个 正方形-矩形 的例子。从数学上的概念来说，正方形一定是一个矩形，但如果你的程序设计采用了“是什么“的设计，那么你会发现你很快会遇到麻烦。

:-1: Bad:

```js
class Rectangle {
  constructor() {
    this.width = 0
    this.height = 0
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width
  }

  setHeight(height) {
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width
    this.height = width
  }

  setHeight(height) {
    this.width = height
    this.height = height
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4)
    rectangle.setHeight(5)
    const area = rectangle.getArea() // BAD: Returns 25 for Square. Should be 20. 问题所在：正方形应该得到的面积是 20，而我们得到了一个 25
    rectangle.render(area)
  })
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()]
renderLargeRectangles(rectangles)
```

:+1: Good:

```js
class Shape {
  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Square extends Shape {
  constructor(length) {
    super()
    this.length = length
  }

  getArea() {
    return this.length * this.length
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea()
    shape.render(area)
  })
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)]
renderLargeShapes(shapes)
```

### 接口隔离原则（Interface Segregation Principle)

JavaScript 中没有接口的概念，因此这个原则也不像其他四个原则一样被重视，但它其实也相当重要。

“用户不应该强制依赖到他们用不到的接口”，因为 JS 的动态类型，接口在 JS 中是被隐式实现的。

在 JS 中一个好的例子是当我们用到一个需要负责设置的类的时候。对客户来说，不需要大量配置/初始化是一件好事情，因为他们很有可能用不到大量的配置中的选项。尽量让我们的选项变成可选的，来避免臃肿的配置。

:-1: Bad:

```js
class DOMTraverser {
  constructor(settings) {
    this.settings = settings
    this.setup()
  }

  setup() {
    this.rootNode = this.settings.rootNode
    this.settings.animationModule.setup()
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  animationModule() {}, // 绝大多数情况下，我们在遍历的时候都不需要做改变
  // ...
})
```

:+1: Good:

```js
class DOMTraverser {
  constructor(settings) {
    this.settings = settings
    this.options = settings.options
    this.setup()
  }

  setup() {
    this.rootNode = this.settings.rootNode
    this.setupOptions()
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  options: {
    animationModule() {},
  },
})
```

### 依赖倒置原则（Dependency Inversion Principle）

这条原则表明两件事：

1. 更高维度的模块不应该依赖低纬度的模块，但不管高低与否，都应该依赖抽象。
2. 抽象不应该依赖具体，具体应该依赖抽象。

这个一开始可能很难理解，但如果你曾经使用过 Angular，你会对此感觉到很熟悉，因为“依赖注入”就是这个原则的实践。尽管它们不是完全相同的概念，但 DIP 原则要保证高维护的模块了解低维度的模块的每一个细节，并且实现它们。我们可以使用 DI（依赖注入）来完成这个细节。

实践这条原则的好处是可以减少两个模块之间的耦合程度，耦合对开发体验来说是非常差的时间，因为它会让你的代码变得很难重构。

就像我们之前说过的，JS 中没有接口这种东西，所以这些都是隐晦的概念。
