import {SET_CONTACT_LIST} from './constant'
import Axios from 'axios'

const initialState = {
    data: [
        // {
        //     id: '1',
        //     name: 'Ann Arrante',
        //     phone: '234 324 345',
        //     email: 'anna@aol.com',
        // },
        // {
        //     id: '2',
        //     name: 'Monica Pascale',
        //     phone: '454 324 345',
        //     email: 'monicap@gmail.com',
        // },
        // {
        //     id: '3',
        //     name: 'Jessica Hudson',
        //     phone: '454 333 345',
        //     email: 'jessica333@gmail.com',
        // }
    ]
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case SET_CONTACT_LIST:
            return {
                ...state,
                data: action.payload,
            };
        case 'ADD_CONTACT':

            let addContactData = JSON.stringify({
                "name": action.contactName,
                "email": action.contactEmail,
                "phone": action.contactPhone
            });
            
            let addContactConfig = {
                method: 'post',
                url: 'https://contact-app-f395a-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : addContactData
            };

            let addContactId = ""

            Axios(addContactConfig)
                .then((response) => {
                    addContactId = response.data.name
                    return response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
              
            return {
                ...state,
                    data: state.data.concat({
                        id: addContactId,
                        name: action.contactName,
                        phone: action.contactPhone,
                        email: action.contactEmail,
                        categories: action.contactCategory
                    })
            };

        case 'REMOVE_CONTACT':

            // let id = state.data.filter(contact => {
            //     console.log(action.removedContactId)
            // })

            // console.log(action.removedContactId)

            Axios.delete(`https://contact-app-f395a-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${action.removedContactId}.json`).then(res => {
                console.log(res)
            })


            return {
                ...state,
                data: state.data.filter(contact => contact.id !== action.removedContactId)
            };

        case 'UPDATE_CONTACT':

            var editContactData = JSON.stringify({
                "name": action.updatedContact.name,
                "email": action.updatedContact.email,
                "phone": action.updatedContact.phone
            });

            var editContactId = "";

            console.log(editContactData)
            
            var editContactConfig = {
                method: 'put',
                url: `https://contact-app-f395a-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${action.updatedContactId}.json`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : editContactData
            };
            
            Axios(editContactConfig)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    editContactId = JSON.stringify(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            return {
                ...state,
                data: state.data.map(
                    contact =>
                        contact.id !== action.updatedContactId
                            ? contact
                            : {
                                ...contact,
                                ...action.updatedContact
                            }
                )
            };

        default:
            return state
    }
};