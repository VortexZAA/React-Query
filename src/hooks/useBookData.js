import {useMutation, useQuery,useQueryClient} from 'react-query'
import {request} from '../utils/axios.utils'
// import axios from 'axios'
  const fetchBooks=()=>{
    // return axios.get('http://localhost:4000/books')
    return request({url:'/books'})
  }
  const AddBook=(hero)=>{
    // return axios.post('http://localhost:4000/books',hero)
    return request({url:'/books',method:'post',data:hero})
  }
export const useBooksData=(onSuccess,onError)=>{
    return useQuery('books',fetchBooks,{
        // cacheTime:5000,//garbage collected
        // staleTime:1000// stale time 
        // refetchOnMount:true,
        // refetchOnWindowFocus:true//always will always refetch irespective of the stale caching time
        // refetchInterval:2000,// refetch gets call in 2 sec interval
        // refetchIntervalInBackground:true //refetch will happen even when window is not in focus
        // enabled:false
        onSuccess,
        onError,
        // select:(data)=>{
        //   const BookNames=data.data.map(hero=>hero.name)
        //   return BookNames
        // }
      } )
}
export const useAddBookData=()=>{
  const queryClient=useQueryClient()
  return useMutation(AddBook,{
    // onSuccess:(data)=>{
    //   // queryClient.invalidateQueries('books')
    //   queryClient.setQueryData('books',(oldQueryData)=>{
    //     return {
    //       ...oldQueryData,
    //       data:[...oldQueryData.data,data.data]
    //     }
    //   })
    // }
    onMutate: async(newHero)=>{
      await queryClient.cancelQueries('books')
      const previousHeroData=queryClient.getQueryData('books')
      queryClient.setQueryData('books',(oldQueryData)=>{
        return {
                ...oldQueryData,
                data:[...oldQueryData.data,
                {id:oldQueryData?.data?.length+1,...newHero}]

              }
      })
      return {
        previousHeroData
      }
    },
    onError:(_error,_hero,context)=>{
      queryClient.setQueryData('books',context.previousHeroData)
    },
    onSettled:()=>{
      queryClient.invalidateQueries('books')
    }
  })
}