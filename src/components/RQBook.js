import {useParams} from 'react-router-dom'
import { useBooksData } from "../hooks/useBooksData"
export const RQBookPage=()=>{
    const {heroId}=useParams()
    const {isLoading,data,isError,error}=useBooksData(heroId)
    if(isLoading){
        return <h2>Loading....</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            {data?.data.name} - {data?.data.author}
        </div>
    )

    
}