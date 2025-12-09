# CEFR Teacher Dashboard

학생 테스트 결과를 관리하고 분석하기 위한 종합적인 교사 대시보드 시스템입니다.

## 🎯 주요 기능

### 1. **자동 결과 관리**
- 실시간 학생 제출 결과 자동 로딩
- 자동 채점 및 분석 시스템 연동
- 서버 기반 저장 및 로컬 저장소 백업

### 2. **강력한 검색 및 필터링**
- 다중 필드 검색 (이름, 학교, 반, 레벨, 점수)
- 레벨별 필터링
- 기간별 필터링 (오늘, 최근 7일, 최근 30일)
- 다양한 정렬 옵션

### 3. **학생 진행 추적**
- 개별 학생 성적 추세 분석
- 레벨 진행 상황 모니터링
- 학습 추세 및 개선 권고
- 다음 레벨 준비 상태 평가

### 4. **상세 분석 및 리포팅**
- 실시간 통계 및 차트
- 섹션별 성과 분석
- 다양한 포맷으로 내보내기 (CSV, JSON, HTML)
- 인쇄용 상세 리포트 생성

## 🚀 설치 및 설정

### 1. **Node.js 서버 설정**

```bash
# 프로젝트 디렉토리로 이동
cd moon-cefr-level-test

# 의존성 설치
npm install

# 서버 시작
npm start
```

서버가 성공적으로 시작되면 다음 URL에서 접근할 수 있습니다:
- **Teacher Dashboard**: http://localhost:3001/teacher-dashboard.html
- **API Endpoints**: http://localhost:3001/api/

### 2. **서버리브 실행**

Node.js 서버 없이도 대시보드를 사용할 수 있습니다:
- `teacher-dashboard.html` 파일을 브라우저에서 직접 열기
- 자동으로 로컬 저장소를 사용하여 데이터 관리

## 📋 파일 구조

```
moon-cefr-level-test/
├── teacher-dashboard.html          # 메인 대시보드
├── server.js                       # Node.js 서버
├── package.json                    # 의존성 설정
├── js/
│   ├── answer-data.js              # 답안 데이터
│   ├── answer-checker.js           # 채점 시스템
│   ├── chart-config.js             # 차트 설정
│   └── submission-handler.js       # 제출 관리자
├── submissions/                    # 학생 제출 결과 저장소
│   ├── sample_student1_A1_20251209.json
│   ├── sample_student2_A1_20251209.json
│   └── ...
└── [기존 테스트 파일들...]
```

## 🎨 사용 방법

### 1. **기본 사용**

1. **서버 시작**: `npm start` 명령으로 서버 실행
2. **대시보드 접속**: http://localhost:3001/teacher-dashboard.html
3. **결과 확인**: 자동으로 학생 제출 결과 로딩됨
4. **필터링**: 상단 컨트롤을 사용하여 결과 필터링
5. **상세 보기**: '상세' 버튼으로 개별 결과 확인
6. **진행 추적**: '진행' 버튼으로 학생 성적 추세 확인

### 2. **검색 및 필터링**

- **검색**: 이름, 학교, 반, 레벨, 점수 등 다중 검색
- **레벨 필터**: 특정 CEFR 레벨만 보기
- **기간 필터**: 특정 기간 동안의 결과만 보기
- **정렬**: 날짜, 점수, 이름, 학교, 레벨 등으로 정렬

### 3. **데이터 내보내기**

1. **결과 내보내기** 버튼 클릭
2. 원하는 포맷 선택:
   - `1`: CSV (기본)
   - `2`: JSON
   - `3`: Excel 호환 CSV
   - `4`: 상세 HTML 리포트

### 4. **학생 진행 추적**

1. 학생 목록에서 '진행' 버튼 클릭
2. 다음 정보 확인 가능:
   - 평균 점수 및 최고 점수
   - 완료한 레벨 수
   - 학습 추세 (향상/안정/하락)
   - 다음 레벨 준비 상태
   - 시간별 성적 차트

## 🔧 API 엔드포인트

### GET /api/submissions
모든 학생 제출 결과 가져오기
```javascript
const response = await fetch('http://localhost:3001/api/submissions');
const submissions = await response.json();
```

### POST /api/submissions
새로운 학생 제출 결과 저장하기
```javascript
const submission = {
  studentInfo: { name: "김지민", school: "서울중학교", grade: "중1", class: "A반" },
  level: "A1",
  answers: { Q1: "B", Q2: "C", ... },
  score: 85,
  passed: true
};

const response = await fetch('http://localhost:3001/api/submissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(submission)
});
```

### GET /api/stats
통계 정보 가져오기
```javascript
const response = await fetch('http://localhost:3001/api/stats');
const stats = await response.json();
// 반환: { totalStudents, avgScore, passRate, levelCounts, ... }
```

## 📊 데이터 형식

### 학생 제출 결과 형식
```json
{
  "studentInfo": {
    "name": "학생 이름",
    "school": "학교 이름",
    "grade": "학년",
    "class": "반"
  },
  "level": "A1",
  "answers": {
    "Q1": "B",
    "Q2": "C",
    "Q3": "D",
    ...
  },
  "score": 85,
  "passed": true,
  "submittedAt": "2025-12-10T10:30:00.000Z",
  "sectionResults": [
    {
      "name": "Reading Comprehension",
      "correct": 7,
      "total": 8,
      "percentage": 88
    },
    ...
  ],
  "feedback": {
    "level": "good",
    "message": "Well Done! You have passed the A1 level.",
    "recommendations": ["Focus on improving your weaker areas"]
  }
}
```

## 🛠️ 개발 및 커스터마이징

### 1. **새로운 차트 추가**
```javascript
// charts-section에 새 차트 컨테이너 추가
<div class="chart-container">
    <h3 class="chart-title">새로운 차트</h3>
    <canvas id="newChart"></canvas>
</div>

// JavaScript에서 차트 생성
function updateNewChart() {
    const ctx = document.getElementById('newChart');
    new Chart(ctx, {
        type: 'bar',
        data: { /* 데이터 */ },
        options: { /* 옵션 */ }
    });
}
```

### 2. **새로운 필터 추가**
```html
<!-- controls 섹션에 새 필터 추가 -->
<div class="control-group">
    <label for="newFilter">새 필터</label>
    <select id="newFilter">
        <option value="">전체</option>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
    </select>
</div>
```

```javascript
// filterResults 함수에 필터 로직 추가
function filterResults() {
    // 기존 필터 로직...

    const newFilter = document.getElementById('newFilter').value;
    if (newFilter) {
        filteredSubmissions = filteredSubmissions.filter(submission => {
            // 필터 조건 적용
            return submission.someField === newFilter;
        });
    }

    sortResults();
}
```

## 🔒 보안 고려사항

1. **파일 접근 제한**: submissions 디렉토리에 대한 직접 접근 제한
2. **입력 검증**: 모든 사용자 입력 검증 및 정화
3. **디렉토리 트래버설 방지**: 파일 시스템 접근 시 경로 검증
4. **크기 제한**: 업로드 파일 크기 제한

## 🐛 문제 해결

### 1. **서버가 시작되지 않을 경우**
```bash
# 포트 확인
netstat -ano | findstr :3001

# 다른 포트로 시작
PORT=3002 npm start
```

### 2. **데이터가 로딩되지 않을 경우**
- submissions 디렉토리 확인
- 파일 권한 확인
- JSON 파일 형식 검증

### 3. **차트가 표시되지 않을 경우**
- Chart.js 라이브러리 로딩 확인
- 콘솔 에러 확인
- 데이터 형식 검증

## 📞 지원 및 피드백

문제가 발생하거나 개선 사항이 있을 경우:
1. 콘솔 에러 로그 확인
2. 데이터 형식 검증
3. GitHub Issues에 문제 보고

## 🔄 업데이트 내역

### v1.0.0 (2025-12-10)
- 초기 버전 릴리스
- 기본 대시보드 기능
- 자동 로딩 및 필터링
- 학생 진행 추적
- 다양한 내보내기 옵션

---

**CEFR Teacher Dashboard**는 영어 교육자들을 위한 강력한 도구입니다. 효율적인 학생 관리와 데이터 기반의 교육적 의사결정을 지원합니다.