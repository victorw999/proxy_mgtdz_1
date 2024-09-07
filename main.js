// #1 code format
const target_1 = {
  msg: 'hooah'
}

const handler = {
  get(target_1, prop, receiver) {
    return 'world'
  }
}

const proxy_1 = new Proxy(target_1, handler)
console.log('proxy_1.msg', proxy_1.msg)

// #2 code format
const wrap = obj => {
  return new Proxy(obj, {
    get(target, propKey) {
      console.log(`Reading property "${propKey}"`)
      return target[propKey]
    }
  })
}
const target_2 = { msg: 'feel that lether' }
// const wrapped = wrap(target_2)
const proxy_2 = wrap(target_2)
console.log('proxy_2.msg', proxy_2.msg)


//#3
const logUpdate = require('log-update')
const asciichart = require('asciichart')
const chalk = require('chalk')
const Measured = require('measured')
const timer = new Measured.Timer()
const history = new Array(120)
history.fill(0)
const monitor = obj => {
  return new Proxy(obj, {
    get(target, propKey) {
      const origMethod = target[propKey]
      if (!origMethod) return
      return (...args) => {
        const stopwatch = timer.start()
        const result = origMethod.apply(this, args)
        return result.then(out => {
          const n = stopwatch.end()
          history.shift()
          history.push(n)
          return out
        })
      }
    }
  })
}
const service = {
  callService() {
    return new Promise(resolve =>
      setTimeout(resolve, Math.random() * 50 + 50))
  }
}
const monitoredService = monitor(service)
setInterval(() => {
  monitoredService.callService()
    .then(() => {
      const fields = ['min', 'max', 'sum', 'variance',
        'mean', 'count', 'median']
      const histogram = timer.toJSON().histogram
      const lines = [
        '',
        ...fields.map(field =>
          chalk.cyan(field) + ': ' +
          (histogram[field] || 0).toFixed(2))
      ]
      logUpdate(asciichart.plot(history, { height: 10 })
        + lines.join('\n'))
    })
    .catch(err => console.error(err))
}, 100)