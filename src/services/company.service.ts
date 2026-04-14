import { Company } from "../schema/types/company";
import { User } from "../schema/types/user";
import fetchJson from "./helpers/json/fetchJSON";

const BASE_URL = process.env.USER_SERVICE_URL ?? "http://localhost:3001";

export async function getCompanyById(id: string): Promise<Company | undefined> {
  return fetchJson<Company | undefined>(`${BASE_URL}/companies/${id}`);
}

export async function getUsersForCompany(
  companyId: string,
): Promise<User[] | undefined> {
  return fetchJson<User[] | undefined>(
    `${BASE_URL}/companies/${companyId}/users`,
  );
}
