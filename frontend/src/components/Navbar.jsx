import { Navbar as BtsNavbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useHook from '../hooks/index.js';
import routes from '../routes.js';

const { useAuth } = useHook;
const Navbar = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();

  return (
    <BtsNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BtsNavbar.Brand as={Link} to={routes.chatPagePath()}>{t('appName')}</BtsNavbar.Brand>
        {!!user && <Button onClick={logOut}>{t('logout')}</Button>}
      </Container>
    </BtsNavbar>
  );
};

export default Navbar;
