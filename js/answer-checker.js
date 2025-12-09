// 답안 채점 및 분석 시스템

class AnswerChecker {
    constructor(level) {
        this.levelData = ANSWER_DATA[level];
        if (!this.levelData) {
            throw new Error(`Invalid level: ${level}`);
        }
        this.level = level;
    }

    // 학생 답안 채점
    gradeSubmission(studentAnswers) {
        const results = {
            studentInfo: studentAnswers.studentInfo,
            level: this.level,
            totalQuestions: this.levelData.totalQuestions,
            correctCount: 0,
            score: 0,
            passed: false,
            sectionResults: [],
            incorrectAnswers: [],
            questionResults: {},
            submittedAt: studentAnswers.submittedAt || new Date().toISOString()
        };

        // 각 문항 채점
        let currentSection = 0;
        let sectionStartQ = 1;
        let sectionCorrect = 0;

        for (let i = 1; i <= this.levelData.totalQuestions; i++) {
            const qKey = `Q${i}`;
            const studentAnswer = studentAnswers.answers[qKey];
            const correctAnswer = this.levelData.answers[qKey];
            const isCorrect = studentAnswer === correctAnswer;

            // 섹션 경계 체크
            if (currentSection < this.levelData.sections.length) {
                const section = this.levelData.sections[currentSection];
                if (i > sectionStartQ + section.questions - 1) {
                    // 이전 섹션 결과 저장
                    const sectionTotal = section.questions;
                    results.sectionResults.push({
                        name: section.name,
                        correct: sectionCorrect,
                        total: sectionTotal,
                        percentage: Math.round((sectionCorrect / sectionTotal) * 100)
                    });
                    
                    // 다음 섹션으로
                    currentSection++;
                    sectionStartQ = i;
                    sectionCorrect = 0;
                }
            }

            if (isCorrect) {
                results.correctCount++;
                sectionCorrect++;
            } else if (studentAnswer) {
                results.incorrectAnswers.push({
                    question: qKey,
                    questionNumber: i,
                    studentAnswer: studentAnswer,
                    correctAnswer: correctAnswer,
                    section: this.levelData.sections[currentSection]?.name
                });
            }

            results.questionResults[qKey] = {
                studentAnswer: studentAnswer || 'NOT_ANSWERED',
                correctAnswer: correctAnswer,
                isCorrect: isCorrect,
                wasAnswered: !!studentAnswer
            };
        }

        // 마지막 섹션 결과 저장
        if (currentSection < this.levelData.sections.length) {
            const section = this.levelData.sections[currentSection];
            const sectionTotal = section.questions;
            results.sectionResults.push({
                name: section.name,
                correct: sectionCorrect,
                total: sectionTotal,
                percentage: Math.round((sectionCorrect / sectionTotal) * 100)
            });
        }

        // 점수 계산
        results.score = Math.round((results.correctCount / results.totalQuestions) * 100);
        results.passed = results.score >= this.levelData.passingScore;

        // 피드백 생성
        results.feedback = this.generateFeedback(results);
        
        // 약점 영역 분석
        results.weakAreas = this.analyzeWeakAreas(results);

        return results;
    }

    // 피드백 생성
    generateFeedback(results) {
        const score = results.score;
        const passing = this.levelData.passingScore;
        let level = '';
        let message = '';
        let recommendations = [];

        if (score >= 90) {
            level = 'excellent';
            message = `🎉 Outstanding! You have excellent mastery of ${this.levelData.levelName} level!`;
            recommendations.push(`You're ready to advance to the next level`);
        } else if (score >= 80) {
            level = 'very-good';
            message = `👍 Very Good! You have strong competency at ${this.levelData.levelName} level.`;
            recommendations.push(`Continue practicing and you'll be ready for the next level soon`);
        } else if (score >= passing) {
            level = 'good';
            message = `✓ Well Done! You have passed the ${this.levelData.levelName} level.`;
            recommendations.push(`Focus on improving your weaker areas before moving to the next level`);
        } else if (score >= passing - 10) {
            level = 'close';
            message = `💪 Close! You're almost there at ${this.levelData.levelName} level.`;
            recommendations.push(`Review the incorrect answers and try again`);
        } else {
            level = 'needs-improvement';
            message = `📚 Keep practicing. You need more time with ${this.levelData.levelName} level content.`;
            recommendations.push(`Focus on fundamental concepts before retaking the test`);
        }

        // 섹션별 약점 추천
        results.sectionResults.forEach(section => {
            if (section.percentage < 60) {
                recommendations.push(`Strengthen your ${section.name} skills`);
            }
        });

        return {
            level: level,
            message: message,
            recommendations: recommendations
        };
    }

    // 약점 영역 분석
    analyzeWeakAreas(results) {
        const weakSections = results.sectionResults
            .filter(section => section.percentage < 70)
            .sort((a, b) => a.percentage - b.percentage);

        return {
            sections: weakSections,
            totalWeak: weakSections.length,
            needsWork: weakSections.length > 0
        };
    }

    // 통계 계산 (여러 학생의 결과)
    static calculateStatistics(gradedResults) {
        if (!gradedResults || gradedResults.length === 0) {
            return null;
        }

        const stats = {
            totalStudents: gradedResults.length,
            averageScore: 0,
            highestScore: 0,
            lowestScore: 100,
            passRate: 0,
            scoreDistribution: {
                '90-100': 0,
                '80-89': 0,
                '70-79': 0,
                '60-69': 0,
                '50-59': 0,
                '0-49': 0
            },
            questionDifficulty: {},
            sectionAverages: {}
        };

        let totalScore = 0;
        let passedCount = 0;

        // 각 학생 결과 집계
        gradedResults.forEach(result => {
            const score = result.score;
            totalScore += score;

            stats.highestScore = Math.max(stats.highestScore, score);
            stats.lowestScore = Math.min(stats.lowestScore, score);

            if (result.passed) passedCount++;

            // 점수 분포
            if (score >= 90) stats.scoreDistribution['90-100']++;
            else if (score >= 80) stats.scoreDistribution['80-89']++;
            else if (score >= 70) stats.scoreDistribution['70-79']++;
            else if (score >= 60) stats.scoreDistribution['60-69']++;
            else if (score >= 50) stats.scoreDistribution['50-59']++;
            else stats.scoreDistribution['0-49']++;

            // 문항별 정답률
            Object.entries(result.questionResults).forEach(([qKey, qResult]) => {
                if (!stats.questionDifficulty[qKey]) {
                    stats.questionDifficulty[qKey] = { correct: 0, total: 0, percentage: 0 };
                }
                stats.questionDifficulty[qKey].total++;
                if (qResult.isCorrect) {
                    stats.questionDifficulty[qKey].correct++;
                }
            });

            // 섹션별 평균
            result.sectionResults.forEach(section => {
                if (!stats.sectionAverages[section.name]) {
                    stats.sectionAverages[section.name] = { total: 0, count: 0, average: 0 };
                }
                stats.sectionAverages[section.name].total += section.percentage;
                stats.sectionAverages[section.name].count++;
            });
        });

        // 평균 계산
        stats.averageScore = Math.round(totalScore / stats.totalStudents);
        stats.passRate = Math.round((passedCount / stats.totalStudents) * 100);

        // 문항별 정답률 계산
        Object.keys(stats.questionDifficulty).forEach(qKey => {
            const q = stats.questionDifficulty[qKey];
            q.percentage = Math.round((q.correct / q.total) * 100);
        });

        // 섹션별 평균 계산
        Object.keys(stats.sectionAverages).forEach(sectionName => {
            const section = stats.sectionAverages[sectionName];
            section.average = Math.round(section.total / section.count);
        });

        // 가장 어려운 문항 TOP 5
        stats.hardestQuestions = Object.entries(stats.questionDifficulty)
            .sort((a, b) => a[1].percentage - b[1].percentage)
            .slice(0, 5)
            .map(([qKey, data]) => ({
                question: qKey,
                correctRate: data.percentage
            }));

        return stats;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnswerChecker;
}
