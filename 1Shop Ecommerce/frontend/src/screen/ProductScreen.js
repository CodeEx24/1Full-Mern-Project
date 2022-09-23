import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox.js';
import { Alert } from 'bootstrap';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    }
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  function addToCartHandler() {
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...product, quantity: 1 },
    });
  }

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={5}>
          <img
            className="product-screen-img-large"
            src={product.image}
            alt={product.name}
          />
        </Col>
        <Col md={7} className="mt-auto mb-auto p-5">
          <ListGroup variant="flush" className="p-5">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Price:</b> ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Description: </b>
              <p>{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              <Col>
                <p>
                  <b>Price: </b>${product.price}
                </p>
              </Col>
              <Col>
                {product.countInStock ? (
                  <Badge bg="success">
                    <p className="h6 m-0 px-2 py-1">In Stock</p>
                  </Badge>
                ) : (
                  <Badge bg="danger" className="px-4 py-2">
                    <p className="h6 m-0 px-2 py-1">Out of Stock</p>
                  </Badge>
                )}
              </Col>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Button onClick={addToCartHandler} variant="primary">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
