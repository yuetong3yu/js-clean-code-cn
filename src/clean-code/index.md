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
