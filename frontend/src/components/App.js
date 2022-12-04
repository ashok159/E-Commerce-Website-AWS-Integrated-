import '../styles/App.css';
import SearchBar from './search';

function App() {
  return (
    <div className="Website">
      <header className="Header">
        <a href="/">nozama</a>
        <SearchBar></SearchBar>
      </header>
      <main>
        list products
      </main>
    </div>   
  );
}

export default App;
