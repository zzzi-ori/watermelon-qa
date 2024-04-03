import {zaxios} from '../zaxios.ts'

export interface PostEventParams {
    userId: number,
    phoneNumber: string
}

export const postEvent = async (params: PostEventParams) => {
  const response = await zaxios.post('/rank/event', params)
  return response.data
}
