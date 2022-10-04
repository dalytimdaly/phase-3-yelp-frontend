import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import BusinessDetails from './BusinessDetails';
import Header from './Header';
import LoginSignup from './LoginSignup';
import CreateReview from './CreateReview';
import SearchResults from './SearchResults';
import Footer from './footer';
import Home from './Home';

function App() {
  const [sessionCookie, setSessionCookie] = useState(JSON.parse(localStorage.getItem("sessionCookie")))
  useEffect(() => { localStorage.setItem("sessionCookie", JSON.stringify(sessionCookie));
  }, [sessionCookie]);

  const isLoggedIn = sessionCookie !== null

  const [reviews, setReviews] = useState([])
  const [bizName, setBizName] = useState("")
  const [searchResults, setSearchResults ] = useState([]);
  const [bizId, setBizId] = useState(0)


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
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginSignup setSessionCookie={setSessionCookie} isLogin={true}/>}/>
        <Route path="/signup" element={<LoginSignup setSessionCookie={setSessionCookie} isLogin={false}/>}/>
        <Route path="/businesses" element={<div/>}/>

        <Route path="/review" element={<CreateReview addReview={addReview} bizId={bizId} bizName={bizName}/>}/>
        <Route path="/search/:term" element={<SearchResults searchResults={searchResults}/>} />
        <Route path="/business/:id" element={<BusinessDetails setBizId={setBizId} setBizName={setBizName} bizName={setBizName}/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
