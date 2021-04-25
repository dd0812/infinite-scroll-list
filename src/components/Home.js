import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Spinner, Container, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useFetch from './FetchData';

function Home(props) {
    const [page, setPage] = useState(1);
    const { loading, error, userList } = useFetch(page);
    const loader = useRef(null);
    const history = useHistory();

    const handleObserver = useCallback((entries) => {
        const tgt = entries[0];
        if (tgt.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        console.log('history', history);
        if (history.location.state !== undefined && !history.location.state.invalidUser) {
            const option = {
                root: null,
                rootMargin: '20px',
                threshold: 0
            };
            const observer = new IntersectionObserver(handleObserver, option);
            if (loader.current) {
                observer.observe(loader.current);
            }
        }
        else {
            history.push('/login');
        }
    }, [handleObserver]);

    const logoutUser = () => {
        history.push({
            pathname: '/login',
            state: {invalidUser : true}
        });

    }

    return (
        <Container fluid className='home-page'>
        {
            (history.location.state !== undefined && !history.location.state.invalidUser) ?
            <div >
                <div className='row'>
                    <Col xs={10}>
                        <h2>Welcome to Responsive Infinite Scrolling List</h2>
                    </Col>
                    <Col xs={2}>
                        <Button variant='primary' type='submit' onClick={logoutUser}>
                            Logout
                        </Button>
                    </Col>
                </div>
                <div className='row'>
                <div className='container' style={{width: 'auto', textAlign: 'center'}}>
                {userList && userList.map((user) => (
                        <div className='row contact-tile'>
                            <Col xs={8} style={{padding: '2px' , textAlign: 'left'}}>
                                <p>{user.name.title} {user.name.first} {user.name.last}</p>
                            </Col>
                            <Col xs={4} style={{padding: '2px'}}>
                                <img
                                    src={user.picture.large}
                                    alt='imgUrl'
                                    height='50px'
                                    width='50px'
                                />
                            </Col>
                        </div>
                ))}
                </div>
                </div>
                {loading &&
                    <Spinner animation='border' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                }
                {error && <p>Error!</p>}
                <div ref={loader} />
            </div>
            :
            null
        }
       </Container>
    );
}

export default Home;
