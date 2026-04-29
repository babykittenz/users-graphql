// // dependency imports
// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";

// // types
// import { Company } from "../../server/schema/types/company";

// const GET_COMPANIES = gql`
//   query {
//     companies {
//       id
//       name
//     }
//   }
// `;

// function CompanyList() {
//   const { loading, error, data } = useQuery<{ companies: Company[] }>(
//     GET_COMPANIES,
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h2>Company List</h2>
//       <ul>
//         {data?.companies.map((company) => (
//           <li key={company.id}>{company.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CompanyList;
