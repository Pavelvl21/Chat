import { Navbar as BtsNavbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <BtsNavbar bg="white" expand="lg" className="shadow-sm">
    <Container>
      <BtsNavbar.Brand as={Link} to="/login">Live Chat</BtsNavbar.Brand>
    </Container>
  </BtsNavbar>
);

export default Navbar;
