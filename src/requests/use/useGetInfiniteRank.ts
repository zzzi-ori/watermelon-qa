import {useInfiniteQuery} from '@tanstack/vue-query'
import {getRank} from '../fetch/getRank.ts'

export const useGetInfiniteRank = () => {
  let page = 0
  return useInfiniteQuery({
    queryKey: ['rank'],
    queryFn: ({pageParam}) => getRank({
      pageNumber: pageParam,
      dateTime: 0
    }),
    initialPageParam: 0,
    getNextPageParam: () => {
      page += 1
      return page
    }
  })
}
