# Kanban Task Board

칸반보드 스타일의 태스크 관리 대시보드입니다.  
Drag & Drop, 검색/필터, localStorage 저장 기능을 포함합니다.

- 카드는 localStorage를 이용해 저장, 통계와 검색은 zustand를 이용해 저장하였습니다.

---

## 배포 URL

https://your-github-id.github.io/your-repo-name/

---

## 기술 스택

| 구분 | 사용 기술 |
|------|----------|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| DnD | @hello-pangea/dnd |
| Storage | localStorage |

---

## 개발 기간

2026.01.15 ~ 2026.01.17 (총 3일)

---

### Priority 1 (필수)
1. 기본기본 칸반보드
- [x] 3개 컬럼 (To Do / In Progress / Done)
- [x] 태스크 카드 표시 (제목 / 우선순위 / 생성일)

2. 태스크 추가 기능 
- [x] 새 태스크, 생성 또는 모달 (모달로 구현)
- [x] 필수 입력 제목, 우선순위
- [x] 선택입력: 설명

3. 데이터 저장 
- [x] localStorage를 활용한 영구 저장
- [x] 새로고침시 데이터 유지
- [x] 초기 샘플 데이터 10개 이상 (10개)

4. GitHub Pages 배포 
- [x] 필수: 접속 가능한 url 제공
- [x] 모든 구현 기능이 배포 환경에서 동작

### Priority 2 (권장)

1. 드래그 앤 드롭
- [x] 드래그 앤 드롭 컬럼 이동
- [x] 드래그 중 시각적 피드백
- [x] 드롭 영역 하이라이트

2. 태스크 관리 기능
- [x] 태스크 수정 (제목, 설명, 우선순위) + 추가로 태그, 할당된 사람 편집 가능
- [x] 태스크 삭제 (삭제 다이얼로그)
- [x] 태스크 상세 보기

3. 기본 검색
- [x] 제목 기반 실시간 검색
- [x] 검색 결과 즉시 반영
- [x] 검색어 없을 시 전체 표시

### Priority 3 (추가)

1. 고급 필터링
- [x] 우선순위 필터링
- [x] 상태별 필터링
- [x] 태그 시스템
- [ ] 태그별 필터
- [ ] 다중 필터 조합

2. 고급 필터링
- [x] 디바운싱 적용 (300ms)
- [x] 검색어 하이라이트
- [x] 최근 검색어 저장

3. UI/UX 개선
- [x] 반응형 디자인
- [ ] 애니메이션 효과
- [ ] 다크모드
- [x] 빈 상태 안내 메세지

4. 추가 기능
- [x] 태스크 통계
- [x] 정렬기능 (우선순위)
- [ ] 정렬기능 (날짜)
- [ ] 키보드 단축기

### 미구현 이유

1. 태그별 필터와 이와 더불어 다중 필터 조합 : 구현 당시 태그별 필터를 모든 카드에 나온 태그를 중심으로 하면 태그들이 너무 많아져 어떤 식으로 디자인을 해야할지 이로인한 로직은 어떻게 해아할지 감이 오지않아 구현하지 못했습니다. (하지만 다시 생각해보니 카드에 있는 태그를 클릭해서 필터를 적용하면 될 것 같다라는 생각이 듭니다...)
2. 애니메에션 효과 및 다크모드, 키보드 단축기 : 다른 기능적인 것들을 우선 구현하다보니 시간이 없어 하지 못했습니다
3. 정렬기능 날짜 : 구현 당시 날짜를 선택하면 해당 날짜에 해당하는 카드를 보여줘야 하나 라는 생각에 구현하지 못했습니다. (다시 생각해보니 최신순, 오래된순으로만 해도 될 것 같다라는 생각이 듭니다..)

---

## 태스트 데이터 구조

```tsx
export type CardPriority = "all" | "low" | "medium" | "high";
export type CardStatus = "all" | "todo" | "in-progress" | "done";

export interface CardProps {
  id: string;
  title: string;
  status: CardStatus;
  priority: CardPriority;
  createdAt: string;
  updatedAt: string;

  /**
   * @description optional
   */
  description?: string;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
}

```

---
## 실행 방법
```
pnpm install
pnpm dev
```

---

## AI 도구 활용

| 구분 | 사용 기술 |
|------|----------|
| ChatGPT | DnD 라이브러리 추천 및 로직 개선 |
| GitHub Copilot | 코드 자동완성 및 전체적인 스타일, 코드 오류 및 로직 개선 등  |

