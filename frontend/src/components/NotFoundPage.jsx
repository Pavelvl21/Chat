import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import logo from '../assets/notFoundLogo.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image src={logo} className="img-fluid h-25" />
      <h1 className="h4 text-muted">
        {t('notFound.header')}
      </h1>
      <p className="text-muted">
        {t('notFound.message')}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
