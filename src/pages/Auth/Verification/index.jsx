import React, { useState } from "react";
import assets from "../../../assets";
import { MdMailOutline, MdOutlineLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verificationAccount } from "../../../configs/redux/actions/Verification";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVerification = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(otp);
    let data = {
      email,
      otp,
    };
    dispatch(verificationAccount(data, navigate));
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-orange-300 py-5 overflow-y-auto">
        <div className="max-w-sm flex flex-col mx-2">
          <img src={assets.logoSplash} alt="Kato Hair Design" />
          <div className="bg-white rounded-lg flex flex-col mt-5 items-center py-10">
            <h1 className="text-orange-400 font-semibold text-2xl mb-10 font-noto-sans">
              VERIFICATION
            </h1>
            <form onSubmit={handleVerification} className="flex flex-col">
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
              <div className="relative w-full mb-10">
                <input
                  className="border border-orange-300 outline-none focus:ring-1 focus:ring-orange-300 text-primary-100 text-sm font-nunito-sans rounded-lg pl-10 pr-4 py-3"
                  type="number"
                  name="otp"
                  id="otp"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <label htmlFor="password" className="absolute top-3.5 left-3.5">
                  <MdOutlineLock className="text-xl text-primary-100" />
                </label>
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

export default Verification;
