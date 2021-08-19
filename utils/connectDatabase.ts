import {MongoClient} from 'mongodb'

export const connectDatabase = async () => {
    // @ts-ignore
    const client = await MongoClient.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return client.db('voting-app');
}