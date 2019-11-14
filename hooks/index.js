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
    client.call({ method: 'reload', args: { url: window.location.href } })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', callback)

    return () => window.removeEventListener('beforeunload', callback)
  }, [])
}

export const usePopStateListener = () => {
  const callback = () => {
    client.call({ method: 'urlUpdate', args: { url: window.location.href } })
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

          client.call({ method: 'urlUpdate', args: { url: window.location.href } })
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

      client.call({
        method: 'resize',
        args: { dimensions },
        callback: (result, err) => {
          console.log(result)
          console.log(err)
          setHaveEnough(true)
        }
      })
    }

    const resizeListener = e => {
      setHaveEnough(false)
    }

    addEventListener('resize', resizeListener)

    return () => removeEventListener('resize', resizeListener)
  })
}

export const useJRPMethod = (details) => {
  const { method, args, callback, timeout = 5000 } = details

  useEffect(() => {
    client.call({ method, args, callback, timeout })
  }, [method, args, callback, timeout])
}

let context

client.call({ method: 'context' })
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
