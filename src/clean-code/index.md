# JavaScript 整洁代码规范

## 变量

### 使用通俗易懂的变量命名

:-1: Bad:

```js
const yyyymmdstr = moment().format('YYYY/MM/DD')
```

:+1:

```js
const currentDate = moment().format('YYYY/MM/DD')
```
