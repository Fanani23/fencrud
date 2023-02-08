import React, { useState, useEffect } from "react";
import { MdImage } from "react-icons/md";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Profile = () => {
  const [inputPhoto, setInputPhoto] = useState();

  const [nameEdit, setNameEdit] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [photoEdit, setPhotoEdit] = useState("");

  const fileChangeHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    console.log(file);
    setPhotoEdit(e.target.files[0]);
    reader.addEventListener("load", () => {
      setInputPhoto(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    console.log(file.type);
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      Swal.fire("Success", "File upload success", "success");
    } else {
      Swal.fire(
        "Warning",
        "File doesn't support, clear photo and upload again with file type jpg or png",
        "error"
      );
    }
    if (file.size > 100000) {
      Swal.fire(
        "Warning",
        "File too big, clear photo and upload again with file size maximum 100kb",
        "error"
      );
    }
  };

  const token = localStorage.getItem("token");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchEditProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/users/profile`,
        auth
      );
      setNameEdit(data.data.name);
      setUsernameEdit(data.data.username);
      setEmailEdit(data.data.email);
      setPhoneEdit(data.data.phone);
      setPhotoEdit(data.data.photo);
    } catch (err) {
      console.log("Fetch profile data error", err);
    }
  };

  useEffect(() => {
    fetchEditProfile();
  }, []);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameEdit);
    formData.append("username", usernameEdit);
    formData.append("phone", phoneEdit);
    formData.append("photo", photoEdit);
    try {
      axios.put(
        `${process.env.REACT_APP_API_KEY}/users/profile`,
        formData,
        auth
      );
      Swal.fire(
        "Success",
        "Editing profile data success, if data didn't match you must refresh your browser",
        "success"
      );
    } catch (err) {
      Swal.fire(
        "Warning",
        "Editing data failed, check your input value again",
        "error"
      );
    }
  };

  return (
    <div className="w-6/12 mx-auto flex flex-col h-full overflow-auto scrollbar-shown">
      <Navbar className="bg-orange-400" />
      <div className="bg-white w-full mt-24 p-5 rounded-lg overflow-hidden flex h-full flex-col">
        <form autoComplete="off" noValidate onSubmit={handleEditProfile}>
          <div className="mt-2 border-t-2">
            <div className="text-sm p-6 text-gray-500">
              <div className="flex flex-row items-center mb-2">
                <label htmlFor="name" className="font-semibold w-28">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                  defaultValue={nameEdit}
                  onChange={(e) => setNameEdit(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center mb-2">
                <label htmlFor="username" className="font-semibold w-28">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                  defaultValue={usernameEdit}
                  onChange={(e) => setUsernameEdit(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center mb-2">
                <label htmlFor="email" className="font-semibold w-28">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                  defaultValue={emailEdit}
                />
              </div>
              <div className="flex flex-row items-center mb-2">
                <label htmlFor="phone" className="font-semibold w-28">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                  defaultValue={phoneEdit}
                  onChange={(e) => setPhoneEdit(e.target.value)}
                />
              </div>
              <div className="flex flex-row w-full">
                <div className="basis-1/3 pr-1">
                  <label htmlFor="photo" className="font-semibold">
                    Photo
                  </label>
                </div>
                <div className="basis-1/3 px-1 flex flex-col">
                  <label
                    htmlFor="photo"
                    className="rounded-lg border-dashed border-2 h-[125px] w-[125px] border-gray-200 p-2 mb-3 cursor-pointer"
                  >
                    <input
                      type="file"
                      inputProps={{
                        accept: "image/png, image/jpg, image/jpeg",
                      }}
                      name="photo"
                      id="photo"
                      className="hidden"
                      onChange={fileChangeHandler}
                    />
                    {!photoEdit ? (
                      <div className="flex flex-col justify-center items-center h-full">
                        <MdImage className="text-gray-200 text-6xl" />
                        <span className="text-gray-400">Upload here...</span>
                      </div>
                    ) : (
                      <img
                        src={inputPhoto ? inputPhoto : photoEdit}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    )}
                  </label>
                </div>
                <div className="basis-1/3 pl-1">
                  <button
                    disabled={!photoEdit}
                    className={`w-full py-2 rounded-lg ${
                      !photoEdit ? "bg-red-100 " : "bg-red-300 text-white"
                    }`}
                    onClick={() => setPhotoEdit("")}
                  >
                    Clear Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 px-6 pb-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm w-full font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
