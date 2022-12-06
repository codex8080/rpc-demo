import axios from 'axios'

export async function sendRequest(apilink, type, jsonObject, config) {
  // axios.defaults.timeout = 60000
  try {
    let response
    switch (type) {
      case 'post':
        response = await axios.post(apilink, jsonObject, config)
        return response.data
      case 'put':
        response = await axios.put(apilink, jsonObject)
        return response.data
      case 'get':
        response = await axios.get(apilink)
        return response.data
      case 'delete':
        response = await axios.delete(apilink, {
          data: jsonObject
        })
        return response.data
    }
  } catch (err) {
    console.error(err)
  }
}

export default {
  sendRequest
}