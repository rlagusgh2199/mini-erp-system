# 🧾 Mini ERP System

간단한 소규모 ERP 시스템으로, 매출 · 지출 · 재고를 통합 관리할 수 있는 웹 기반 솔루션입니다.  
Spring Boot + React + Tailwind CSS 기반으로 구성되었으며, 약 1~2주간의 단기 프로젝트입니다.

## 📌 프로젝트 개요

- 📅 개발 기간: 1~2주
- 👨‍💻 개발자: 양민우 (개인 프로젝트)

## ⚙️ 기술 스택

| 구성 | 기술 |
|------|------|
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Spring Boot, Spring Data JPA |
| DB | MySQL |
| 기타 | REST API, JWT 인증 |

## 🧩 주요 기능

- 사용자 로그인/회원가입 (권한 기반 접근 제어)
- 매출 등록 / 조회 / 수정 / 삭제
- 지출 내역 관리
- 재고 현황 관리 및 수정
- 날짜별 필터링 기능
- MySQL 기반 CRUD API

## 🗃️ DB 테이블 구성

```sql
sales (id, item, price, amount, total, date)  
inventory (id, name, price, qty, date)  
expense (id, category, amount, memo, date)  
user (id, username, password, role)
