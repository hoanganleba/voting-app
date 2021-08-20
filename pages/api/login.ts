import type {NextApiRequest, NextApiResponse} from 'next'
import {connectDatabase} from '../../utils/connectDatabase'
import User from '../../models/user.model'
import * as bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        await connectDatabase()
        const user = await User.findOne({username: req.body.username})
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({message: 'Your username and/or password do not match'})
        }
        res.status(200).json({message: 'Login success', userID: user._id, username: user.username})
    } else {
        res.status(405).send('Method not allowed')
    }
}