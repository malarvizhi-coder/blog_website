import PostList from './pages/postList';
import Header from './components/header';
import Footer from './components/footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PostDetail from './pages/postDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<PostList/>}/>
          <Route path='/posts/:id' element={<PostDetail/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
