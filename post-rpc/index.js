import Client from '@zenginehq/post-rpc-client'

export const client = new Client(document.location.ancestorOrigins[0])

client.logging(false)
client.start()

export const getMe = callback => client.call('znHttp', {
  plugin: { apiVersion: '1.0.1' },
  params: { method: 'get', url: '/users/me' }
}, callback)

export const getForms = test => client.call('znHttp', {
  options: { apiVersion: 'v1' },
  request: { method: 'get', url: '/forms' }
})

export const getWorkspaces = test => client.call('znHttp', {
  options: { apiVersion: '1' },
  request: { method: 'get', url: '/workspaces', params: { id: 1 } }
}, test)

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
  return client.call('confirm', { message }, callback, Infinity)
}

export const znMessage = (message, type, duration) => {
  console.log('calling znMessage')
  return client.call('message', { params: { message, type, duration } })
}

export const znModal = (options = {}, callback) => {
  console.log('calling znModal')
  return client.call('modal', { options }, callback, Infinity)
}

export const znFiltersPanel = (options, callback) => {
  console.log('calling znFiltersPanel')
  return client.call('filtersPanel', { options }, callback, Infinity)
}

export const znLocalStorage = (method, key, item, callback) => {
  console.log('calling znLocalStorage')
  return client.call('znLocalStorage', { method, key, item })
}

export const znResize = dimensions => {
  console.log('calling znResize')
  return client.call('resize', { dimensions })
}

export const uploadFile = (formId, fieldId, file, data = {}) => new Promise((resolve, reject) => {
  const reader = new FileReader()

  reader.onload = async e => {
    const arrayBuffer = reader.result

    const response = await client.call('znHttp', {
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
      .catch(err => err instanceof Error ? err : new Error(JSON.stringify(err)))

    if (response instanceof Error) {
      return reject(response)
    }

    data[`field${fieldId}`] = response.data.data.hash

    resolve(saveRecord(data, formId))
  }

  file && reader.readAsArrayBuffer(file)
})

export const znPluginData = (namespace, method, route) => {
  return client.call('znPluginData', {
    namespace: namespace,
    method: method,
    route: route,
    options: {
      params: {
        id: 1
      },
      headers: {
        'x-my-custom-plugin-header': 'hello'
      }
    }
  }, null, 60000)
}

client.subscribe('item', (result, error) => {
  console.log(result)
})
