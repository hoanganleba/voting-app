import {NextPage} from "next";
import {useRouter} from "next/router";
import Head from "next/head";
import LoadingPollCard from "../../components/LoadingPollCard";
import PollCard from "../../components/PollCard";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string, pollID: string) =>
    axios.get(url, {params: {pollID}}).then((res) => res.data);

const Share: NextPage = () => {
    const router = useRouter();
    const {pollID} = router.query;
    const {data, error} = useSWR(["/api/share", pollID], fetcher);

    return <>
        <Head>
            <title>Share - Voting App</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        {error ? (
            <div>Failed to load: {error.response.data.message}</div>
        ) : (
            <div>
                {!data && !error ? <LoadingPollCard/> : ""}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {data &&
                    data.map((item: any, index: any) => (
                        <PollCard
                            _id={item._id}
                            key={index}
                            title={item.title}
                            author={item.author}
                            options={item.options}
                        />
                    ))}
                </div>
            </div>
        )}
    </>
};

export default Share;
