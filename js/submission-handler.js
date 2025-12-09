// CEFR Submission Handler - Manages student test submissions and saves them for teacher access

class SubmissionHandler {
    constructor() {
        this.submissions = [];
        this.isServerAvailable = false;
        this.checkServerAvailability();
    }

    // Check if the submission server is running
    async checkServerAvailability() {
        try {
            const response = await fetch('http://localhost:3001/api/submissions');
            this.isServerAvailable = response.ok;
            console.log('Submission server available:', this.isServerAvailable);
        } catch (error) {
            this.isServerAvailable = false;
            console.log('Submission server not available, using local storage');
        }
    }

    // Save submission to server or local storage
    async saveSubmission(studentInfo, level, answers, score, additionalData = {}) {
        const submission = {
            studentInfo: studentInfo,
            level: level,
            answers: answers,
            score: score,
            submittedAt: new Date().toISOString(),
            ...additionalData
        };

        try {
            if (this.isServerAvailable) {
                return await this.saveToServer(submission);
            } else {
                return await this.saveToLocalStorage(submission);
            }
        } catch (error) {
            console.error('Error saving submission:', error);
            // Fallback to local storage
            return await this.saveToLocalStorage(submission);
        }
    }

    // Save submission to server
    async saveToServer(submission) {
        try {
            const response = await fetch('http://localhost:3001/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submission)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Submission saved to server:', result);
                return { success: true, location: 'server', ...result };
            } else {
                throw new Error('Server returned error: ' + response.status);
            }
        } catch (error) {
            console.error('Error saving to server:', error);
            throw error;
        }
    }

    // Save submission to local storage as fallback
    async saveToLocalStorage(submission) {
        try {
            // Get existing submissions
            const existingSubmissions = JSON.parse(localStorage.getItem('cefr_submissions') || '[]');

            // Add new submission
            existingSubmissions.push(submission);

            // Save to local storage
            localStorage.setItem('cefr_submissions', JSON.stringify(existingSubmissions));

            console.log('Submission saved to local storage');
            return { success: true, location: 'localStorage', submissionCount: existingSubmissions.length };
        } catch (error) {
            console.error('Error saving to local storage:', error);
            throw error;
        }
    }

    // Get submissions from server or local storage
    async getSubmissions() {
        try {
            if (this.isServerAvailable) {
                return await this.getFromServer();
            } else {
                return await this.getFromLocalStorage();
            }
        } catch (error) {
            console.error('Error getting submissions:', error);
            return await this.getFromLocalStorage();
        }
    }

    // Get submissions from server
    async getFromServer() {
        try {
            const response = await fetch('http://localhost:3001/api/submissions');
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Server returned error: ' + response.status);
            }
        } catch (error) {
            console.error('Error getting from server:', error);
            throw error;
        }
    }

    // Get submissions from local storage
    async getFromLocalStorage() {
        try {
            const submissions = JSON.parse(localStorage.getItem('cefr_submissions') || '[]');
            console.log('Loaded submissions from local storage:', submissions.length);
            return submissions;
        } catch (error) {
            console.error('Error getting from local storage:', error);
            return [];
        }
    }

    // Sync local storage submissions to server
    async syncToServer() {
        if (!this.isServerAvailable) {
            console.log('Server not available for syncing');
            return { success: false, reason: 'Server not available' };
        }

        try {
            const localSubmissions = await this.getFromLocalStorage();
            let synced = 0;

            for (const submission of localSubmissions) {
                try {
                    await this.saveToServer(submission);
                    synced++;
                } catch (error) {
                    console.error('Error syncing submission:', error);
                }
            }

            // Clear local storage after successful sync
            if (synced > 0) {
                localStorage.removeItem('cefr_submissions');
                console.log(`Synced ${synced} submissions to server`);
            }

            return { success: true, synced: synced };
        } catch (error) {
            console.error('Error syncing to server:', error);
            return { success: false, error: error.message };
        }
    }

    // Export submissions as downloadable file
    exportSubmission(submission) {
        const dataStr = JSON.stringify(submission, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `${submission.studentInfo?.name || 'student'}_${submission.level}_${new Date().toISOString().split('T')[0]}.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Submission exported as file');
    }

    // Import submission from file
    async importSubmission(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const submission = JSON.parse(e.target.result);
                    await this.saveSubmission(
                        submission.studentInfo,
                        submission.level,
                        submission.answers,
                        submission.score,
                        submission
                    );
                    resolve(submission);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsText(file);
        });
    }

    // Get statistics for submissions
    async getStatistics() {
        const submissions = await this.getSubmissions();

        if (submissions.length === 0) {
            return {
                totalStudents: 0,
                averageScore: 0,
                passRate: 0,
                levelDistribution: {},
                scoreDistribution: {}
            };
        }

        const totalStudents = submissions.length;
        const totalScore = submissions.reduce((sum, s) => sum + (s.score || 0), 0);
        const averageScore = Math.round(totalScore / totalStudents);
        const passedCount = submissions.filter(s => s.passed !== false).length;
        const passRate = Math.round((passedCount / totalStudents) * 100);

        // Level distribution
        const levelDistribution = {};
        submissions.forEach(s => {
            levelDistribution[s.level] = (levelDistribution[s.level] || 0) + 1;
        });

        // Score distribution
        const scoreDistribution = {
            '90-100': 0,
            '80-89': 0,
            '70-79': 0,
            '60-69': 0,
            '50-59': 0,
            '0-49': 0
        };

        submissions.forEach(s => {
            const score = s.score || 0;
            if (score >= 90) scoreDistribution['90-100']++;
            else if (score >= 80) scoreDistribution['80-89']++;
            else if (score >= 70) scoreDistribution['70-79']++;
            else if (score >= 60) scoreDistribution['60-69']++;
            else if (score >= 50) scoreDistribution['50-59']++;
            else scoreDistribution['0-49']++;
        });

        return {
            totalStudents,
            averageScore,
            passRate,
            levelDistribution,
            scoreDistribution,
            lastUpdated: new Date().toISOString()
        };
    }
}

// Create global instance
window.submissionHandler = new SubmissionHandler();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubmissionHandler;
}