import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Homescreen from './screen/Homescreen';
import ProductScreen from './screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import { useContext } from 'react';
import Badge from 'react-bootstrap/esm/Badge';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import CartScreen from './screen/CartScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  const cartElement = cart.cartItems.map((item) => {
    return (
      <div className="d-flex align-items-center mb-3" key={item._id}>
        <img src={item.image} alt={item.name} width="40px" className="border" />
        <h5 className="mx-auto">{item.name}</h5>
        <p>${item.price}</p>
      </div>
    );
  });

  const popover = (
    <Popover id="popover-basic" className="cart-popover">
      <Popover.Header as="h3">Recently Added Products</Popover.Header>
      <Popover.Body>{cartElement}</Popover.Body>
    </Popover>
  );

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand href="#home">JBShop</Navbar.Brand>
              </LinkContainer>
              <Nav className="ml-auto">
                <OverlayTrigger
                  trigger={['hover', 'hover']}
                  placement="bottom"
                  overlay={popover}
                >
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce(
                          (accumulator, item) => accumulator + item.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </Link>
                </OverlayTrigger>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-5">
            <Routes>
              <Route path="/" element={<Homescreen />}></Route>
              <Route path="/product/:slug" element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
