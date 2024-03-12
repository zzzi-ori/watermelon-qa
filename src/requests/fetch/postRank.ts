import {zaxios} from '../zaxios.ts'

export interface PostRankParams {
    nickname: string,
    score: number
}

export interface PostRankResult {
    myRank: number
    rankCount: number
    currentTime: number
}

export const postRank = async (params: PostRankParams): Promise<PostRankResult> => {
  console.log('post rank')
  const response = await zaxios.post('/rank', params)
  console.log(response)
  return response.data
}
