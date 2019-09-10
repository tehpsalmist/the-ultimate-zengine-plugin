import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { sizer } from './resizer'

export const FormStuff = props => {
  useEffect(() => {
    sizer.autoSize()
  }, [])

  return <div
    style={{ backgroundColor: 'lightblue', height: '120px' }}
  >
    Stuff
  </div>
}

render(<FormStuff />, document.getElementById('app'))
