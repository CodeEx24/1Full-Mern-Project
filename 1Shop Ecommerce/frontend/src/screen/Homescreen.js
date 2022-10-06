import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
// import data from '../data';

// Reducer function so it will be able if the data is successfully fetch or not
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Homescreen() {
  // const [products, setProducts] = useState([]);

  // useReducer for handling the data state of loading, error, and products. Dispatch is a function to control what to do in the data.
  //the first parameter is a function and the second is the data of first parameter
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  // useEffect with an emtpy array on second parameter so it run once
  useEffect(() => {
    //Asycn function and try catch block to get the data coming from the backend (localhost:5000/api/products)
    async function fetchData() {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    }
    fetchData();
  }, []);

  //Data element for each of the product comming from the state and dispatch of useReducer function
  const dataElement = products.map((product) => {
    return (
      <Col sm={6} md={4} lg={3} key={product.slug} className="mb-4">
        {/* Passing each of the product as a props in the components */}
        <Product product={product} />
      </Col>
    );
  });

  //HomeScreen Design
  return (
    <div>
      <Helmet>
        <title>JBShop</title>
      </Helmet>
      <h1>Featured Products</h1>
      {/* Will check if the loading or error occur in the state if not it will display the products containing by the dataElement above */}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="products">
          <Row>{dataElement}</Row>
        </div>
      )}
    </div>
  );
}
