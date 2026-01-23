import { Axios } from "axios";

export const getDebridToken = (): string => {
  if (typeof window === "undefined") {
    throw new Error("Debrid token can only be read client-side");
  }
  const token = localStorage.getItem("debrid-key");
  if (!token) throw new Error("Debrid token not found");
  return token;
};

export const createClient = () => {
  const debridToken = getDebridToken();

  const client = new Axios({
    baseURL: "https://api.real-debrid.com/rest/1.0",
    headers: {
      Authorization: `Bearer ${debridToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return client;
};

export const getSettings = async () => {
  const client = createClient();

  return (await client.get("/settings")).data;
};
