## Testing 测试规范

测试比交付更重要。

如果你没有充分的测试，那么每次你交付或者部署的时候你都会心惊胆战，因为你不知道自己是否打破了任何东西。 决定应用组成、何时交付或者交付数量的是你的团队，但有着 100%测试覆盖率（所有状态以及分支）是你作为一个开发者对自己交付产品的信心所在。这也就意味着说，我们不仅要有一个好的测试框架，也需要有一个好的测试覆盖率工具。

不写测试是不应该有理由的。社区里有很多很好的测试框架，去找一个你们团队更喜欢的吧。当你找到一个适合你们团队的测试框架之后，你要做的就是在每次编写新的模块和功能的时候，都保证覆盖上所有的测试！如果你喜欢使用类似 TDD 的编程方法，那更好，但中心思想在于：确保你每次发布的新功能/模块，都尽你所能的覆盖上测试代码，或者将已有的重构。

### 一个概念一个测试

:-1: Bad:

```js
import assert from 'assert'

describe('MomentJS', () => {
  it('handles date boundaries', () => {
    let date

    date = new MomentJS('1/1/2015')
    date.addDays(30)
    assert.equal('1/31/2015', date)

    date = new MomentJS('2/1/2016')
    date.addDays(28)
    assert.equal('02/29/2016', date)

    date = new MomentJS('2/1/2015')
    date.addDays(28)
    assert.equal('03/01/2015', date)
  })
})
```

:+1: Good:

```js
import assert from 'assert'

describe('MomentJS', () => {
  it('handles 30-day months', () => {
    const date = new MomentJS('1/1/2015')
    date.addDays(30)
    assert.equal('1/31/2015', date)
  })

  it('handles leap year', () => {
    const date = new MomentJS('2/1/2016')
    date.addDays(28)
    assert.equal('02/29/2016', date)
  })

  it('handles non-leap year', () => {
    const date = new MomentJS('2/1/2015')
    date.addDays(28)
    assert.equal('03/01/2015', date)
  })
})
```
