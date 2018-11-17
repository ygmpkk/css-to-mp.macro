const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
  },
  tests: {
    '转换CSS样式，一般模式': `
import css from '../macro'
const styles = css\`
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
\`
    `,
    '转换CSS样式，带变量': `
import css from '../macro'

const height = 100;

const styles = css\`
  .container {
    flex: 1;
    justify-content: center;
    align-items: center;
    height: \${height};
  }
  .text {
    font-size: 12;
    font-weight: bold;
    color: #fefefe;
    padding-left: \${20 + height}px;
  }
\`
    `,

  },
})
