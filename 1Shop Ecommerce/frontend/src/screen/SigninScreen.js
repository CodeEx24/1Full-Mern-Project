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

export default function SigninScreen() {
  const { search } = useLocation(); //search = ?redirect=/shipping
  const redirectedUrl = new URLSearchParams(search).get('redirect'); //RURL = /shipping
  const redirect = redirectedUrl ? redirectedUrl : '/'; //Redirect = /shipping

  //email and password as an empty string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //state and dispatch coming from the context Store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //Getting the userInfo coming from the state
  const { userInfo } = state;
  const navigate = useNavigate();

  async function submitHandler(e) {
    //to prevent refreshing the page
    e.preventDefault();
    try {
      //request for the data in the backend
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      //Save the data as payload
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      //Save the user information in the local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      //navigate user to redirect or in /
      navigate(redirect || '/');
    } catch (err) {
      //If there is an error show the error message
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    //If userInfo exist navigate to the shipping (redirect property)
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <CheckoutSteps step1 />
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3 mt-5">Sign In</h1>
        <Form onSubmit={submitHandler}>
          {/* Email Address */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>

          {/* New Customer */}
          <div className="mb-3">
            New Customer ?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
          </div>
        </Form>
      </Container>
    </>
  );
}
