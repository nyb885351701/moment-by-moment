import axios from 'axios'
import Loading from '../../components/loading/index'
import { baseUrl } from '../../config'
import store from '../../store'
//根据环境的不同使用不同的baseurl
// baseURL是axios中路径的公共前缀
let baseURL = baseUrl

// 配置axios实例
const axiosInstance = axios.create({
  baseURL,
  timeout: 100000
})

let loading = null
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    loading = Loading.service()
    const token = store.state.token

    if (token) {
      config.headers.authorization = 'Bearer ' + token //如果要求携带在请求头中
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    loading.close()
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/**
 *
 * @param {*} method 请求方式
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function request(method, url, params) {
  switch (method) {
    case 'GET':
      return GET(url, params)
    case 'POST':
      return POST(url, params)
    case 'UPLOAD':
      return UPLOAD(url, params)
    case 'DOWNLOAD':
      return DOWNLOAD(url, params)
    case 'PUT':
      return PUT(url, params)
    case 'DELETE':
      return DELETE(url, params)
  }
}

// 提供不同的请求方式
function GET(url, params) {
  return axiosInstance.get(url, params)
}

function POST(url, params) {
  return axiosInstance.post(url, params)
}

function UPLOAD(url, params) {
  return axiosInstance.post(url, params)
}

function DOWNLOAD(url, params) {
  return axiosInstance.get(url, params)
}

function PUT(url, params) {
  return axiosInstance.put(url, params)
}

function DELETE(url, params) {
  return axiosInstance.put(url, params)
}
