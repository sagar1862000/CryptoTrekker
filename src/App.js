import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Coins from './Components/Coins';
import Exchange from './Components/Exchange';
import CoinDetails from './Components/CoinDetails';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Coins" element={<Coins />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/Coin/:id" element={<CoinDetails />} />
        <Route path="/SignIn" element={<SignIn />} /> 
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
