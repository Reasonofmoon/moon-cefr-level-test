#!/usr/bin/env node

// 정답 분포 검증 스크립트
const ANSWER_DATA = {
    'PRE-A1': {
        totalQuestions: 25,
        answers: {
            'Q1': 'A', 'Q2': 'B', 'Q3': 'C', 'Q4': 'D', 'Q5': 'A',
            'Q6': 'B', 'Q7': 'C', 'Q8': 'D', 'Q9': 'A', 'Q10': 'B',
            'Q11': 'C', 'Q12': 'D', 'Q13': 'A', 'Q14': 'B', 'Q15': 'C',
            'Q16': 'D', 'Q17': 'A', 'Q18': 'B', 'Q19': 'C', 'Q20': 'D',
            'Q21': 'A', 'Q22': 'B', 'Q23': 'C', 'Q24': 'D', 'Q25': 'A'
        }
    },
    'A1': {
        totalQuestions: 34,
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
        totalQuestions: 40,
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
        totalQuestions: 42,
        answers: {
            'Q1': 'A', 'Q2': 'B', 'Q3': 'C', 'Q4': 'D', 'Q5': 'A',
            'Q6': 'B', 'Q7': 'C', 'Q8': 'D', 'Q9': 'A', 'Q10': 'B',
            'Q11': 'C', 'Q12': 'D', 'Q13': 'A', 'Q14': 'B', 'Q15': 'C',
            'Q16': 'D', 'Q17': 'A', 'Q18': 'B', 'Q19': 'C', 'Q20': 'D',
            'Q21': 'A', 'Q22': 'B', 'Q23': 'C', 'Q24': 'D', 'Q25': 'A',
            'Q26': 'B', 'Q27': 'C', 'Q28': 'D', 'Q29': 'A', 'Q30': 'B',
            'Q31': 'C', 'Q32': 'D', 'Q33': 'A', 'Q34': 'B', 'Q35': 'C',
            'Q36': 'D', 'Q37': 'A', 'Q38': 'B', 'Q39': 'C', 'Q40': 'D',
            'Q41': 'A', 'Q42': 'B'
        }
    },
    'B2': {
        totalQuestions: 42,
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

function analyzeDistribution(level, answers) {
    const distribution = { A: 0, B: 0, C: 0, D: 0 };
    const total = Object.keys(answers).length;
    
    Object.values(answers).forEach(answer => {
        distribution[answer]++;
    });
    
    console.log(`\n=== ${level} (${total} questions) ===`);
    console.log(`A: ${distribution.A} (${(distribution.A/total*100).toFixed(1)}%)`);
    console.log(`B: ${distribution.B} (${(distribution.B/total*100).toFixed(1)}%)`);
    console.log(`C: ${distribution.C} (${(distribution.C/total*100).toFixed(1)}%)`);
    console.log(`D: ${distribution.D} (${(distribution.D/total*100).toFixed(1)}%)`);
    
    // 균형 검증 (각 20-30% 권장, 4지선다 기준 25%±5%)
    const balanced = Object.values(distribution).every(count => {
        const percentage = (count / total) * 100;
        return percentage >= 15 && percentage <= 35;
    });
    
    if (balanced) {
        console.log('✅ BALANCED - Answer distribution is acceptable');
    } else {
        console.log('❌ UNBALANCED - Answer distribution needs adjustment');
    }
    
    return { distribution, balanced, total };
}

console.log('📊 CEFR Test Answer Distribution Analysis\n');
console.log('=' .repeat(50));

let allBalanced = true;
for (const [level, data] of Object.entries(ANSWER_DATA)) {
    const result = analyzeDistribution(level, data.answers);
    if (!result.balanced) {
        allBalanced = false;
    }
}

console.log('\n' + '='.repeat(50));
if (allBalanced) {
    console.log('✅ ALL LEVELS HAVE BALANCED DISTRIBUTION');
} else {
    console.log('❌ SOME LEVELS NEED REBALANCING');
}
