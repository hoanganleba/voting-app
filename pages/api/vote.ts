import {NextApiRequest, NextApiResponse} from "next";
import {connectDatabase} from "utils/connectDatabase";
import Poll from "models/poll.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    switch (req.method) {
        case "PUT":
            await connectDatabase();
            await Poll.updateOne({
                    _id: req.body.pollID,
                    "options.name": req.body.optionNameSelected
                }, {
                    $inc: {"options.$.numOfVote": 1}
                }
            );
            return res.status(200).send({message: "Vote Successfully"});

        default:
            res.status(405).send("Method not allowed");
    }
}