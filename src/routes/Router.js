import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAlert } from '../contexts/AlertProvider';
import Alert from '../components/alert/Alert';
import AlertIcon from '../components/alert/AlertIcon';
import Home from '../containers/Home';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import NavBar from '../components/navbar/NavBar';
import Detail from '../containers/Detail';
import Profile from '../containers/Profile';

const Router = () => {
  const { alertVal } = useAlert();

  return (
    <BrowserRouter>
      <NavBar />
      {alertVal.isOn && (
        <Alert status={alertVal.status}>
          <AlertIcon />
          {alertVal.message}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
