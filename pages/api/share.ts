import {NextApiRequest, NextApiResponse} from "next";
import {connectDatabase} from "utils/connectDatabase";
import Poll from "models/poll.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    switch (req.method) {
        case "GET":
            await connectDatabase();
            if (req.query.pollID) {
                const userPolls = await Poll.find({
                    _id: req.query.pollID
                }).populate("author");
                if (userPolls.length === 0) {
                    return res.status(400).send({message: "Author or Poll not exist"});
                }
                return res.status(200).json(userPolls);
            }
            return res.status(400).send({message: "Author or Poll not exist"});

        default:
            return res.status(405).send("Method not allowed");
    }
}