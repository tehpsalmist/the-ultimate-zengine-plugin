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

export const useRequestMoreRoom = () => {
  const [haveEnough, setHaveEnough] = useState(false)

  useLayoutEffect(() => {
    const width = document.getElementById('app').scrollWidth
    const height = document.getElementById('app').scrollHeight

    console.log(window.innerWidth, window.outerWidth)

    if (!haveEnough && (width > window.innerWidth || height > window.innerHeight)) {
      const dimensions = { x: width, y: height }

      client.call('resize', { dimensions }, (result, err) => {
        console.log(result)
        console.log(err)
        setHaveEnough(true)
      })
    }

    const resizeListener = e => {
      setHaveEnough(false)
    }

    addEventListener('resize', resizeListener)

    return () => removeEventListener('resize', resizeListener)
  })
}

export const useJRPMethod = (method, params, callback, timeoutMs) => {
  useEffect(() => {
    client.call(method, { plugin: { apiVersion: '1.0.1' }, params }, callback, timeoutMs)
  }, [method, params, callback])
}

export const useAppContext = (callback) => {
  useJRPMethod('context', null, callback, 60000)
}

export const useZnHttp = (params, callback) => useJRPMethod('znHttp', params, callback)

export const useGetMe = callback => useZnHttp({ method: 'get', url: '/users/me' }, callback)
