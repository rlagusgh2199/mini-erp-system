# 🧾 Mini ERP System

1인 개발한 소규모 ERP 시스템으로, 매출 · 지출 · 재고를 통합 관리할 수 있는 웹 기반 프로젝트입니다.  
Spring Boot, React, Tailwind CSS를 기반으로 구성하였으며, 1~2주간의 단기 개인 프로젝트입니다.

---

## 📌 프로젝트 개요

- **개발자:** 김현호
- **개발 기간:** 약 1~2주
- **목적:** 실무에서 널리 쓰이는 REST API, Spring Boot, React를 직접 활용하여 백엔드-프론트 통합 프로젝트를 구현해보는 실습 목적입니다.

---

## ⚙️ 기술 스택

| 구성 | 기술 |
|------|------|
| Frontend | React, Tailwind CSS |
| Backend | Spring Boot, Spring Data JPA |
| Database | MySQL |
| 기타 | REST API, JWT 인증, Gradle

---

## 🧩 주요 기능

- 사용자 로그인 및 권한 기반 접근 제어
- JWT 기반 사용자 인증 및 인가 처리
- 매출 등록 / 조회 / 수정 / 삭제
- 재고 관리
- 지출 내역 관리
- 날짜별 필터링
- MySQL 기반 CRUD API 구성

---

## 📁 폴더 구조

```
mini-erp-system/
├── backend/     # Spring Boot 소스코드
├── frontend/    # React + Tailwind UI
├── db/          # MySQL DB 테이블 정의
└── README.md
```

---

## 🗃️ DB 테이블 구조 요약

- **user**: 로그인 정보, 권한 (id, username, password, role)
- **sales**: 매출 정보 (item, price, amount, total, date)
- **inventory**: 재고 정보 (name, price, qty, date)
- **expense**: 지출 정보 (category, amount, memo, date)

---

## 🚀 실행 방법 (로컬 기준)

### 🛠️ 백엔드 실행
```bash
cd backend
./gradlew bootRun
```

### 💻 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 🗄️ DB 실행
```bash
mysql -u root -p < db/erp_db_structure.sql
```

---

## 🖼️ 화면 예시 (선택)
> 주요 화면 스크린샷 첨부 예정

---

## 🎥 시연 영상 보기

📌 **아래 썸네일을 클릭하시면 실제 시연 영상을 보실 수 있습니다.**
[![Mini ERP System Demo](https://img.youtube.com/vi/xx11XfQ8Xeg/0.jpg)](https://youtu.be/xx11XfQ8Xeg)

> 전체 흐름과 인터랙션은 영상에서 확인할 수 있습니다.  
> 로그인 → 대시보드 → 매출/지출/재고 관리까지 주요 기능 순서대로 시연됩니다.

---


## 🙋‍♂️ 개발자
- GitHub: [@rlagusgh2199](https://github.com/rlagusgh2199)
