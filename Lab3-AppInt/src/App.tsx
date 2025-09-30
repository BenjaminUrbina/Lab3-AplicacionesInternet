import { Home, LoginPage,Task} from "./pages/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="TaskPage" element={<Task />} /> 
      <Route path="PageAuthenticate" element={<LoginPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
