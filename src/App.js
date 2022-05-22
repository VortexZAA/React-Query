import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {QueryClientProvider,QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQBooksPage } from './components/RQBooks.page'
import { BooksPage } from './components/Books.page'
import { RQBookPage } from './components/RQBook'
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'
const queryClient= new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/books'>Traditional Books</Link>
            </li>
            <li>
              <Link to='/rq-books'>RQ Books</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/infinite-paginated'>
          <InfiniteQueriesPage/>
          </Route>
          <Route path='/rq-paginated'>
          <PaginatedQueriesPage/>
          </Route>
          <Route path="/rq-dependent">
          <DependentQueriesPage email="yudhajitadhikary@example.com"/>
          </Route>
        <Route path="/rq-dynamic-parallel">
        <DynamicParallelPage heroIds={[1,3]}/>
          </Route>
          <Route path="/rq-parallel">
        <ParallelQueriesPage/>
          </Route>
          <Route path='/rq-books/:heroId'>
        <RQBookPage/>
          </Route>
          <Route path='/books'>
            <BooksPage />
          </Route>
          <Route path='/rq-books'>
            <RQBooksPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}

export default App
