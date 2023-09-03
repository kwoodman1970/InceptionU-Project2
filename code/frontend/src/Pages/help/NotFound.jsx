import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>Page not Found!</h2>
      <p>You seemed to have lost your way little one</p>

      <p>
        To find yourself go back to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
}
