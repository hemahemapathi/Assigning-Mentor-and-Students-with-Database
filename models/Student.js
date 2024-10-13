import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  previousMentor: { type: Schema.Types.ObjectId, ref: 'Mentor' },
});

export default model('Student', studentSchema);
