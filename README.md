# css-to-mp.macro

Yet another css to mp macro, it's stay very simple, next version will be enhanced.

## Usage

```
import css from 'css-to-mp.macro'

const styles = css`
  .container {
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100rpx;
  }
  .text {
    font-size: 12;
    font-weight: bold;
    color: #fefefe;
    padding-left: 20px;
  }
`
```

> Warn: varible should be transform to value, maybe incorrect dynamic changed by props/state.
