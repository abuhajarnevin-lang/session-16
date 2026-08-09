import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export async function getTasks() {
  const response = await axios.get(`${API_URL}/todos`, {
    params: {
      _limit: 9,
    },
  });

  return response.data;
}