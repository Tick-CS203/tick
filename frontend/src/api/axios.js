import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://service-alb-832968326.ap-southeast-1.elb.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});
