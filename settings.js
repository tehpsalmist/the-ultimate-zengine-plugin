import React, { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import { uploadFile, getWorkspaces, getForms } from './post-rpc'
import '@babel/polyfill'
import { useLocationSetterTest } from './hooks'

const App = props => {
  const mainRef = useRef()
  const innerRef = useRef()
  const innerInnerRef = useRef()

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    getWorkspaces()
      .then(ws => console.log(ws))
      .then(() => getForms())
      .then(f => console.log(f))
      .catch(console.error)
  }, [])

  const measureStuff = (mRef, iRef, iiRef) => {
    const mainBox = mRef.current.getBoundingClientRect()
    console.log('mainBox', mainBox)

    const innerBox = iRef.current.getBoundingClientRect()
    console.log('innerBox', innerBox)

    const innerinnerBox = iiRef.current.getBoundingClientRect()
    console.log('innerinnerBox', innerinnerBox)
    setLeft(innerinnerBox.left)
    setTop(innerinnerBox.top)
  }

  return <main ref={mainRef} style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'lightblue'
  }}>
    <p style={{ position: 'fixed', top: top, left: left }}>Hey! Imagine there is settings stuff here!</p>
    <div style={{ position: 'fixed', top: 200, left: 200, width: '300px', height: '400px' }} ref={innerRef}>
      <h3 ref={innerInnerRef}>Pretty neat, huh?</h3>
    </div>
    <input type='file' onChange={e => uploadFile(1, 4, e.target.files[0]).catch(console.error)} />
    <button onClick={e => measureStuff(mainRef, innerRef, innerInnerRef)}>Measure Stuff</button>
  </main>
}

render(<App />, document.getElementById('app'))
