import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { useContext, useState } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import AddToCart from './AddToCart';

export default function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  async function addToCartHandler(item) {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      setShow(true);
      return;
    }

    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
      //quantity: quantity
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <AddToCart
          handleClose={handleClose}
          show={show}
          className="btn-primary"
          variant={product.countInStock > 0 ? 'primary' : 'light'}
          clickHandler={() => addToCartHandler(product)}
          disabled={product.countInStock === 0}
          text={product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        ></AddToCart>

        {/* <Button
          handleClose={handleClose}
          show={show}
          1className="btn-primary"
          1variant={product.countInStock > 0 ? 'primary' : 'light'}
          1clickHandler={() => addToCartHandler(product)}
          1disabled={product.countInStock === 0}
          1text={product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        ></Button> */}
      </Card.Body>
    </Card>
  );
}
