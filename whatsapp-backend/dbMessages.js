import mongoose from 'mongoose'

const whatsappSchema = mongoose.Schema({
    name:String,
    message:String,
    timestamp:String,
    received:Boolean
})
// collection
export default mongoose.model('messageContents',whatsappSchema)
