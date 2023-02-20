import axios, { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import { GetStaticProps } from "next";
import { serializeResponse } from "../lib/serializeResponse";
// define UserResponse for type-safety
type User = {
  id: string;
  firstName: string;
  age: number;
};

interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

const UsersPage = () => {
  //useAxios returns a 2nd element to refetch the array
  const [{ data, loading, error }, refetch] = useAxios<UserResponse>({
    baseURL: "https://dummyjson.com",
    url: "/users?skip=0&limit=5&select=firstName,age",
  });

  return (
    <div>
      <h1>Users Page</h1>
      <button onClick={() => refetch()}>Load Users</button>
      {loading && <p>Loading...</p>}
      {!!error && <p>{error.message}</p>}
      {!!data && <pre>{JSON.stringify(data, null, 4)}</pre>}
    </div>
  );
};
export default UsersPage;

export const getServerSideProps: GetStaticProps = async () => {
  // axios config, must be exactly the same as the one used in useAxios hook so that it creates the same key.
  const config: AxiosRequestConfig = {
    baseURL: "https://dummyjson.com",
    url: "/users?skip=0&limit=5&select=firstName,age",
  };
  // execute the http request
  const response = await axios(config);

  // serialize the response
  return {
    props: {
      __CACHE__: [serializeResponse(config, response)],
    },
  };
};
