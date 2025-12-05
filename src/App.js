import './App.css';
import IndicatorPage from './components/indicator/IndicatorPage.jsx';
// import Kospi200 from './components/Kospi200.jsx';
import Kospi200 from './components/kospi200/Kospi200.jsx';

function App() {
  return (
    <div className="App">
      <IndicatorPage />
      <div>
        <Kospi200 />
      </div>
    </div>
  );
}

export default App;
