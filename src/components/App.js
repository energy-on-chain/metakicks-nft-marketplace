// Import React Components
import { Link } from "react-router-dom";

// Import App Components
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";


function App() {
  return (
      <div>
        <Header/>
        <HomePage/>
        <Footer/>
      </div>
  );
}

export default App;
