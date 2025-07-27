import User from '../models/user.model.js'
import mongoose from 'mongoose'

export const createAIUser = async () => {
    try {
        const aiUserId = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011');
        const existingAIUser = await User.findById(aiUserId);
        if (!existingAIUser) {
            await User.create({
                fullName: 'ChatCom AI',
                password: 'dummy-password-not-used-for-ai',
                _id: aiUserId,
                email: 'ai-assistant@chatcom.app',
                profilePic: ""
            });
            console.log('AI User created successfully with ID:', aiUserId);
        } else {
            console.log('AI User already exists');
        }
    }
    catch (err) {
         console.log("AI User already exists");
        }

}
export const AI_USER_ID = '507f1f77bcf86cd799439011';