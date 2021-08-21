import PollCard from "../components/PollCard";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";
import useSWR from "swr";
import LoadingPollCard from "../components/LoadingPollCard";

const fetcher = (url: string, userID: string) =>
  axios.get(url, { params: { userID } }).then((res) => res.data);

const MyPoll: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<any>([]);
  const [optionName, setOptionName] = useState<string>("");
  const router = useRouter();
  const { authContext } = useContext(AuthContext);
  const userID = process.browser ? localStorage.getItem("userID") : "";
  const { data, error } = useSWR(["/api/poll", userID], fetcher);

  useEffect(() => {
    if (authContext === "") {
      router.push("/");
    }
  }, [authContext, router]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const addNewPoll = async () => {
    const response = await axios.post("/api/poll", {
      title,
      author: localStorage.getItem("userID"),
      options,
    });
    if (response) {
      closeModal();
    }
  };

  const addOptions = () => {
    setOptions((prevState: any) => [
      ...prevState,
      {
        name: optionName,
        numOfVote: 0,
      },
    ]);
    setOptionName("");
  };

  const removeOption = (index: any) => {
    const temp = [...options];
    temp.splice(index, 1);
    setOptions(temp);
  };

  return (
    <>
      <Head>
        <title>My Poll - Voting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="block mb-10">
        <h1 className="inline-block font-semibold text-xl">My Poll</h1>
        <button
          onClick={openModal}
          className="text-sm inline-block py-2 px-4 ml-6 bg-blue-100 hover:bg-blue-200 rounded font-medium"
        >
          Create Poll
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New Poll
                  </Dialog.Title>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Title</span>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      aria-label="title"
                      className="mt-1 px-2 py-1 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium">Options</span>
                    {options.map((item: any, index: any) => (
                      <div
                        className="my-2 border border-gray-300 rounded p-2 flex items-center justify-between"
                        key={index}
                      >
                        <div>{item.name}</div>
                        <button
                          className="text-red-500"
                          onClick={() => removeOption(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="flex mt-1">
                      <input
                        value={optionName}
                        onChange={(e) => setOptionName(e.target.value)}
                        placeholder="Options"
                        aria-label="title"
                        className="px-2 py-1 border border-gray-300 rounded w-full"
                      />
                      <button
                        className="ml-2 text-sm px-4 py-2 bg-blue-100 font-medium text-blue-900 rounded whitespace-nowrap"
                        onClick={addOptions}
                      >
                        Add option
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
                      onClick={addNewPoll}
                    >
                      Add new poll
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      {error ? (
        <div>Failed to load</div>
      ) : (
        <div>
          {!data && !error ? <LoadingPollCard /> : ""}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {data &&
              data.map((item: any, index: any) => (
                <PollCard
                  key={index}
                  title={item.title}
                  author={item.author.username}
                  options={item.options}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyPoll;
