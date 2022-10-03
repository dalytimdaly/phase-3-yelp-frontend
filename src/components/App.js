import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import BusinessDetails from './BusinessDetails';
import Header from './Header';
import LoginSignup from './LoginSignup';
import CreateReview from './CreateReview';
import SearchResults from './SearchResults';
import StarRating from './StarRating';

function App() {
  const [sessionCookie, setSessionCookie] = useState(JSON.parse(localStorage.getItem("sessionCookie")))
  useEffect(() => { localStorage.setItem("sessionCookie", JSON.stringify(sessionCookie));
  }, [sessionCookie]);
  
  const isLoggedIn = sessionCookie !== null

  const [reviews, setReviews] = useState([])
  const [ searchResults, setSearchResults ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/")
    .then((response) => response.json())
    .then((data) => setReviews(data));
}, []);

function addReview(newReview) {
    setReviews([...reviews, newReview])
}

function handleSearch(data) {
  setSearchResults(data);
}

  return (
    <div className="App col">
      <Header handleSearch={handleSearch} isLoggedIn={isLoggedIn} logOut={()=>{setSessionCookie(null)}}/>
      <Routes>
        <Route path="/" element={<div/>}/>
        <Route path="/login" element={<LoginSignup setSessionCookie={setSessionCookie}/>}/>
        <Route path="/businesses" element={<div/>}/>
        <Route path="/review" element={<CreateReview  addReview={addReview} />}/>
        <Route path="/search" element={<SearchResults searchResults={searchResults}/>} />
        <Route path="/business/:id" element={<BusinessDetails />} />
      </Routes>
    </div>
  );
}

export default App;
