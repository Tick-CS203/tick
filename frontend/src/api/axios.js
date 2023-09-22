import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://service-alb-1596181544.ap-southeast-1.elb.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});
