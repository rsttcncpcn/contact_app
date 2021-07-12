import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setContactList } from '../action'
import ToggleEditContactButton from './ToggleEditContactButton';
import Axios from 'axios'
import { Link } from 'react-router-dom'

class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = {
           selectedData: {name: '', phone: ''},
           isEdit: false
        };
    }

    componentDidMount(){
        Axios.get("https://contact-app-f395a-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json").then(res => {

            let testData = [];

            if(res.data !== null){
                Object.keys(res.data).map((key) => {
                    
                    testData.push({
                        id: key,
                        name: res.data[key].name,
                        email: res.data[key].email,
                        phone: res.data[key].phone,
                    })
                });
            }

            this.props.setContactList(testData)
            
        })
    }

    handleRemoveClick = event => {
        const contactId = event.target.dataset.contactId;
        this.props.removeContact(contactId);
    };

    render() {
        const { contacts } = this.props;

        return (
            <React.Fragment>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { contacts.data.map(contact => {
                        return (
                            <tr key={ contact.id }>
                                <td>{ contact.id }</td>
                                <td>{ contact.name }</td>
                                <td>{ contact.email }</td>
                                <td>{ contact.phone }</td>
                                <td>
                                    <Link to={`/Contact/${contact.id}`}>
                                        <button type="button" className="btn btn-success btn-sm">View</button>
                                    </Link>
                                    <ToggleEditContactButton 
                                        contact={ contact }
                                        updateContact={ this.props.updateContact }
                                    />
                                    <button 
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={ this.handleRemoveClick }
                                        data-contact-id={ contact.id }
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </React.Fragment>
        );

    }
}

export default connect(

    state => ({
        contacts: state.contacts
    }),

    dispatch => ({
        removeContact: (removedContactId) =>
            dispatch({
                type: 'REMOVE_CONTACT',
                removedContactId
            }),
        setContactList: data => dispatch(setContactList(data))
    })
)(ContactList);