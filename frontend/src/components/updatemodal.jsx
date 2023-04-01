import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./updatemodal.css";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
const UpdateModal = (props) => {
    const [data, setData] = useState({ name: props.name, email: props.email, phone: props.phone, website: props.website });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    //update user
    const updateUser = async () => {
        //API call
        const response = await fetch(`http://localhost:5000/api/user/${props.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        // logic to edit

        const newuser = props.user;
        for (let i = 0; i < newuser.length; i++) {
            const element = newuser[i];
            if (element._id === props.id) {
                newuser[i].name = data.name;
                newuser[i].email = data.email;
                newuser[i].phone = data.phone;
                newuser[i].website = data.website;
                break;
            }
        }
        props.setUser(newuser);
        props.getData();
    };

    const handleClick = (e) => {
        e.preventDefault();
        updateUser();
        props.onHide();
    }

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 className='modal-heading'>Basic Modal</h3><span onClick={props.onHide}><RxCross1 size={17} /></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <ul className="list-group modal-list-ul">
                        <li className="list-group-item modal-list"><label htmlFor="modal-name" className="form-label"><span style={{ color: "red" }}>* </span>Name:&nbsp;</label> <input type="text" className="form-control" id="modal-name" name="name" value={data.name} onChange={onChange} placeholder={data.name} />
                        </li>
                        <li className="list-group-item modal-list"><label htmlFor="modal-email" className="form-label"><span style={{ color: "red" }}>* </span>Email:&nbsp;</label> <input type="email" className="form-control" id="modal-email" name="email" value={data.email} onChange={onChange} placeholder={data.email} />
                        </li>
                        <li className="list-group-item modal-list"><label htmlFor="modal-phone" className="form-label"><span style={{ color: "red" }}>* </span>Phone:&nbsp;</label> <input type="text" className="form-control" id="modal-phone" name="phone" value={data.phone} onChange={onChange} placeholder={data.phone} />
                        </li>
                        <li className="list-group-item modal-list"><label htmlFor="modal-Website" className="form-label"><span style={{ color: "red" }}>* </span>Website:&nbsp;</label> <input type="text" className="form-control" id="modal-Website" name="website" value={data.website} onChange={onChange} placeholder={data.website} />
                        </li>
                    </ul>
                </form>
            </Modal.Body>
            <Modal.Footer className='modal-footer-a'>
                <Button className="modal-button-1" onClick={props.onHide}>Cancel</Button>
                <Button className="modal-button-2" onClick={handleClick} >OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateModal;