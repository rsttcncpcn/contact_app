import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const initialState = {
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactCategory: ''
};

class AddContactForm extends Component {

    state = initialState;

    handleSubmit = event => {
        event.preventDefault();

        const checkContactEmailExists = this.props.contacts.data.filter((contact) =>
            contact.email === this.state.contactEmail ? contact : null
        );
        const checkContactPhoneExists = this.props.contacts.data.filter((contact) =>
            contact.phone === this.state.contactPhone ? contact : null
        );

        if (!this.state.contactEmail || !this.state.contactName || !this.state.contactPhone) {
            return toast.warning("Please fill in all fields!!");
        }
        if (checkContactEmailExists.length > 0) {
            return toast.error("This email already exists!!");
        }
        if (checkContactPhoneExists.length > 0) {
            return toast.error("This phone number already exists!!")
        }

        this.props.addContact(this.state);
        this.setState(initialState);
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    };

    render() {

        const inputSize = 30;
        const { contactName, contactPhone, contactEmail, contactCategory } = this.state;
        return (
            <React.Fragment>
                <strong>Contact Form:</strong>
                <form onSubmit={ this.handleSubmit }>
                    <div className="mb-2">
                        <label htmlFor="contactName" className="form-label">Name</label>
                        <input
                            className="form-control"
                            name='contactName'
                            type="text"
                            id='contactName'
                            size={ inputSize }
                            placeholder='Enter name'
                            value={ contactName }
                            onChange = { this.handleChange }
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="contactPhone" className="form-label">Phone</label>
                        <input
                            className="form-control"
                            name='contactPhone'
                            type="number"
                            id='contactPhone'
                            size={ inputSize }
                            placeholder='Enter phone number'
                            value = { contactPhone }
                            onChange = { this.handleChange }
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor="contactEmail" className="form-label">Email</label>
                        <input
                            className="form-control"
                            name='contactEmail'
                            type="email"
                            id='contactEmail'
                            size={ inputSize }
                            placeholder='Enter email'
                            value = { contactEmail }
                            onChange = { this.handleChange }
                        />
                    </div>
                    <button className="btn btn-primary">Add contact</button>
                </form>
            </React.Fragment>
        );
    }
}

export default connect(

    state => ({
        contacts: state.contacts
    }),

    dispatch => ({
        addContact: ({ contactName, contactPhone, contactEmail, contactCategory }) =>
            dispatch({
                type: 'ADD_CONTACT',
                contactName,
                contactPhone,
                contactEmail,
                contactCategory
            })
    })
)(AddContactForm);