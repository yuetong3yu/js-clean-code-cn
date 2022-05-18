## Formatting 编码风格

风格这个事情因人而异。就像在本文中的绝大多数规范一样，没有哪一条规范是你必须要遵守的。写下这一条规范的目的是：_不要在风格方面上争吵_。

社区中有一大堆自动格式化的插件和库，选一个就好了，不要浪费你的时间和精力在这些事情上纠结。

下面会列出一些在自动化插件中不会帮你做到的，你可以选择性的阅读这些建议，并将它们纳入你的规范当中。

### 常量使用大写

JavaScript 是一个动态类型的语言，所以在变量的命名方面我们可以得到很多的信息。这些规则是十分可观的，你可以根据你们团队的喜好来选择一个，但最重要的是，当我们选择了某一个规范之后，就不要轻易变更了（除非你有精力将所有代码重构了）。

:-1: Bad:

```js
const DAYS_IN_WEEK = 7
const daysInMonth = 30

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude']
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles']

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Alpaca {}
```

:+1: Good:

```js
const DAYS_IN_WEEK = 7
const DAYS_IN_MONTH = 30

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude']
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles']

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Alpaca {}
```

### 函数调用者和被调用的应该放在一起

我们审查代码的时候，绝大多数人倾向于从上往下的顺序进行浏览（像看报纸一样）。所以理想的情况下，我们在一个函数中调用另一个函数的时候，这个被调用的函数应在就定义在调用者的旁边，这样我们可以很容易地找到它。

:-1: Bad:

```js
class PerformanceReview {
  constructor(employee) {
    this.employee = employee
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers')
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager')
  }

  getPeerReviews() {
    const peers = this.lookupPeers()
    // ...
  }

  perfReview() {
    this.getPeerReviews()
    this.getManagerReview()
    this.getSelfReview()
  }

  getManagerReview() {
    const manager = this.lookupManager()
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee)
review.perfReview()
```

:+1: Good:

```js
class PerformanceReview {
  constructor(employee) {
    this.employee = employee
  }

  perfReview() {
    this.getPeerReviews()
    this.getManagerReview()
    this.getSelfReview()
  }

  getPeerReviews() {
    const peers = this.lookupPeers()
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers')
  }

  getManagerReview() {
    const manager = this.lookupManager()
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager')
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee)
review.perfReview()
```
