import {useInfiniteQuery} from '@tanstack/vue-query'
import {getRank} from '../fetch/getRank.ts'

export const useGetInfiniteRank = () => {
  const date = Date.now()
  return useInfiniteQuery({
    queryKey: ['rank'],
    queryFn: ({pageParam}) => getRank({
      pageNumber: pageParam,
      dateTime: date
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageNumber
    }
  })
}
