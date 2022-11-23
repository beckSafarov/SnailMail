import axios from 'axios'

export const shortConfig = { withCredentials: false }

export const fullConfig = {
  headers: { 'Content-Type': 'application/json' },
  cancelToken: axios.CancelToken.source().token,
  withCredentials: false
}