import * as mongoose from 'mongoose'

interface UserModel extends Document{
    username: string,
    password: string
}

const userSchema = new mongoose.Schema<UserModel>({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export default mongoose.models.user || mongoose.model('user', userSchema)