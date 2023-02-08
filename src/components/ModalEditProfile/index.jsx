import { Dialog, Transition } from "@headlessui/react";
import { MdClose, MdImage } from "react-icons/md";
import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const ModalEditProfile = ({
  show,
  close,
  submit,
  idEditValue,
  nameEditValue,
  setNameEditValue,
  usernameEditValue,
  setUsernameEditValue,
  phoneEditValue,
  setPhoneEditValue,
  photoEditValue,
  setPhotoEditValue,
}) => {
  const [inputPhoto, setInputPhoto] = useState(photoEditValue);

  const fileChangeHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    console.log(file);
    setPhotoEditValue(e.target.files[0]);
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

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg text-center font-medium leading-6 text-gray-900 p-8 pb-1"
                  >
                    <h3>Edit Data Profile</h3>
                    <div
                      onClick={close}
                      className="rounded-full p-0.5 top-2 right-2 bg-gray-200 absolute"
                      role="button"
                    >
                      <MdClose className="relative" />
                    </div>
                  </Dialog.Title>
                  <form autoComplete="off" noValidate onSubmit={submit}>
                    <div className="mt-2 border-t-2">
                      <div className="text-sm p-6 text-gray-500">
                        <div className="flex flex-row items-center mb-2">
                          <label htmlFor="id" className="font-semibold w-28">
                            ID
                          </label>
                          <input
                            type="text"
                            name="id"
                            id="id"
                            className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                            defaultValue={idEditValue}
                          />
                        </div>
                        <div className="flex flex-row items-center mb-2">
                          <label htmlFor="name" className="font-semibold w-28">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                            defaultValue={nameEditValue}
                            onChange={(e) => setNameEditValue(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-row items-center mb-2">
                          <label
                            htmlFor="username"
                            className="font-semibold w-28"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            className="border-2 ml-0 grow border-gray-200 rounded-lg px-3 py-2 mb-2"
                            defaultValue={usernameEditValue}
                            onChange={(e) =>
                              setUsernameEditValue(e.target.value)
                            }
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
                            defaultValue={phoneEditValue}
                            onChange={(e) => setPhoneEditValue(e.target.value)}
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
                              {!photoEditValue ? (
                                <div className="flex flex-col justify-center items-center h-full">
                                  <MdImage className="text-gray-200 text-6xl" />
                                  <span className="text-gray-400">
                                    Upload here...
                                  </span>
                                </div>
                              ) : (
                                <img
                                  src={inputPhoto ? inputPhoto : photoEditValue}
                                  alt=""
                                  className="object-cover w-full h-full"
                                />
                              )}
                            </label>
                          </div>
                          <div className="basis-1/3 pl-1">
                            <button
                              disabled={!photoEditValue}
                              className={`w-full py-2 rounded-lg ${
                                !photoEditValue
                                  ? "bg-red-100 "
                                  : "bg-red-300 text-white"
                              }`}
                              onClick={() => setPhotoEditValue("")}
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
                        onClick={close}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalEditProfile;
