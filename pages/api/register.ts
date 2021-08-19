import type {NextApiRequest, NextApiResponse} from 'next'
import {connectDatabase} from '../../utils/connectDatabase'
import * as bcrypt from 'bcrypt'

const saltOrRounds = 10

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const db = await connectDatabase()
        const user = await db.collection('user').findOne({username: req.body.username})
        if (user) {
            return res.status(400).send({message: 'Username already exists! Please choose another'})
        }
        req.body.password = await bcrypt.hash(req.body.password, saltOrRounds)
        const data = req.body
        await db.collection('user').insertOne(data)
        res.status(200).send({message: 'Register successfully'})
    } else {
        res.status(405).send('Method not allowed')
    }
}