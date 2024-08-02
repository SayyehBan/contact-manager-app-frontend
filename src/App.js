import './App.css';
import Contacts from './components/contact/Contacts';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Contacts />
    </div>
  );
}

export default App;
