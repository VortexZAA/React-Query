import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useAddBookData, useBooksData } from '../hooks/useBookData'
export const RQBooksPage = () => {
  const [name,setName]= useState('')
  const [author,setAuthor]=useState('')
  const onSuccess=(data)=>{
    console.log('Perform side effect after data fetching',data)
  }
  const onError=(error)=>{
    console.log('Perform side effect after encountering error',error)
  }
  const {isLoading,data,isError,error, isFetching ,refetch}=useBooksData(onSuccess,onError)
  const {mutate: addBook}=useAddBookData()
  const handleAddBookClick =()=>{
    console.log({name,author})
    const book={name,author}
    addBook(book)
  }
  console.log(data)
  console.log(isFetching)
  if(isLoading){
    return <h2>Loading....</h2>
  }
  if(isError){
    return<h2>{error.message}</h2>
  }
  return (
  <div><h2>React Query Book Page</h2>
  <div>
<input 
type='text'
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)}
/>
<button onClick={handleAddBookClick}>Add Book</button>
</div>
  <button onClick={refetch}>Fetch Books</button>
  {data?.data.map(book=>{
    return (<div key={book.id}>
    <Link to={`/rq-books/${book.id}`}>{book.name}</Link>
     </div>)
  })}
  {/* {
    data.map((bookName)=>{
      return <div key={bookName}>{bookName}</div>
      
    })} */}
  </div>)
}

