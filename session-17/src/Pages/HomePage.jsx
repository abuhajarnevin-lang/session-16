import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-5">
        <h1 className="display-5 fw-bold">
          React Router Project
        </h1>

        <p className="lead text-secondary">
          Learn routes, layouts, nested pages and protected routes.
        </p>

        <div className="d-flex gap-2 flex-wrap">
          <Link
            to="/login"
            className="btn btn-primary"
          >
            Login
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline-dark"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;