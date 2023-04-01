import React from 'react';
import "./cards.css";
import { SlEnvolope } from "react-icons/sl";
import { AiOutlinePhone } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from 'react';
import UpdateModal from './updatemodal';

const Cards = ({ userinfo, deleteUser, setUser, user, getData }) => {

    const [modalShow, setModalShow] = React.useState(false);
    const [like, setLike] = useState(false);
    const toggleLike = () => {
        if (like === false) {
            setLike(true);
        } else {
            setLike(false);
        }
    }
    return (
        <div>
            <UpdateModal show={modalShow}
                onHide={() => setModalShow(false)} name={userinfo?.name} email={userinfo?.email} phone={userinfo?.phone} website={userinfo?.website} id={userinfo?._id} setUser={setUser} user={user} getData={getData} />

            <div className="card" >
                <div className="img-div">
                    <div className="card-img">
                        <img src={`https://avatars.dicebear.com/v2/avataaars/${userinfo?.username}.svg?options[mood][]=happy`} className="card-img-top" alt="..." /></div>
                </div>
                <div className="card-body">
                    <div className="inner-card">
                        <h5 className="card-title">{userinfo?.name}</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><SlEnvolope size={18} />  &nbsp;{userinfo?.email}</li>
                            <li className="list-group-item"><AiOutlinePhone size={18} />  &nbsp;{userinfo?.phone}</li>
                            <li className="list-group-item"><TbWorld size={18} />  &nbsp;{userinfo?.website}</li>
                        </ul>
                    </div>
                    <li className="bottom__li">
                        <ul className="bottom__item" >
                            <button onClick={toggleLike} style={{ color: "red" }}>{like ? <AiFillHeart size={22} /> : <AiOutlineHeart size={22} />}</button>

                        </ul>
                        <div className="item"></div>
                        <ul className="bottom__item">
                            <button variant="primary" onClick={() => setModalShow(true)} className="btn1"><AiOutlineEdit size={22} /></button>
                        </ul>
                        <div className="item"></div>
                        <ul className="bottom__item ">
                            <button onClick={() => { return deleteUser(userinfo?._id) }} className="btn1"><AiFillDelete size={22} /></button>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Cards
