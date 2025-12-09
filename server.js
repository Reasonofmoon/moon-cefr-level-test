const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes

// Get all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await loadSubmissions();
        res.json(submissions);
    } catch (error) {
        console.error('Error loading submissions:', error);
        res.status(500).json({ error: 'Failed to load submissions' });
    }
});

// Get submission by filename
app.get('/api/submissions/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(SUBMISSIONS_DIR, filename);

        // Security check - prevent directory traversal
        if (!filePath.startsWith(SUBMISSIONS_DIR)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = await fs.readFile(filePath, 'utf8');
        const submission = JSON.parse(data);
        res.json(submission);
    } catch (error) {
        console.error('Error loading submission:', error);
        res.status(404).json({ error: 'Submission not found' });
    }
});

// Save new submission
app.post('/api/submissions', async (req, res) => {
    try {
        const submission = req.body;

        // Validate submission data
        if (!submission.studentInfo || !submission.level || !submission.answers) {
            return res.status(400).json({ error: 'Invalid submission data' });
        }

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${submission.studentInfo.name}_${submission.level}_${timestamp}.json`;
        const filePath = path.join(SUBMISSIONS_DIR, filename);

        // Save submission
        await fs.writeFile(filePath, JSON.stringify(submission, null, 2), 'utf8');

        res.json({
            success: true,
            filename: filename,
            message: 'Submission saved successfully'
        });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ error: 'Failed to save submission' });
    }
});

// Get submissions statistics
app.get('/api/stats', async (req, res) => {
    try {
        const submissions = await loadSubmissions();
        const stats = calculateStats(submissions);
        res.json(stats);
    } catch (error) {
        console.error('Error calculating stats:', error);
        res.status(500).json({ error: 'Failed to calculate statistics' });
    }
});

// Helper functions

async function loadSubmissions() {
    try {
        const files = await fs.readdir(SUBMISSIONS_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        const submissions = [];
        for (const file of jsonFiles) {
            try {
                const filePath = path.join(SUBMISSIONS_DIR, file);
                const data = await fs.readFile(filePath, 'utf8');
                const submission = JSON.parse(data);
                submissions.push(submission);
            } catch (error) {
                console.warn(`Error loading submission ${file}:`, error.message);
            }
        }

        return submissions;
    } catch (error) {
        console.error('Error reading submissions directory:', error);
        return [];
    }
}

function calculateStats(submissions) {
    const totalStudents = submissions.length;
    const avgScore = totalStudents > 0 ?
        Math.round(submissions.reduce((sum, s) => sum + (s.score || 0), 0) / totalStudents) : 0;
    const passRate = totalStudents > 0 ?
        Math.round((submissions.filter(s => s.passed).length / totalStudents) * 100) : 0;

    // Level distribution
    const levelCounts = {};
    submissions.forEach(s => {
        levelCounts[s.level] = (levelCounts[s.level] || 0) + 1;
    });

    // Score distribution
    const scoreRanges = {
        '90-100': 0,
        '80-89': 0,
        '70-79': 0,
        '60-69': 0,
        '50-59': 0,
        '0-49': 0
    };

    submissions.forEach(s => {
        const score = s.score || 0;
        if (score >= 90) scoreRanges['90-100']++;
        else if (score >= 80) scoreRanges['80-89']++;
        else if (score >= 70) scoreRanges['70-79']++;
        else if (score >= 60) scoreRanges['60-69']++;
        else if (score >= 50) scoreRanges['50-59']++;
        else scoreRanges['0-49']++;
    });

    return {
        totalStudents,
        avgScore,
        passRate,
        levelCounts,
        scoreRanges,
        lastUpdated: new Date().toISOString()
    };
}

// Ensure submissions directory exists
async function ensureSubmissionsDir() {
    try {
        await fs.access(SUBMISSIONS_DIR);
    } catch (error) {
        console.log('Creating submissions directory...');
        await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
    }
}

// Start server
async function startServer() {
    await ensureSubmissionsDir();

    app.listen(PORT, () => {
        console.log(`CEFR Teacher Dashboard Server running on http://localhost:${PORT}`);
        console.log(`Teacher Dashboard: http://localhost:${PORT}/teacher-dashboard.html`);
        console.log(`Submissions API: http://localhost:${PORT}/api/submissions`);
    });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

startServer().catch(console.error);