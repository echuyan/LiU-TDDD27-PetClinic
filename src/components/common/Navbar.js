import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userRole }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Pet Clinic
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {userRole === 'petOwner' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/pets">
                  My Pets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/appointments">
                  Appointments
                </Link>
              </li>
            </>
          )}
          {userRole === 'vet' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/search-pets">
                  Search Pets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/appointments">
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health-records">
                  Health Records
                </Link>
              </li>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-doctors">
                  Manage Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-pets">
                  Manage Pets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-appointments">
                  Manage Appointments
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;