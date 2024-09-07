// #1 code format
const target_1 = {
  msg: 'hooah'
}

const handler = {
  get (target_1, prop, receiver){
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
