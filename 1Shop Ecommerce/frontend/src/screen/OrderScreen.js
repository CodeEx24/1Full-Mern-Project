import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../Store';
import { getError } from '../utils';
import MessageBox from '../components/MessageBox';

// Reducer function for controlling the case in useReducer
function reducer(state, action) {
  // Action type to perform on different cases
  switch (action.type) {
    case 'FETCH_REQUESTS':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
}

export default function OrderScreen() {
  // Getting the value of state and function dispatch coming from the store context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // Getting the specific userInformation for the UI
  const { userInfo } = state;

  //Parameter of the screen order (Order ID)
  const params = useParams();
  const { id: orderId } = params;

  const navigate = useNavigate();

  //useReducer for fetching the data to know if it is successfully fetch or an error occured in fetching data
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  //UseEffect for fetching the data. If there are something changes like ID in params the useEffect will run again to fetch that orderID data.
  useEffect(() => {
    //This will not run until it was called in the program.
    async function fetchOrder() {
      //Try catch block for fetching the data if there is an error in fetching data the catch will run.
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        //Fetching the data from the backend
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    }

    //Check if the userInformation coming from the state (Context of the store)
    if (!userInfo) {
      return navigate('/login');
    }
    //If statement above is true. Check for the orderID if it exists. if it exist and it is not equal to parameter of orderID fetch for another data.
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  //Will check for the data if it is loading then render the loading box.
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : // If there is an error the message box will show for the users to notify what's wrong
  error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    //Else render the Specific order details of the orderID
    <div>
      <Helmet>
        {/* Title of the page in tab */}
        <title>Order: {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order Screen #{orderId}</h1>
      <Row>
        {/* Order details of the client name, address and process */}
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          {/* Payment method details */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          {/* Item order details */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Order summary total */}
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
