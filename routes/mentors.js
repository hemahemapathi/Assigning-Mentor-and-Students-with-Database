import express from 'express';
const router = express.Router();
import Mentor from '../models/Mentor.js';
import Student from '../models/Student.js';

// Create a new mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign multiple students to a mentor
router.post('/:mentorId/assign-students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const updatedStudents = await Student.updateMany(
      { _id: { $in: studentIds }, mentor: null },
      { $set: { mentor: mentorId } }
    );

    res.json({ message: 'Students assigned successfully', updatedCount: updatedStudents.nModified });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;