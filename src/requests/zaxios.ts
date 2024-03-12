import axios, {AxiosInstance, CreateAxiosDefaults} from 'axios'

const config: CreateAxiosDefaults = {
  baseURL: 'http://3.35.245.28:8080/'
}

export const zaxios: AxiosInstance = axios.create(config)
