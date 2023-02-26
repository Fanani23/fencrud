import axios from "axios";
import Swal from "sweetalert2";

export const registerUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/users/register`,
      data
    );
    const user = res.data.data;
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    Swal.fire(
      "Success",
      "Register user success, we already send OTP to your email. Check your email, and verification your account",
      "success"
    );
    navigate("/verification");
  } catch (err) {
    console.log("Register user error", err);
    Swal.fire("Warning", "Register user failed", "error");
  }
};
