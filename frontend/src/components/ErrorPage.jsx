import Image from "react-bootstrap/esm/Image";
import logo from './24.png';


const ErrorPage = () => {
  return (
    <div className="text-center">
      <Image src={logo}        fluid
        className="h-25"></Image>
      <h1 className="h4 text-muted">Oops! This is not the page you're looking for.</h1>
    </div>
  );
};

export default ErrorPage;
