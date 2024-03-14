import axios, {AxiosInstance, CreateAxiosDefaults} from 'axios'

const config: CreateAxiosDefaults = {
  baseURL: 'https://3.35.245.28.nip.io'
}

export const zaxios: AxiosInstance = axios.create(config)
