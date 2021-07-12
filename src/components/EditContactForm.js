import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

class EditContactForm extends Component {

    state = {
        contactName: this.props.name,
        contactPhone: this.props.phone,
        contactEmail: this.props.email,
        contactCategory: this.props.categories
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        let contacts = this.props.contacts.data.filter(contact => contact.id !== this.props.contactId)

        console.log(contacts)

        const checkContactEmailExists = contacts.filter((contact) =>
            contact.email === this.state.contactEmail ? contact : null
        );
        const checkContactPhoneExists = contacts.filter((contact) =>
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

        this.props.updateContact(this.props.contactId, {
            ...this.state,
            name: this.state.contactName,
            phone: this.state.contactPhone,
            email: this.state.contactEmail,
            categories: this.state.contactCategory
        })
    };

    renderInput(fieldName) {
        return (
            <div className="mt-3">
                <input
                    className="form-control"
                    name={ fieldName }
                    value={ this.state[fieldName] }
                    onChange={ this.handleChange }
                />
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={ this.handleSubmit }>

                    { this.renderInput('contactName')}
                    { this.renderInput('contactPhone')}
                    { this.renderInput('contactEmail')}

                    <button className="btn btn-primary btn-sm">Update contact</button>
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
        updateContact: (updatedContactId, updatedContact) =>
            dispatch({
                type: 'UPDATE_CONTACT',
                updatedContactId,
                updatedContact
            })
    })
)(EditContactForm);