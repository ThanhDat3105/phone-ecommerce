import { userLogin } from "@/interface/user";
import axios from "axios";

const url = "https://be-phone-eu7f.onrender.com/auth/login";

const loginApi = async (data: userLogin) => {
  const response = await axios.post(url, data);
  return response.data.content;
};

export { loginApi };
