type Props = {};
import "../../styles/loginPage/login.css";
export default function Login({}: Props) {
  return (
    <form className="formX d-flex">
      <input
        type="email"
        placeholder="E-mail"
        className="border rounded p-2 w-100 mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded p-2 w-100 mb-3"
      />
      <a href="#" className="fs-6 mb-2">
        ¿Has olvidado tu contraseña?
      </a>
      <button className="butonOK text-white py-2 rounded">
        Iniciar sesión
      </button>
    </form>
  );
}
