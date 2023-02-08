import axios from "axios";
import Swal from "sweetalert2";

export const loginUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/users/login`,
      data
    );
    const user = res.data.data;
    localStorage.setItem("token", user.token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("username", user.username);
    localStorage.setItem("phone", user.phone);
    localStorage.setItem("photo", user.photo);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    Swal.fire("Success", "Login user success", "success");
    navigate("/main");
  } catch (err) {
    console.log("Login user error", err);
    Swal.fire("Warning", "Login user failed", "error");
  }
};
