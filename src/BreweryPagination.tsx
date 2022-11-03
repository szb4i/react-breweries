import { Pagination } from 'react-bootstrap';

const BreweryPagination = (props: {page: number, setPage: (page: number) => void, hasNextPage: boolean}) => {
  const adjustPage = (amount: number) => {
    props.setPage(props.page + amount);
  }
  return (
    <Pagination>
        {props.page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)}></Pagination.Prev>}
        {props.page !== 1 && <Pagination.Item onClick={() => props.setPage(1)}>1</Pagination.Item>}
        {props.page > 2 && <Pagination.Ellipsis/>}
        {props.page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{props.page - 1}</Pagination.Item>}
        <Pagination.Item active>{props.page}</Pagination.Item>
        {props.hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{props.page + 1}</Pagination.Item>}
        {props.hasNextPage && <Pagination.Next onClick={() => adjustPage(1)}></Pagination.Next>}
    </Pagination>
  );
}

export default BreweryPagination