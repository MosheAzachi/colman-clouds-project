import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe"; // Import the CreateRecipe component
import './styles/App.css'; // Optional: import global styles

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Add Recipe</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
