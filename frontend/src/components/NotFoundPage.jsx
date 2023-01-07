import Image from 'react-bootstrap/Image';
import logo from '../assets/NFP.svg';

const NotFoundPage = () => (
  <div className="vh-100 row position-relative">
    <Image src={logo} className="h-50" />
    <div className="text-center text-muted position-absolute top-50">
      <h2>Страница не найдена</h2>
      <p>
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </div>
);

export default NotFoundPage;
