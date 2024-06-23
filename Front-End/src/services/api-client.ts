import axios, { CanceledError, AxiosError } from "axios";

export { CanceledError, AxiosError };

const baseURL1 = window.location.hostname;

const prefix = "http://";
const suffix = ":3010";

const baseURL = prefix + baseURL1 + suffix;

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;
