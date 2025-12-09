// Chart.js 설정 및 차트 생성 유틸리티

class ChartGenerator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.charts = {};
    }

    // 점수 분포 막대 차트
    createScoreDistributionChart(stats, canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const distribution = stats.scoreDistribution;
        const data = {
            labels: ['90-100%', '80-89%', '70-79%', '60-69%', '50-59%', '0-49%'],
            datasets: [{
                label: 'Number of Students',
                data: [
                    distribution['90-100'],
                    distribution['80-89'],
                    distribution['70-79'],
                    distribution['60-69'],
                    distribution['50-59'],
                    distribution['0-49']
                ],
                backgroundColor: [
                    '#10B981',
                    '#3B82F6',
                    '#F59E0B',
                    '#EF4444',
                    '#DC2626',
                    '#991B1B'
                ],
                borderColor: [
                    '#059669',
                    '#2563EB',
                    '#D97706',
                    '#DC2626',
                    '#B91C1C',
                    '#7F1D1D'
                ],
                borderWidth: 2
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Score Distribution',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Number of Students'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Score Range'
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // 섹션별 평균 정답률 레이더 차트
    createSectionRadarChart(stats, canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const sectionNames = Object.keys(stats.sectionAverages);
        const sectionScores = sectionNames.map(name => stats.sectionAverages[name].average);

        const data = {
            labels: sectionNames,
            datasets: [{
                label: 'Average Score (%)',
                data: sectionScores,
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
                borderWidth: 2
            }]
        };

        const config = {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Section Performance',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // 문항별 정답률 라인 차트
    createQuestionDifficultyChart(stats, canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const questionKeys = Object.keys(stats.questionDifficulty).sort((a, b) => {
            const numA = parseInt(a.substring(1));
            const numB = parseInt(b.substring(1));
            return numA - numB;
        });
        
        const correctRates = questionKeys.map(key => stats.questionDifficulty[key].percentage);

        const data = {
            labels: questionKeys,
            datasets: [{
                label: 'Correct Rate (%)',
                data: correctRates,
                fill: false,
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.1,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Question Difficulty (Correct Rate by Question)',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Correct Rate (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Question Number'
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // 학생별 점수 비교 차트
    createStudentComparisonChart(gradedResults, canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const studentNames = gradedResults.map(r => r.studentInfo.name);
        const scores = gradedResults.map(r => r.score);

        const data = {
            labels: studentNames,
            datasets: [{
                label: 'Score (%)',
                data: scores,
                backgroundColor: scores.map(score => {
                    if (score >= 90) return '#10B981';
                    if (score >= 80) return '#3B82F6';
                    if (score >= 70) return '#F59E0B';
                    if (score >= 60) return '#EF4444';
                    return '#DC2626';
                }),
                borderColor: scores.map(score => {
                    if (score >= 90) return '#059669';
                    if (score >= 80) return '#2563EB';
                    if (score >= 70) return '#D97706';
                    if (score >= 60) return '#DC2626';
                    return '#B91C1C';
                }),
                borderWidth: 2
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Student Score Comparison',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Score (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Student Name'
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // 개인 섹션별 성과 차트
    createIndividualSectionChart(sectionResults, canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const sectionNames = sectionResults.map(s => s.name);
        const percentages = sectionResults.map(s => s.percentage);

        const data = {
            labels: sectionNames,
            datasets: [{
                label: 'Correct Rate (%)',
                data: percentages,
                backgroundColor: percentages.map(pct => {
                    if (pct >= 80) return 'rgba(16, 185, 129, 0.8)';
                    if (pct >= 70) return 'rgba(59, 130, 246, 0.8)';
                    if (pct >= 60) return 'rgba(245, 158, 11, 0.8)';
                    return 'rgba(239, 68, 68, 0.8)';
                }),
                borderColor: percentages.map(pct => {
                    if (pct >= 80) return '#10B981';
                    if (pct >= 70) return '#3B82F6';
                    if (pct >= 60) return '#F59E0B';
                    return '#EF4444';
                }),
                borderWidth: 2
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Performance by Section',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Correct Rate (%)'
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // 모든 차트 제거
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartGenerator;
}
