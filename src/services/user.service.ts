import { User } from "../schema/types/user";
import fetchJson from "./helpers/fetchJSON";

const BASE_URL = process.env.USER_SERVICE_URL ?? "http://localhost:3001";

export async function getUserById(id: string): Promise<User | undefined> {
  return fetchJson<User | undefined>(`${BASE_URL}/users/${id}`);
}
