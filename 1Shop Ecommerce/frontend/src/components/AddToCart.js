import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddToCart(props) {
  const {
    handleClose,
    show,
    className,
    variant,
    clickHandler,
    disabled,
    text,
  } = props;
  return (
    <>
      <Button
        className={className}
        variant={variant}
        onClick={clickHandler}
        disabled={disabled}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ohh, No!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry, Product is Out of Stock!</Modal.Body>
        <Modal.Footer>
          <Button variant={variant} onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
