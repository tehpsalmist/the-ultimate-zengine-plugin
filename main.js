import React from 'react'
import ReactDOM from 'react-dom'

const App = props => <main style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'purple',
  height: '100vh'
}}>
  <p>Hey! Full page stuff!</p>
</main>

ReactDOM.render(<App />, document.getElementById('app'))
