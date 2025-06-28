import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

const EmployeeManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null)
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            if (data) {
                setEmployeesData(data);
            }
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])

    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    }
    return (
        <div className="container">
            <div className="header">
                <h1>Employee Management System</h1>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success"
                    onClick={() => setShowModal(true)}>Add Employee</button>
                <div className="search-bar">
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search Employees..."
                        className="form-control"
                    />
                </div>
            </div>
            <EmployeeTable
                employees={employeesData.employees}
                pagination={employeesData.pagination}
                fetchEmployees={fetchEmployees}
                handleUpdateEmployee={handleUpdateEmployee}
            />

            <AddEmployee
                fetchEmployees={fetchEmployees}
                showModal={showModal}
                setShowModal={setShowModal}
                employeeObj={employeeObj}
            />
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployeeManager;
