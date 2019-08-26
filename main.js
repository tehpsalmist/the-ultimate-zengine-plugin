import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { getForms, saveRecord } from './post-rpc';
import { getWorkspaces } from './post-rpc';
import { getMe } from './post-rpc';
import { uploadFile } from './post-rpc';

getMe()
.then(getForms)
.then(getWorkspaces)
.then((response) => {
  console.log(response);
})
.catch(error => {
  console.warn(error);
})

const App = props => {

  const [formId, setFormId] = useState(0)
  const [fieldId, setFieldId] = useState(0)

  const upload = e => {
    if (e.target && e.target.files) {
      var file = e.target.files[0];
      uploadFile(formId, fieldId, file);
    }
  }

  const updateFormId = e => {
    setFormId(e.target.value);
  }

  const updateFieldId = e => {
    setFieldId(e.target.value);
  }

  return <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: '100vh'
  }}>

<p>You clicked {formId} times</p>
    Form ID: <input type="text" onChange={updateFormId}></input>
    <br/>
    Field ID: <input type="text" onChange={updateFieldId}></input>
    <br/>
    <input type="file" onChange={upload}></input>

    <p>Hey! Full page stuff!</p>
  </main>

}

ReactDOM.render(<App />, document.getElementById('app'))
