import { Form, Row, Col } from 'react-bootstrap'
import { ISearchParams } from './helper'

const SearchForm = (props: {params: ISearchParams, onParamsChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <Form className='mb-4'>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={props.onParamsChange} value={props.params.name} name='name' type='text'></Form.Control>
            </Form.Group>
        </Row>
    </Form>
  )
}

export default SearchForm