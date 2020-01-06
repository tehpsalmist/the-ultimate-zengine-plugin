import { rpcClient, znContext } from '@zenginehq/zengine-sdk'
import { useEffect, useLayoutEffect, useState } from 'react'

const bodyList = document.querySelector('body')

let oldHref

export const useSubscription = (event, callback) => {
  useEffect(() => {
    rpcClient.subscribe(event, callback)

    return () => rpcClient.unsubscribe(event)
  }, [event, callback])
}

let context

znContext()
  .then(result => {
    console.log(result)
    context = result
  })
  .catch(err => {
    console.error(err)
  })

export const useAppContext = () => {
  return context
}

export const useLocationTest = () => {
  useJRPMethod({ method: 'location', args: { method: 'protocol', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'host', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'port', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'hash', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'href', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'pathname', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'searchParams', args: null }, callback: console.log })
  useJRPMethod({ method: 'location', args: { method: 'pathParams', args: null }, callback: console.log })
}

export const useLocationSetterTest = () => {
  useJRPMethod({ method: 'location', args: { method: 'navigate', args: ['/workspaces/1/data/2'] }, callback: console.log })
}
