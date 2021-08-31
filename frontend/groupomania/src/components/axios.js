import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.baseURL = "http://localhost:5000";

axios.defaults.headers.common["Authorization"] = "Bearer" + localStorage.getItem("token");
