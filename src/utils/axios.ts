// https://github.com/axios/axios

import axios, { AxiosError, AxiosResponse } from 'axios'
import { IMovieAPIErrorRes, IMovieAPIRes } from 'types/movie'

const { CancelToken } = axios
const { isCancel } = axios

const baseSettings = {
  timeout: 10 * 1000,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestError = (error: any): any => {
  return Promise.reject(error)
}

const resolveResponse = (response: AxiosResponse): AxiosResponse => response

const responseError = (error: AxiosError): Promise<never> => {
  // eslint-disable-next-line no-console
  console.log(error)
  return Promise.reject(error)
}

const plainInstance = axios.create({
  ...baseSettings,
  withCredentials: false,
})

const instance = axios.create(baseSettings)
instance.interceptors.request.use((config) => config, requestError)
instance.interceptors.response.use(resolveResponse, responseError)

const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err)
}

const isValidResponse = (axiosRes: IMovieAPIRes | IMovieAPIErrorRes): axiosRes is IMovieAPIRes => {
  //   return (axiosRes as IMovieAPIRes).Response === 'True'
  return axiosRes.Response === 'True'
}

export { axios, instance, plainInstance, CancelToken, isCancel, isAxiosError, isValidResponse }
