import axios from "axios";
import Swal from "sweetalert2";

export const verificationAccount = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFICATION_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/users/register/verification`,
      data
    );
    const otp = res.data.data;
    dispatch({ type: "VERIFICATION_SUCCESS", payload: otp });
    Swal.fire(
      "Success",
      "Verification account success, you can login to your account",
      "success"
    );
    navigate("/login");
  } catch (err) {
    console.log("Verification account error", err);
    Swal.fire(
      "Warning",
      "Verification account failed, check your email or OTP code",
      "error"
    );
  }
};
