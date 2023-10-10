import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from './features/auth/Login';
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />  {/* we start with an index for the whole site */}
        <Route path='login' element={<Login />} />
        
          {/* Here is where we start working with out protected routes*/}
          <Route path='dash' element={<DashLayout />}>
              {/* index for the protected routes... what does index do? */}
            <Route index element={<Welcome />} />

            <Route path="notes">
              <Route index element={<NotesList />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersList />} />
            </Route>
            
          </Route>

      </Route>
    </Routes>
  );
}

export default App;
