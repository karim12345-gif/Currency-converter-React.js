import "./App.css";
import CurrencyRow from './components/CurrencyRow'
import HistoricalData from "./components/historicalData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
       <div className="App">
          {/* react route should be used here  */}
          <HistoricalData/>
          <CurrencyRow />
      
         <Routes>
         <Route exact path="/back" element={<CurrencyRow/>} />
         <Route exact path="/forward" element={<HistoricalData/>} />
         </Routes>
     
    </div>

    </Router>
   
  );
}

export default App;
