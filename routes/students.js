import { Router } from 'express';
const router = Router();
import Student from '../models/Student.js';

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students without a mentor
router.get('/unassigned', async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign or change mentor for a particular student
router.put('/:studentId/assign-mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.mentor) {
      student.previousMentor = student.mentor;
    }
    student.mentor = mentorId;
    await student.save();

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get previously assigned mentor for a particular student
router.get('/:studentId/previous-mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('previousMentor');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.previousMentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;