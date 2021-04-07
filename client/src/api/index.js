// import axios from "axios";

// const auth = axios.create({
//   baseURL: "http://localhost:4000/access",
//   // timeout: 1000,
//   // headers : { "": "" },
// });

// export default auth;
import { CLIENT_ORIGIN } from "../config"
export const registerurl = `${CLIENT_ORIGIN}access/register`;
export const loginurl = `${CLIENT_ORIGIN}/access/login`;
export const confirmationTokenurl = `${CLIENT_ORIGIN}/access/tokenConfirm`