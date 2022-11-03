import React, { useState } from 'react';
import { Badge, Button, Card, Collapse } from 'react-bootstrap';
import { IBrewery } from './helper';

const Brewery = (props: { brewery: IBrewery }) => {
    const [open, setOpen] = useState(false);
    return (
        <Card className='mb-3'>
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {props.brewery.name} - <span className='text-muted font-weight-light'>{props.brewery.brewery_type}</span>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>
                            {new Date(props.brewery.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge bg='secondary'>{props.brewery.city}</Badge>
                        <div style={{wordBreak: 'break-all'}}>
                            <a href={props.brewery.website_url}>{props.brewery.website_url}</a>
                        </div>
                    </div>
                    <img className='d-none d-md-block' height="50" src="https://cdn-icons-png.flaticon.com/512/2977/2977173.png" alt="not found" />
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)} variant='primary'>{open ? 'Hide Deatails' : 'View Details'}</Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className='mt-4'>
                        {props.brewery.street}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default Brewery
