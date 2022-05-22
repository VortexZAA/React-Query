import { useQueries } from "react-query";
import axios from 'axios'

const fetchBook=(bookId)=>{
    return axios.get(`http://localhost:4000/books/${bookId}`)
}

export const DynamicParallelPage=({heroIds})=>{
    const queryResults=useQueries(
        heroIds.map((id)=>{
            return{
                queryKey:['book',id],
                queryFn:()=>fetchBook(id)
            }
        })
    )
    console.log({queryResults})
    return <div>DynamicParallelPage</div>
}