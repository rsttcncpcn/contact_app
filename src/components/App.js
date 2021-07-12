import React, { Component } from 'react';
import '../css/style.css';
import { ToastContainer, toast } from "react-toastify";
import ContactList from './ContactList';
import AddContactForm from "./AddContactForm";

class App extends Component {

    render() {
        return (

            <React.Fragment>
                <section className="container">
                    <ToastContainer />

                    <AddContactForm />
                    
                    <ContactList />
                </section>
            </React.Fragment>
        );
    }
}

export default App;