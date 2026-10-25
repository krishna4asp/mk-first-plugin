import type { Register } from 'claude-code'

let toolCount = 0

export const register: Register = on => {
  on('session.start', ($, _e, next) => {
    $.ui.status('ready')
    return next(_e)
  })

  on('tool.call', async ($, e, next) => {
    const n = ++toolCount
    $.ui.status(`${e.tool}… (${n})`)
    const result = await next(e)
    $.ui.status(`${e.tool} done · ${n} call${n === 1 ? '' : 's'}`)
    return result
  }).catch(($, e, next) =>
    next.called ? next(e) : { deny: `${$.plugin.name}: hook failed for ${e.tool}` },
  )
}
