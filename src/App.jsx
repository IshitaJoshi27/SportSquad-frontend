import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterTeam from './pages/RegisterTeam';
import JoinedEvents from './pages/JoinedEvents';
import Events from './pages/Events';
import HostedEvents from './pages/HostedEvents';
import EventDetail from './pages/EventDetail';
import AdminEventControl from './pages/AdminEventControl';
import { UserData } from './context/UserContext';
import { Loading } from './components/Loading';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CreateEvent from './pages/CreateEvent';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { loading, isAuth } = UserData();
  
  return (
    <>
      <Toaster position="bottom-right" />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
          <Loading />
        </div>
      ) : (
        <BrowserRouter>
          <div className="flex flex-col min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
            {isAuth && <Navbar />}
            <div className={`flex flex-col flex-1 ${isAuth ? 'mt-16' : ''}`}>
              {isAuth && <Sidebar />}
              <main className={`flex-1 transition-all w-full`}>
                <div className={isAuth ? "max-w-6xl mx-auto p-4 sm:p-6" : ""}>
                  <Routes>
                    {/* Public routes */}
                    <Route path='/' element={isAuth ? <DashBoard /> : <Home />} />
                    <Route path='/login' element={isAuth ? <DashBoard /> : <Login />} />
                    <Route path='/register' element={isAuth ? <DashBoard /> : <Register />} />

                    {/* Protected routes */}
                    <Route path='/createevent' element={isAuth ? <CreateEvent /> : <Login />} />
                    <Route path='/register-team/:id' element={isAuth ? <RegisterTeam /> : <Login />} />
                    <Route path='/joined' element={isAuth ? <JoinedEvents /> : <Login />} />
                    <Route path='/hosted' element={isAuth ? <HostedEvents /> : <Login />} />
                    <Route path='/events' element={isAuth ? <Events /> : <Login />} />
                    <Route path='/events/:id' element={isAuth ? <EventDetail /> : <Login />} />
                    <Route path='/admin/events/:id' element={isAuth ? <AdminEventControl /> : <Login />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;