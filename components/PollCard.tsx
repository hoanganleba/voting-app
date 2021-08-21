import { FC, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Pie } from "react-chartjs-2";

interface PollCardProps {
  title: string;
  author: string;
  options: Array<any>;
}

const PollCard: FC<PollCardProps> = (props) => {
  const [selected, setSelected] = useState(props.options[0]);

  return (
    <div className="shadow-lg rounded p-6">
      <h5 className="text-xl font-semibold mb-1">{props.title}</h5>
      <div className="text-xs mb-6">
        Created by: <strong className="text-blue-500">{props.author}</strong>
      </div>
      <label htmlFor="options">
        <span className="block text-sm">Options</span>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded border border-gray-300 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded border border-gray-300 max-h-60 focus:outline-none sm:text-sm">
                {props.options.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      } cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            } absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </label>
      <div className="w-full mt-10">
        <Pie
          data={{
            labels: props.options && props.options.map((item) => item.name),
            datasets: [
              {
                backgroundColor: [
                  "#F87171",
                  "#FBBF24",
                  "#34D399",
                  "#60A5FA",
                  "#A78BFA",
                ],
                hoverBackgroundColor: [
                  "#EF4444",
                  "#F59E0B",
                  "#10B981",
                  "#3B82F6",
                  "#8B5CF6",
                ],
                data:
                  props.options && props.options.map((item) => item.numOfVote),
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            animation: false,
          }}
        />
      </div>
    </div>
  );
};

export default PollCard;
