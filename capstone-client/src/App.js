import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes as Switch  } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SearchUserProfile from './components/SearchUserProfile';
import { UserContextProvider } from './contexts/user.context';


function App() {
  
  return (
    <div className="App">
      
      <UserContextProvider>
          <Header  />
            <Switch>
              <Route path='/' element={<Login />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile' element={<Profile />} />
              <Route exact path='/profile/:id' element={<SearchUserProfile />} />
            </Switch>   
        </UserContextProvider>
    </div>
  );
}

export default App;
