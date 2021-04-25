import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUser, setInvalidUser] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        // console.log('params', params);
        console.log('userName and pwd', userName, password);
        e.preventDefault();
        if (userName === 'foo' && password === 'bar') {
            setInvalidUser(false);
            // setInvalidUser(false, () => {
                history.push({
                    pathname: '/home',
                    state: { invalidUser: false }
                });
            // });
        } else {
            setInvalidUser(true);
        }
    }
    return (
        <Container fluid className='login-form'>
            <h4>User login form</h4>
            <form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label className='login-fields'>User Name</Form.Label>
                    <Form.Control type='text' placeholder='User Name' onChange={(e) => setUserName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label className='login-fields'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                {invalidUser &&
                    <Alert variant={'danger'}>
                        Invalid credentials
                    </Alert>
                }
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default Login;