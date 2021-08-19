import PollCard from '../components/PollCard'
import {NextPage} from 'next'

const MyPoll: NextPage = () => {
    return (
        <div>
            <div className="block mb-10">
                <h1 className="inline-block font-bold text-2xl">My Poll</h1>
                <button
                    className="inline-block py-2 px-4 ml-6 bg-gray-300 hover:bg-gray-400 rounded font-semibold">Create
                    Poll
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                <PollCard title="Hello"/>
                <PollCard title="Hello"/>
                <PollCard title="Hello"/>
            </div>
        </div>
    );
};

export default MyPoll;
