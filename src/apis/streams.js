import axios from "axios";

export default axios.create({
  baseURL: "https://api.jsonbin.io/v3",
  headers: {
    "X-Master-Key":
      "$2b$10$dhOjSBkhMiuP.UB3.OSUqeoBKs5VaHFoJwNWMBKYi6Nwmgz3iOrG.",
  },
});
