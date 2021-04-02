import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import ManagePdTable from './ManagePdTable/ManagePdTable';
const ManageProduct = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/product')
            .then(res => res.json())
            .then(data => setEvents(data))
    })
    return (
        <div className="row">
        <div className="col-md-2"><button className="btn"><Link to="/admin/manageProduct">Manage product</Link></button><button className="btn"><Link to="/admin/addProduct">Add product</Link></button></div>
        <div className="col-md-10 mt-5">
        {events.map(product => <ManagePdTable product={product}></ManagePdTable> )}
        </div>
    </div>
    );
};

export default ManageProduct;