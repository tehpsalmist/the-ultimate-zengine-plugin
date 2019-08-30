import { client } from '../post-rpc'
import { useEffect, useLayoutEffect, useState } from 'react'

const bodyList = document.querySelector('body')

let oldHref

export const useSubscription = (event, callback) => {
  useEffect(() => {
    client.subscribe(event, callback)

    return () => client.unsubscribe(event)
  }, [event, callback])
}

export const useReloadListener = () => {
  const callback = () => {
    client.call('reload', { url: window.location.href })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', callback)

    return () => window.removeEventListener('beforeunload', callback)
  }, [])
}

export const usePopStateListener = () => {
  const callback = () => {
    client.call('urlUpdate', { url: window.location.href })
  }

  useEffect(() => {
    window.addEventListener('popstate', callback)

    return () => window.removeEventListener('popstate', callback)
  }, [])
}

export const useMutationObserver = () => {
  useEffect(() => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref !== window.location.href) {
          oldHref = window.location.href

          client.call('urlUpdate', { url: window.location.href })
        }
      })
    })

    var config = {
      childList: true,
      subtree: true
    }

    observer.observe(bodyList, config)

    return () => observer.disconnect()
  }, [])
}

export const useGetBoundingClientRect = () => {
  const [{ x, y }, setBoundingRect] = useState({})

  useLayoutEffect(() => {
    const width = document.getElementById('root').scrollWidth
    const height = document.getElementById('root').scrollHeight

    if (width !== x || height !== y) {
      const dimensions = { x: width, y: height }
      client.call('resize', { dimensions }, (result, err) => {
        console.log(result)
        console.log(err)
      })
      setBoundingRect(dimensions)
    }
  })
}

export const useJRPMethod = (method, params, callback) => {
  useEffect(() => {
    client.call(method, { plugin: { apiVersion: '1.0.1' }, params }, callback)
  }, [method, params, callback])
}

export const useZnHttp = (params, callback) => useJRPMethod('znHttp', params, callback)

export const useGetMe = callback => useZnHttp({ method: 'get', url: '/users/me' }, callback)
