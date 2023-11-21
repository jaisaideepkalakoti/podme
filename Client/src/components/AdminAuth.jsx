import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminAuth = () => {
  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello, Admin</h1>
            <p className="lead text-center">Choose an option below:</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/admin/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Admin Login
            </NavLink>
            <NavLink
              to="/admin/register"
              className="btn btn-outline-light rounded-pill pb-2 w-50 mt-2"
            >
              Admin Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;