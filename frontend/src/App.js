import Header from './components/header';
import Footer from './components/footer';
import CategoryPosts from './pages/categoryPosts';
import PostDetail from './pages/postDetail';
import PostList from './pages/postList';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<PostList/>}/>
          <Route path='/posts/:id' element={<PostDetail/>}/>
          <Route path='/posts/category/:id' element={<CategoryPosts/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
