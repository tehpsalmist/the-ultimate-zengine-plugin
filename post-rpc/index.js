import Client from '@zenginehq/post-rpc-client'

export const client = new Client(document.location.ancestorOrigins[0])

client.logging(false)
client.start()

export const getMe = callback => client.call({
  method: 'znHttp',
  args: {
    plugin: { apiVersion: '1.0.1' },
    params: { method: 'get', url: '/users/me' }
  },
  callback
})

export const getForms = test => client.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: 'v1' },
    request: { method: 'get', url: '/forms' }
  }
})

export const znToolTip = (ref, message, side) => {
  const element = ref.current
  console.log(element.screenX)
}

export const getWorkspaces = callback => client.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: '1' },
    request: { method: 'get', url: '/workspaces', params: { id: 1 } }
  },
  callback
})

export const saveRecord = (data, formId) => client.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: '1' },
    request: {
      method: 'post',
      url: `/forms/${formId}/records`,
      data
    }
  }
})

export const znConfirm = (message, callback) => {
  console.log('calling confirm')
  return client.call({
    method: 'confirm',
    args: { message },
    callback,
    timeout: Infinity
  })
}

export const znMessage = (message, type, duration) => {
  console.log('calling znMessage')
  return client.call({
    method: 'message',
    args: { params: { message, type, duration } }
  })
}

export const znModal = (options = {}, callback) => {
  console.log('calling znModal')
  return client.call({
    method: 'modal',
    args: { options },
    callback,
    timeout: Infinity
  })
}

export const znFiltersPanel = (options, callback) => {
  console.log('calling znFiltersPanel')
  return client.call({
    method: 'filtersPanel',
    args: { options },
    callback,
    timeout: Infinity
  })
}

export const znLocalStorage = (method, key, item, callback) => {
  console.log('calling znLocalStorage')
  return client.call({
    method: 'znLocalStorage',
    args: { method, key, item }
  })
}

export const znResize = dimensions => {
  console.log('calling znResize')
  return client.call({
    method: 'resize',
    args: { dimensions }
  })
}

export const uploadFile = (formId, fieldId, file, data = {}) => new Promise((resolve, reject) => {
  const reader = new FileReader()

  reader.onload = async e => {
    const arrayBuffer = reader.result

    const response = await client.call({
      method: 'znHttp',
      timeout: 60000,
      args: {
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
      }
    })
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
  return client.call({
    method: 'znPluginData',
    timeout: 60000,
    args: {
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
    }
  })
}

const locationCache = {};

export const locationAsync = (method, args = []) => {
  return client.call({ method: 'location', args: { method, args } })
}

export const $location = {
  host: () => { return locationCache.host },
  protocol: () => { return locationCache.protocol },
  port: () => { return locationCache.port },
  absUrl: () => { return locationCache.href },
  hash: (...args) => { // '#test'
    if (args.length) {
      return locationAsync('hash', args)
    } else {
      return locationCache.hash
    }
  },
  search: (...args) => { // {'search': 1}
    if (args.length) {
      locationAsync('searchParams', args)
    } else {
      return locationCache.search
    }
  },
  url: (...args) => { // '/workspaces?search=1#test'
    if (args.length) {
      locationAsync('href', args)
    } else {
      var index = locationCache.href.indexOf(location.pathname);
      return locationCache.href.substr(index, location.href.length);
    }
  },
  path: (...args) => { // '/workspaces'
    if (args.length) {
      locationAsync('href', args)
    } else {
      return locationCache.path
    }
  },
  navigate: (...args) => {
    return locationAsync('navigate', args)
  }
}

client.subscribe('item', (result, error) => {
  console.log(result)
})
