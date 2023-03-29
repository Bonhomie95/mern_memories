import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={!user ? <Auth /> : <Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/creators/:name" exact element={<CreatorOrTag />} />
          <Route path="/tags/:name" exact element={<CreatorOrTag />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
