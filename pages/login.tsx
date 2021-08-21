import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../utils/AuthContext";

const Login: NextPage = () => {
  const router = useRouter();
  const { setAuthContext } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      setProcessing(false);
      setAuthContext(response.data.username);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userID", response.data.userID);
      alert(response.data.message);
      await router.push("/");
    } catch (e) {
      setErrorMessage(e.response.data.message);
      setProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Voting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form className="shadow-lg rounded max-w-md justify-between mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold mb-4">Login</h3>
        <div
          className={
            !errorMessage
              ? "hidden"
              : "" + "text-red-900 bg-red-100 p-3 font-medium rounded my-4"
          }
        >
          {errorMessage}
        </div>
        <label>
          <span className="block mb-2 text-sm">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="block w-full border border-gray-300 py-1 px-2 rounded"
            id="username"
            name="username"
          />
        </label>
        <label>
          <span className="block my-2 text-sm">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block w-full border border-gray-300 py-1 px-2 rounded"
            id="password"
            name="password"
          />
        </label>
        <button
          onClick={submit}
          className="text-sm mt-4 bg-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-2 rounded focus:outline-none font-medium"
        >
          <span className={!processing ? "hidden" : ""}>Processing...</span>
          <span className={processing ? "hidden" : ""}>Login</span>
        </button>
      </form>
    </>
  );
};

export default Login;
