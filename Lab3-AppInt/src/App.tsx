import { Home, LoginPage, Error404, Task } from "./pages/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./components/index";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TaskContextProvider } from "./context/TaskContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas públicas de autenticación */}
        <Route path="PageAuthenticate" element={<LoginPage />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Rutas protegidas */}
        <Route
          path="/TaskPage"
          element={
            <ProtectedRoute>
              <TaskContextProvider>
                <Task />
              </TaskContextProvider>
            </ProtectedRoute>
          }
        />
        {/* Ruta 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProvider>

  );
}

export default App;
