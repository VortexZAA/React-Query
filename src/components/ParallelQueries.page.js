import {useQuery} from 'react-query'
import axios from 'axios'
const fetchBooks=()=>{
    return axios.get('http://localhost:4000/books')
}
const fetchFriends=()=>{
    return axios.get('http://localhost:4000/friends')
}
export const ParallelQueriesPage=()=>{
    const { data: books }=useQuery('books',fetchBooks)
    const { data: friends }=useQuery('friends',fetchFriends)
    return <div>ParallelQueriesPage</div>
}