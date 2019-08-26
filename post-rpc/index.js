import Client from '@zenginehq/post-rpc-client'

export const client = new Client(document.location.ancestorOrigins[0])

// client.logging(true)
client.start()

export const getMe = callback => client.call('znHttp', {
  options: { apiVersion: '1.0.1' },
  request: { method: 'get', url: '/users/me' }
}, callback)

export const getForms = test => client.call('znHttp', {
  options: { apiVersion: 'v1' },
  request: { method: 'get', url: '/forms.csv' }
})

export const getWorkspaces = test => client.call('znHttp', {
  options: { apiVersion: '1' },
  request: { method: 'get', url: '/workspaces', params: {id: 1}}
}, test)

export const uploadFile = (formId, fieldId, file, data) => {

  var reader = new FileReader();

  reader.onload = function(e) {
    var arrayBuffer = reader.result;

    var promise = client.call('znHttp', {
      options: { apiVersion: 'v1' },
      request: {
        method: 'post',
        url: `/forms/${formId}/uploads`,
        data: {
          fieldId: fieldId,
          'form[id]': formId
        },
        multipart: {
          key: 'file',
          file: arrayBuffer,
          name: file.name,
          type: file.type
        }
      }
    }, null, 60000)

    promise.then(response => {
      data = data || {}
      data[`field${fieldId}`] = response.data.data.hash
      saveRecord(data, formId).then((response) => {
        znMessage(`File upload to Record ${response.data.id}`);
      })
    })
  }

  reader.readAsArrayBuffer(file);

}

export const saveRecord = (data, formId) => client.call('znHttp', {
  options: { apiVersion: '1' },
  request: {
    method: 'post',
    url: `/forms/${formId}/records`,
    data: data
  }
})

export const znConfirm = (message, callback) => {
  console.log('calling confirm')
  client.call('confirm', { message }, callback, Infinity)
}

export const znMessage = (message, type, duration) => {
  console.log('calling znMessage')
  client.call('message', { params: { message, type, duration } })
}

export const znModal = (options = {}, callback) => {
  console.log('calling znModal')
  client.call('modal', { options }, callback, Infinity)
}

export const znFiltersPanel = (options, callback) => {
  console.log('calling znFiltersPanel')
  client.call('filtersPanel', { options }, callback, Infinity)
}

export const znLocalStorage = (method, key, item, callback) => {
  console.log('calling znLocalStorage')
  return client.call('znLocalStorage', { method, key, item })
}

export const znResize = dimensions => {
  console.log('calling znResize')
  client.call('resize', { dimensions })
}

// client.subscribe('item', (result, error) => {
//   console.log(result)
// })
