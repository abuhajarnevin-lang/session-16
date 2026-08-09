import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  function handleLogin() {
    onLogin();
    navigate("/dashboard");
  }

  return (
    <section className="container mt-5">
      <div
        className="card border-0 shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body p-4">
          <span className="badge text-bg-warning mb-3">
            Demo Authentication
          </span>

          <h1 className="h2">Login</h1>

          <p className="text-secondary">
            Authentication is simulated today using React state.
          </p>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="student@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            Login to Dashboard
          </button>

          <div className="alert alert-warning mt-4 mb-0">
            This is frontend simulation only.
            Backend will provide real authentication and security later.
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;