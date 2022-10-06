import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  //usenavigate to allow user navigate to specific page of the website
  const navigate = useNavigate();
  //Calling the state and dispatch coming from the store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //getting the cartItems of the state in the useContext Store (Store.js)
  const {
    cart: { cartItems },
  } = state;

  //To remove the specifuc product item
  function cartTrashHandler(item) {
    ctxDispatch({ type: 'DELETE_CART_ITEM', payload: item });
  }

  //cart handler to check for the item and update the current state (value)
  async function updateCartHandler(item, quantity) {
    //Getting data from the api of specific product
    const { data } = await axios.get(`/api/products/${item._id}`);
    //Adding item in the cart
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
      //quantity: quantity
    });
  }

  function checkoutHandler() {
    navigate('/signin?redirect=/shipping');
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {/* Check if the cartItems of the state is have an item to know what to render in the UI */}
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            // If there is an item it will map each item coming from the cart of useContext Store.
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  //Will return each of the item coming from the cart to show in the UI
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
                        {/* updateCartHandler with a second paremeter of quantity minus 1 for reducing the quantity of specific item*/}
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        <span>{item.quantity}</span>
                        {/* updateCartHandler with a second paremeter of quantity + 1 for adding the quantity of specific item*/}
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          variant="light"
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        {/* cartTrashHandler to remove the specific item in the cart */}
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

        {/* Proceed to checkout */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {/* .reduce function to accumulate total value of an item quantity in the cartItems */}
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
                    {/* accumulator for the total value of all (item price * its quantity) */}
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
                      onClick={checkoutHandler}
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
