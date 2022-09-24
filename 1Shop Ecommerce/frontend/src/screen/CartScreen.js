import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  function cartTrashHandler(item) {
    ctxDispatch({ type: 'DELETE_CART_ITEM', payload: item });
  }

  async function updateCardHandler(item, quantity) {
    const { data } = await axios.get(`/api/products/${item._id}`);
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4} className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>
                        <p>
                          <b>{item.name}</b>
                        </p>
                      </Col>
                      <Col md={3}>
                        <Button
                          onClick={() =>
                            updateCardHandler(item, item.quantity + 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() =>
                            updateCardHandler(item, item.quantity + 1)
                          }
                          variant="light"
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => cartTrashHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>
                    Subtotal (
                    {cartItems.reduce(
                      (accumulator, item) => accumulator + item.quantity,
                      0
                    )}{' '}
                    {cartItems.quantity > 1 ? 'items' : 'item'}):
                  </h6>
                  <p>
                    $
                    {cartItems.reduce(
                      (accumulator, item) =>
                        accumulator + item.price * item.quantity,
                      0
                    )}{' '}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
