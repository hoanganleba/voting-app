import {NextApiRequest, NextApiResponse} from "next";
import {connectDatabase} from "utils/connectDatabase";
import Poll from "../../models/poll.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    switch (req.method) {
        case "PUT":
            await connectDatabase();
            if (req.body.userID) {
                await Poll.updateOne({
                        _id: req.body.pollID,
                    }, {
                        $push: {
                            options: {
                                name: req.body.optionName,
                                numOfVote: 0,
                            }
                        }
                    }
                );
                return res.status(200).send({message: "Add New Option Successfully"});
            }
            return res.status(400).send({message: "Only authenticated user can add new option poll"});

        default:
            res.status(405).send("Method not allowed");
    }
}
