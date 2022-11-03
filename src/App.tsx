import useFetchBreweries from './useFetchBreweries';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Brewery from './Brewery';
import BreweryPagination from './BreweryPagination';
import SearchForm from './SearchForm';
import { ISearchParams } from './helper';

const App = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({ name: '' });
  const [page, setPage] = useState<number>(1);
  const { breweries, loading, error, hasNextPage } = useFetchBreweries(searchParams, page);

  const handleParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const param = event.target.name;
    const value = event.target.value;
    setPage(1);
    setSearchParams(prevParams => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className='my-4'>
      <h1 className='md-4'>Breweries</h1>
      <SearchForm params={searchParams} onParamsChange={handleParamChange}/>
      <BreweryPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      { loading && <h1>Loading...</h1> }
      { error && <h1>Error. Try refreshing</h1> }
      { breweries.map(brewery => {
          return <Brewery key={brewery.id} brewery={brewery}/>
      })}
      <BreweryPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App
