import {NextApiRequest, NextApiResponse} from 'next'
import {connectDatabase} from '../../utils/connectDatabase'
import Poll from '../../models/poll.model'
import * as mongoose from 'mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case 'POST':
            await connectDatabase()
            const newPoll = new Poll({
                title: req.body.title,
                author: mongoose.Types.ObjectId(req.body.author),
                options: req.body.options
            })
            newPoll.save()
            return res.status(200).send({message: 'Poll Created Successfully'})
        case 'GET':
            if(req.query.userID) {
                const userPolls = await Poll.find({author: req.query.userID}).populate('author')
                return res.status(200).json(userPolls)
            }
            const polls = await Poll.find({}).populate('author')
            return res.status(200).json(polls)
        default:
            res.status(405).send('Method not allowed')
    }
}