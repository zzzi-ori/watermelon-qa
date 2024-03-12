import {postRank, PostRankParams} from '../fetch/postRank.ts'
import {useMutation} from '@tanstack/vue-query'

export const usePostRank = () => {
  console.log('usePostRank')
  return useMutation({
    mutationFn: (params: PostRankParams) => postRank(params),
  })
}
