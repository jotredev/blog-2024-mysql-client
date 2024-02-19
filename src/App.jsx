import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
// Pages
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import CreatePostPage from "./pages/CreatePost";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFount";
import PostDetailsPage from "./pages/PostDetails";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="new" element={<CreatePostPage />} />
          <Route path="posts/:postId" element={<PostDetailsPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
