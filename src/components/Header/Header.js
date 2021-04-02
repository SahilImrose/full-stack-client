import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <section>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Purnima Saree</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <span class="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"><li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin/addProduct">Admin</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link btn btn-outline-success bg-gradient" to="/login">{loggedInUser.isSignIn === true ? loggedInUser.name : <Link style={{textDecoration:'none'}} to="/login">Login</Link> }</Link>
                            </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;