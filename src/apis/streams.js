import axios from "axios";
import { headers } from "./headers";

export default axios.create({
  baseURL: "https://api.jsonbin.io/v3",
  headers: headers,
});
