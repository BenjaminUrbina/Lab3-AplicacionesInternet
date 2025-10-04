type Props = {};
import "../../styles/home.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import iconImage from "../../assets/homeimg.png";
import { Row } from "react-bootstrap";

export default function Home({}: Props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - NOTeolvides</title>
        <meta
          name="description"
          content="Inicio pagina dedicada a notas, desarrollada por estudiantes de ingenieria en computación"
        />
      </Helmet>
      <div className="home-container">
        <div className="hero-section">
          <div className="floating-icon">
            <img
              src={iconImage}
              alt="NOTeolvides Icon"
              className="icon-image"
            />
          </div>
          <h1 className="hero-title">
            Bienvenidos a <span id="not">NOT</span>eolvides!
          </h1>
          <p className="hero-subtitle">
            Tu compañero perfecto para nunca olvidar lo importante
          </p>
          <div className="feature-tags d-flex flex-column align-items-center">
            <Row>
              <span className="tag">📝 Organiza tus ideas</span>
              <span className="tag">🎯 Mantén el enfoque</span>
              <span className="tag">✨ Simplifica tu vida</span>
            </Row>
            <Link to="/PageAuthenticate/login" className="login-button">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
