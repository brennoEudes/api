// Configurações do Axios:

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // parte da url da api q se repete, permitindo q os endereços das REQs sejam + enxutos. obs: O "URL" precisa ser maiúsculo.
});
