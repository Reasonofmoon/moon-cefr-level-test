// CEFR 레벨 테스트 정답 데이터
// 각 레벨별 정답, 섹션 정보, 합격 기준 포함

const ANSWER_DATA = {
    'PRE-A1': {
        level: 'PRE-A1',
        levelName: 'Breakthrough',
        totalQuestions: 25,
        passingScore: 50,
        sections: [
            { name: 'Greetings & Introductions', questions: 5 },
            { name: 'Numbers 1-10', questions: 5 },
            { name: 'Objects & Colors', questions: 5 },
            { name: 'Family & Daily Life', questions: 5 },
            { name: 'Basic Grammar', questions: 5 }
        ],
        answers: {
            'Q1': 'A', 'Q2': 'B', 'Q3': 'C', 'Q4': 'D', 'Q5': 'A',
            'Q6': 'B', 'Q7': 'C', 'Q8': 'D', 'Q9': 'A', 'Q10': 'B',
            'Q11': 'C', 'Q12': 'D', 'Q13': 'A', 'Q14': 'B', 'Q15': 'C',
            'Q16': 'D', 'Q17': 'A', 'Q18': 'B', 'Q19': 'C', 'Q20': 'D',
            'Q21': 'A', 'Q22': 'B', 'Q23': 'C', 'Q24': 'D', 'Q25': 'A'
        }
    },
    'A1': {
        level: 'A1',
        levelName: 'Beginner',
        totalQuestions: 34,
        passingScore: 55,
        sections: [
            { name: 'Reading Comprehension', questions: 8 },
            { name: 'Vocabulary', questions: 12 },
            { name: 'Conversation', questions: 5 },
            { name: 'Grammar', questions: 10 }
        ],
        answers: {
            'Q1': 'B', 'Q2': 'C', 'Q3': 'D', 'Q4': 'A', 'Q5': 'B',
            'Q6': 'C', 'Q7': 'D', 'Q8': 'A', 'Q9': 'B', 'Q10': 'C',
            'Q11': 'D', 'Q12': 'A', 'Q13': 'B', 'Q14': 'C', 'Q15': 'D',
            'Q16': 'A', 'Q17': 'B', 'Q18': 'C', 'Q19': 'D', 'Q20': 'A',
            'Q21': 'B', 'Q22': 'C', 'Q23': 'D', 'Q24': 'A', 'Q25': 'B',
            'Q26': 'C', 'Q27': 'D', 'Q28': 'A', 'Q29': 'B', 'Q30': 'C',
            'Q31': 'D', 'Q32': 'A', 'Q33': 'B', 'Q34': 'C'
        }
    },
    'A2': {
        level: 'A2',
        levelName: 'Elementary',
        totalQuestions: 40,
        passingScore: 60,
        sections: [
            { name: 'Reading Comprehension', questions: 8 },
            { name: 'Vocabulary', questions: 12 },
            { name: 'Conversation', questions: 8 },
            { name: 'Grammar', questions: 10 },
            { name: 'Writing', questions: 2 }
        ],
        answers: {
            'Q1': 'B', 'Q2': 'D', 'Q3': 'B', 'Q4': 'C', 'Q5': 'B',
            'Q6': 'B', 'Q7': 'D', 'Q8': 'C', 'Q9': 'A', 'Q10': 'B',
            'Q11': 'D', 'Q12': 'C', 'Q13': 'B', 'Q14': 'A', 'Q15': 'C',
            'Q16': 'B', 'Q17': 'A', 'Q18': 'C', 'Q19': 'D', 'Q20': 'C',
            'Q21': 'A', 'Q22': 'B', 'Q23': 'D', 'Q24': 'B', 'Q25': 'A',
            'Q26': 'B', 'Q27': 'D', 'Q28': 'B', 'Q29': 'C', 'Q30': 'A',
            'Q31': 'B', 'Q32': 'C', 'Q33': 'D', 'Q34': 'B', 'Q35': 'C',
            'Q36': 'D', 'Q37': 'A', 'Q38': 'B', 'Q39': 'A', 'Q40': 'C'
        }
    },
    'B1': {
        level: 'B1',
        levelName: 'Intermediate',
        totalQuestions: 42,
        passingScore: 70,
        sections: [
            { name: 'Reading Comprehension', questions: 10 },
            { name: 'Vocabulary', questions: 12 },
            { name: 'Conversation', questions: 8 },
            { name: 'Grammar', questions: 12 }
        ],
        answers: {
            'Q1': 'B', 'Q2': 'B', 'Q3': 'B', 'Q4': 'C', 'Q5': 'B',
            'Q6': 'B', 'Q7': 'C', 'Q8': 'C', 'Q9': 'B', 'Q10': 'C',
            'Q11': 'B', 'Q12': 'B', 'Q13': 'C', 'Q14': 'B', 'Q15': 'C',
            'Q16': 'B', 'Q17': 'B', 'Q18': 'C', 'Q19': 'B', 'Q20': 'C',
            'Q21': 'B', 'Q22': 'B', 'Q23': 'C', 'Q24': 'B', 'Q25': 'B',
            'Q26': 'B', 'Q27': 'C', 'Q28': 'B', 'Q29': 'C', 'Q30': 'B',
            'Q31': 'B', 'Q32': 'B', 'Q33': 'C', 'Q34': 'B', 'Q35': 'B',
            'Q36': 'B', 'Q37': 'C', 'Q38': 'B', 'Q39': 'B', 'Q40': 'B',
            'Q41': 'B', 'Q42': 'C'
        }
    },
    'B2': {
        level: 'B2',
        levelName: 'Upper Intermediate',
        totalQuestions: 42,
        passingScore: 75,
        sections: [
            { name: 'Reading Comprehension', questions: 10 },
            { name: 'Vocabulary', questions: 12 },
            { name: 'Conversation', questions: 8 },
            { name: 'Grammar', questions: 12 }
        ],
        answers: {
            'Q1': 'C', 'Q2': 'B', 'Q3': 'D', 'Q4': 'A', 'Q5': 'B',
            'Q6': 'C', 'Q7': 'D', 'Q8': 'A', 'Q9': 'C', 'Q10': 'B',
            'Q11': 'D', 'Q12': 'A', 'Q13': 'C', 'Q14': 'B', 'Q15': 'D',
            'Q16': 'A', 'Q17': 'C', 'Q18': 'B', 'Q19': 'D', 'Q20': 'A',
            'Q21': 'B', 'Q22': 'C', 'Q23': 'D', 'Q24': 'A', 'Q25': 'B',
            'Q26': 'C', 'Q27': 'D', 'Q28': 'A', 'Q29': 'B', 'Q30': 'C',
            'Q31': 'D', 'Q32': 'A', 'Q33': 'B', 'Q34': 'C', 'Q35': 'D',
            'Q36': 'A', 'Q37': 'B', 'Q38': 'C', 'Q39': 'D', 'Q40': 'A',
            'Q41': 'B', 'Q42': 'C'
        }
    }
};

// 레벨 색상 테마
const LEVEL_COLORS = {
    'PRE-A1': {
        primary: '#8B5CF6',
        light: '#EDE9FE',
        dark: '#6D28D9'
    },
    'A1': {
        primary: '#3B82F6',
        light: '#DBEAFE',
        dark: '#1E40AF'
    },
    'A2': {
        primary: '#10B981',
        light: '#D1FAE5',
        dark: '#047857'
    },
    'B1': {
        primary: '#F59E0B',
        light: '#FEF3C7',
        dark: '#D97706'
    },
    'B2': {
        primary: '#EF4444',
        light: '#FEE2E2',
        dark: '#DC2626'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANSWER_DATA, LEVEL_COLORS };
}
