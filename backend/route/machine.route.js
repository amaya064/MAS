import express from 'express';
import { createMaintenanceSchedule, deleteMachine, getAllMachines, registerMachine } from '../controller/machine.controller.js';

const router = express.Router();

// POST: Register Employee
router.post('/register', registerMachine);
router.get('/', getAllMachines);
router.delete('/:id', deleteMachine);
router.post('/create', createMaintenanceSchedule);

export default router;
