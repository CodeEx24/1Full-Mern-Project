import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;

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
        <Button
          className="btn-primary"
          variant="primary"
          disabled={product.countInStock === 0}
        >
          {product.countInStock > 1 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Card.Body>
    </Card>
  );
}
