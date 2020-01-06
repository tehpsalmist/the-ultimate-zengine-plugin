import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { autoSize, znPluginData, znHttp, znConfirm, znOpenDropdown, rpcClient } from '@zenginehq/zengine-sdk'
import { useSubscription } from './hooks'

export const FormStuff = props => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    autoSize()
  }, [])

  useSubscription('close', e => console.log('e', e))

  return <div
    style={{ backgroundColor: 'lightblue' }}
  >
    <button onClick={e => {
      setShow(!show)
      znHttp({
        method: 'get',
        url: '/forms/1/records'
      })
        .then(resp => {
          console.log(resp)
        })
        .catch(err => console.error(err))
    }}>
      {show ? 'Hide' : 'Show'}
    </button>
    {show && <div style={{ height: '100px' }}>yeah buddy</div>}
    <button onClick={e => {
      const { top, right, left, bottom } = e.target.getBoundingClientRect()

      znOpenDropdown({
        top,
        right,
        left,
        bottom,
        side: 'top',
        src: '/dropdown.html'
      })
        .then(item => console.log(item))
    }}>Choose Person</button>
  </div>
}

render(<FormStuff />, document.getElementById('app'))
