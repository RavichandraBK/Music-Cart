import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const loginUrl = `${backendUrl}/api/auth/login`;
const registerUrl = `${backendUrl}/api/auth/register`;

const LoginUser = async (loginDetails) => {
  try {
    const userDetails = {
      ...loginDetails,
    };

    const response = await axios.post(loginUrl, userDetails);
    return response;
  } catch (err) {
    console.log(err, "Network not found");
  }
};

const RegisterUser = async (newUser) => {
  try {
    const newUserDetails = {
      ...newUser,
    };
    const response = await axios.post(registerUrl, newUserDetails);
    return response;
  } catch (err) {
    console.log(err, "Couldnt Register the user");
  }
};

export { LoginUser, RegisterUser };
