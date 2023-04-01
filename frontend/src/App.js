import React, { useState } from "react";
import "./App.css";
import Cards from "./components/cards";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState([]);
  // get user
  const getData = async () => {
    const url = `https://backend-inter.vercel.app/api/user/`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setUser(parsedData.getuser);
    console.log("user---", user);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  //delete user
  const deleteUser = async (id) => {
    const url = `https://backend-inter.vercel.app/api/user/${id}`;
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    let parsedData = await data.json();
    console.log(parsedData);
    const newUser = user.filter((note) => {
      return note._id !== id;
    });
    setUser(newUser);
  };

  return (
    <>
      (
      <div className="con ">
        <div className="row">
          {user?.map((item, index) => {
            return (
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12"
                key={index}
              >
                <Cards
                  setUser={setUser}
                  userinfo={item}
                  deleteUser={deleteUser}
                  user={user}
                  getData={getData}
                />
              </div>
            );
          })}
        </div>
      </div>
      )
    </>
  );
}

export default App;
