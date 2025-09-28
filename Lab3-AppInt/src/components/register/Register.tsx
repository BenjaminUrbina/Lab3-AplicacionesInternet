import "../../styles/loginPage/register.css";
export default function Register() {
  return (
    <form className="registerX d-flex space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        className="border rounded p-2 mb-3"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="border rounded p-2 mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded p-2 mb-3"
      />
      <button className="butonOK text-white py-2 mb-3 rounded">
        Registrarse
      </button>
    </form>
  );
}
