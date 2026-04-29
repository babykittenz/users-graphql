// types
import { User } from "../schema/types/user";

// helpers
import fetchJSON from "./helpers/json/fetchJSON";
import postJSON from "./helpers/json/postJSON";
import putJSON from "./helpers/json/putJSON";
import deleteJSON from "./helpers/json/deleteJSON";

// grab or define base url
const BASE_URL = process.env.USER_SERVICE_URL ?? "http://localhost:3001";

// services
export async function getUserById(id: string): Promise<User | undefined> {
  return fetchJSON<User | undefined>(`${BASE_URL}/users/${id}`);
}

export async function add(firstName: string, age: string): Promise<User> {
  return postJSON<User>(`${BASE_URL}/users`, { firstName, age });
}

export async function update(
  id: string,
  firstName?: string,
  age?: number,
  companyId?: string,
): Promise<User | undefined> {
  return putJSON<User>(`${BASE_URL}/users/${id}`, {
    firstName,
    age,
    companyId,
  });
}

export async function deleteById(id: string): Promise<void> {
  return deleteJSON(`${BASE_URL}/users/${id}`);
}
