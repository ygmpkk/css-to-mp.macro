const { createMacro, MacroError } = require('babel-plugin-macros')
const serialize = require('babel-literal-to-ast')
const parseCSS = require('css/lib/parse')

function cssToMPMacro({
  // import default from module
  references: { default: defaultRefs },
  state,
  babel: { types: t },
}) {

  defaultRefs.forEach(referencePath =>
    transform(referencePath.parentPath, state, t),
  )
}

function transform(path, state, types) {
  const source = path.get('quasi').evaluate().value

  path.replaceWith(serialize(serializeCSS(source)))
}

function serializeCSS(css) {
  const { stylesheet } = parseCSS(css)
  const result = {}

  for (const r in stylesheet.rules) {
    const rule = stylesheet.rules[r]

    for (const s in rule.selectors) {
      // 转换css选择器.selector 为 object key名称，不做任何的转换
      const selector = rule.selectors[s].replace(/^\./, "")
      const styles = (result[selector] = result[selector] || {})
      transformDeclaration(styles, rule.declarations, result)
    }
  }

  return result
}

function transformDeclaration(styles, declarations, result) {
  for (const d in declarations) {
    const declaration = declarations[d]
    // 只渲染declaration类型的数据
    if (declaration.type !== 'declaration') continue
    // property转换为camelCase
    const property = camelCase(declaration.property)
    // number类型的value转换为数字类型，其它的保持默认
    const value = declaration.value
    const isNumber = /\d+$/.test(value)

    Object.assign(styles, { [property]: isNumber ? parseFloat(value) : value })
  }
}

function camelCase(str) {
  // Lower cases the string
  return (
    str
    .toLowerCase()
    // Replaces any - or _ characters with a space
    .replace(/[-_]+/g, " ")
    // Removes any non alphanumeric characters
    .replace(/[^\w\s]/g, "")
    // Uppercases the first character in each group immediately following a space
    // (delimited by spaces)
    .replace(/ (.)/g, function($1) {
      return $1.toUpperCase()
    })
    // Removes spaces
    .replace(/ /g, "")
  )
}

module.exports = createMacro(cssToMPMacro)
