import * as mongoose from 'mongoose'
import {ObjectId, Schema} from 'mongoose'

interface PollModel extends Document {
    title: string,
    author: ObjectId,
    option: Array<any>
}

const pollSchema = new Schema<PollModel>({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    options: [
        {
            name: {type: String},
            numOfVote: {type: Number, default: 0}
        }
    ]
})

export default mongoose.models.poll || mongoose.model('poll', pollSchema)