import { rpcClient } from '@zenginehq/zengine-sdk'

export const getMe = callback => rpcClient.call({
  method: 'znHttp',
  args: {
    plugin: { apiVersion: '1.0.1' },
    params: { method: 'get', url: '/users/me' }
  },
  callback
})

export const getForms = test => rpcClient.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: 'v1' },
    request: { method: 'get', url: '/forms' }
  }
})

export const znToolTip = (ref, message, side, timeout) => {
  const { top, left, bottom, right } = ref.current.getBoundingClientRect()

  rpcClient.call({
    method: 'openTooltip',
    args: {
      options: { side, message, top, left, bottom, right, timeout }
    }
  })
}

export const getWorkspaces = callback => rpcClient.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: '1' },
    request: { method: 'get', url: '/workspaces', params: { id: 1 } }
  },
  callback
})

export const saveRecord = (data, formId) => rpcClient.call({
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

export const znModal = async (options = {}, callback) => {
  const id = await rpcClient.call({
    method: 'modal',
    args: { options },
    callback
  })

  return id
}

export const znDropdown = async (options = {}, ref) => {
  const { top, left, bottom, right } = ref.current.getBoundingClientRect()

  const id = await rpcClient.call({
    method: 'dropdown',
    args: { options: { ...options, left, right, top, bottom } }
  })

  console.log(id)
}

export const znLocalStorage = (method, key, item, callback) => {
  return rpcClient.call({
    method: 'znLocalStorage',
    args: { method, key, item }
  })
}

export const uploadFile = (formId, fieldId, file, data = {}) => new Promise((resolve, reject) => {
  const reader = new FileReader()

  reader.onload = async e => {
    const arrayBuffer = reader.result

    const response = await rpcClient.call({
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

const locationCache = {};

export const locationAsync = (method, args = []) => {
  return rpcClient.call({ method: 'location', args: { method, args } })
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
