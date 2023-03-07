import { Navbar as BtsNavbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHook from '../hooks/index.js';

const { useAuth } = useHook;
const Navbar = () => {
  const { logOut, user } = useAuth();

  return (
    <BtsNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BtsNavbar.Brand as={Link} to="/login">Hexlet Chat</BtsNavbar.Brand>
        {!!user && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </BtsNavbar>
  );
};

export default Navbar;
