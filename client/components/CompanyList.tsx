// dependencies
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

// types
import { Company } from "../../server/schema/types/company";

// queries and mutations
const GET_COMPANIES = gql`
  query {
    companies {
      id
      name
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: String!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

function CompanyList() {
  const { loading, error, data } = useQuery<{ companies: Company[] }>(
    GET_COMPANIES,
  );

  const [deleteCompany] = useMutation(DELETE_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Company List</h2>
      <ul>
        {data?.companies.map((company) => (
          <li key={company.id}>
            {company.name}
            <button
              onClick={() => deleteCompany({ variables: { id: company.id } })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
