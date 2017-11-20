import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/courses" activeClassName="active">Courses</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

