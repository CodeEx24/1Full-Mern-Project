import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ButtonCart(props) {
  return (
    <>
      <Button variant="primary" onClick={props.addToCartHandler}>
        Add to Cart
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry, Product is Out of Stock!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
