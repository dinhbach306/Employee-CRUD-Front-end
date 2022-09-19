import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailID: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.fetchData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update employee</h1>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label htmlFor="" className="block text-gray-600 text-sm font-normal">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label htmlFor="" className="block text-gray-600 text-sm font-normal">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label htmlFor="" className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="text"
            name="emailID"
            value={employee.emailID}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          />
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateEmployee}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-2"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/employeeList")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-800 py-2 px-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
