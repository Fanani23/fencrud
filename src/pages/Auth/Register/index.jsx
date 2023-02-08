import React, { useState } from "react";
import assets from "../../../assets";
import {
  MdPerson,
  MdPersonOutline,
  MdOutlineLock,
  MdMailOutline,
  MdPhone,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../configs/redux/actions/Register";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(phone);
    let data = {
      name,
      username,
      email,
      password,
      phone,
    };
    dispatch(registerUser(data, navigate));
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-orange-300 py-5 overflow-y-auto">
        <div className="max-w-sm flex flex-col mx-2">
          <img
            className="mt-20"
            src={assets.logoSplash}
            alt="Kato Hair Design"
          />
          <div className="bg-white rounded-lg flex flex-col mt-5 items-center py-10">
            <h1 className="text-orange-400 font-semibold text-2xl mb-10 font-noto-sans">
              REGISTER
            </h1>
            <form onSubmit={handleRegister} className="flex flex-col">
              <div className="relative w-full mb-6">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name" className="absolute top-3.5 left-3.5">
                  <MdPerson className="text-xl text-primary-100" />
                </label>
              </div>
              <div className="relative w-full mb-6">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username" className="absolute top-3.5 left-3.5">
                  <MdPersonOutline className="text-xl text-primary-100" />
                </label>
              </div>
              <div className="relative w-full mb-6">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="absolute top-3.5 left-3.5">
                  <MdMailOutline className="text-xl text-primary-100" />
                </label>
              </div>
              <div className="relative w-full mb-6">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password" className="absolute top-3.5 left-3.5">
                  <MdOutlineLock className="text-xl text-primary-100" />
                </label>
              </div>
              <div className="relative w-full mb-6">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone" className="absolute top-3.5 left-3.5">
                  <MdPhone className="text-xl text-primary-100" />
                </label>
              </div>
              <div className="relative w-full mb-6">
                <p
                  type="button"
                  className="text-end text-sm text-orange-400"
                  onClick={() => navigate("/login")}
                >
                  Already have an account?
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-300 outline-none hover:bg-primary-50 focus:bg-primary-50 focus:ring-2 focus:ring-primary-75 active:bg-primary-75 py-3 text-sm font-nunito-sans font-bold rounded-lg text-black"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
