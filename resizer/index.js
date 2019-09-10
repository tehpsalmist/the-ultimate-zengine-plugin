import '@babel/polyfill'
import ZnSize from 'ifresize'
import { znResize } from '../post-rpc'

export const sizer = new ZnSize(async dimensions => {
  const result = await znResize(dimensions).catch(err => err instanceof Error ? err : new Error(JSON.stringify(err)))

  if (result instanceof Error) {
    return { width: null, height: null }
  }

  return result
}, { width: 'eastToWest' })
