const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

router.post('/api/save-progress', async (req, res) => {
    try {
        const { userId, minigame1Progress, minigame2Progress, minigame3Progress } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId es requerido' });
        }

        // Buscar si ya existe un progreso para este usuario
        let progress = await Progress.findOne({ userId });

        if (progress) {
            // Actualizar progreso existente
            if (minigame1Progress !== null) progress.minigame1Progress = minigame1Progress;
            if (minigame2Progress !== null) progress.minigame2Progress = minigame2Progress;
            if (minigame3Progress !== null) progress.minigame3Progress = minigame3Progress;
            progress.lastSaved = new Date();
        } else {
            // Crear nuevo progreso
            progress = new Progress({
                userId,
                minigame1Progress,
                minigame2Progress,
                minigame3Progress
            });
        }

        await progress.save();

        res.status(200).json({ 
            message: 'Progreso guardado exitosamente',
            progress 
        });
    } catch (error) {
        console.error('Error saving progress:', error);
        res.status(500).json({ message: 'Error al guardar el progreso' });
    }
});

// Endpoint para obtener el progreso de un usuario
router.get('/api/get-progress/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const progress = await Progress.findOne({ userId });
        
        if (!progress) {
            return res.status(404).json({ message: 'No se encontró progreso para este usuario' });
        }

        res.status(200).json({ progress });
    } catch (error) {
        console.error('Error getting progress:', error);
        res.status(500).json({ message: 'Error al obtener el progreso' });
    }
});

module.exports = router;
