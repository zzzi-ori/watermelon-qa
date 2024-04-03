import {useMutation} from '@tanstack/vue-query'
import {postEvent, PostEventParams} from '../fetch/postEvent.ts'

export const usePostEvent = () => {
  return useMutation({
    mutationFn: (params: PostEventParams) => postEvent(params),
  })
}
