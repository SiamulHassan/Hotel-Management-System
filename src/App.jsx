import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Cabins from "./pages/Cabins";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<NewUsers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;