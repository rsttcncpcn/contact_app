import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios'

const ViewContact = () => {

    let { id } = useParams();

    const [contact, setContact] = useState(0);

    useEffect(() => {

        let addContactConfig = {
            method: 'get',
            url: `https://contact-app-f395a-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`,
            headers: { 
                'Content-Type': 'application/json'
            }
        };

        Axios(addContactConfig)
            .then((response) => {
                setContact(response.data)
                return response.data
                // console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    // let contact = fetchUserHandler(id);

    return (
    
        <div className="container mt-5">

            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">ID: {id}</li>
                    <li className="list-group-item">Name: {contact.name}</li>
                    <li className="list-group-item">Email:{contact.email}</li>
                    <li className="list-group-item">Phone: {contact.phone}</li>
                </ul>
                <div className="card-body">
                        <Link to={"/"}>
                            <button type="button" className="btn btn-success btn-sm">Go Back</button>
                        </Link>
                </div>
            </div>

        </div>
    
    );
}

export default ViewContact;