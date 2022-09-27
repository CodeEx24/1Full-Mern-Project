import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import CheckoutSteps from '../components/CheckoutSteps';

export default function SignupScreen() {
  const { search } = useLocation(); //search = ?redirect=/shipping
  const redirectedUrl = new URLSearchParams(search).get('redirect'); //RURL = /shipping
  const redirect = redirectedUrl ? redirectedUrl : '/'; //Redirect = /shipping

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  async function submitHandler(e) {
    //to prevent refreshing the page
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <CheckoutSteps step1 />
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3 mt-5">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already have an account ?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </Container>
    </>
  );
}
