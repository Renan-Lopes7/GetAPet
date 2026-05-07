import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/layouts/Navbar';
import Container from "./components/layouts/Container"
import Message from './components/layouts/Message';
//pages
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/pet/myPets';
import AddPet from './components/pages/pet/AddPet';
import EditPet from './components/pages/pet/EditPet';
import PetDetails from './components/pages/pet/PetDetails';
import Myadoptions from './components/pages/pet/MyAdoptions';

//Context
import { UserProvider } from './context/UserContext';





function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/pets/mypets' element={<MyPets />} />
            <Route path='/pet/add' element={<AddPet />} />
            <Route path='/pet/edit/:id' element={<EditPet />} />
            <Route path='/pet/myadoptions' element={<Myadoptions />} />
            <Route path='/pet/:id' element={<PetDetails />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  );
}

export default App;
