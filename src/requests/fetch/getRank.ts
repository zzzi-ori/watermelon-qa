import {zaxios} from '../zaxios.ts'

export interface GetRankParams {
    pageNumber: number,
    dateTime: number,
}

export interface RankItem {
    nickName: string,
    score: number,
    rank: number
}

export interface GetRankResult {
    nextPageNumber: number
    rankList: RankItem[],
    totalCount: number
}

export const getRank = async (params: GetRankParams): Promise<GetRankResult> => {
  const response = await zaxios.get('/rank', {
    params
  })
  return response.data
}
