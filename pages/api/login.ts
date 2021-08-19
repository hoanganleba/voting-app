import type {NextApiRequest, NextApiResponse} from 'next'
import {connectDatabase} from '../../utils/connectDatabase'
import * as bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const db = await connectDatabase()
        const user = await db
            .collection('user')
            .findOne({username: req.body.username})
        // @ts-ignore
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({message: 'Your username and/or password do not match'})
        }
        res.status(200).json({message: 'Login success', username: user.username})
    } else {
        res.status(405).send('Method not allowed')
    }
}