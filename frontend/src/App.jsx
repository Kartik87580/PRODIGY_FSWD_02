import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmployeeManager from './Components/EmployeeManager';
import EmployeeDetails from './Components/EmployeeDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManager />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
