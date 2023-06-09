import message from '../../../database/messageSchema';
import connect from '../../../database/connect';

export default async function handler(req, res) {
    await connect;

    var messages = await message.find({}).sort({ _id: -1 })

    return res.status(200).json({ messages: messages, status: 200 });

}