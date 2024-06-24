import axios, { CanceledError, AxiosError } from "axios";

export { CanceledError, AxiosError };

const baseURL1 = window.location.hostname;

const prefix = "http://";

const baseURL = prefix + baseURL1;

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;
