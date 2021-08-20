import type {NextApiRequest, NextApiResponse} from 'next'
import {connectDatabase} from '../../utils/connectDatabase'
import User from '../../models/user.model'
import * as bcrypt from 'bcrypt'

const saltOrRounds = 10

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        await connectDatabase()
        const user = await User.findOne({username: req.body.username})
        if (user) {
            return res.status(400).send({message: 'Username already exists! Please choose another'})
        }
        req.body.password = await bcrypt.hash(req.body.password, saltOrRounds)
        const data = req.body
        const newUser = new User(data)
        await newUser.save()
        res.status(200).send({message: 'Register successfully'})
    } else {
        res.status(405).send('Method not allowed')
    }
}