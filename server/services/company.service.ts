// types
import { Company } from "../schema/types/company";
import { User } from "../schema/types/user";

// helpers
import fetchJson from "./helpers/json/fetchJSON";
import deleteJSON from "./helpers/json/deleteJSON";

// grab or define base url
const BASE_URL = process.env.USER_SERVICE_URL ?? "http://localhost:3001";

// services
export async function getCompanyById(id: string): Promise<Company | undefined> {
  return fetchJson<Company | undefined>(`${BASE_URL}/companies/${id}`);
}

export async function deleteCompanyById(id: string): Promise<void> {
  await deleteJSON(`${BASE_URL}/companies/${id}`);
}

export async function getUsersForCompany(
  companyId: string,
): Promise<User[] | undefined> {
  return fetchJson<User[] | undefined>(
    `${BASE_URL}/companies/${companyId}/users`,
  );
}

export async function getCompanies(): Promise<Company[] | undefined> {
  return fetchJson<Company[] | undefined>(`${BASE_URL}/companies`);
}
