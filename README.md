# Cash Palace – Automation Assessment

This repo contains my solution for the Cash Palace automation task, covering both UI and API automation.

---

## Application
- URL: https://cash-palace-app.lovable.app  
- Login: Any username / `password123`

---

## Part 1 – UI Automation (Playwright)

**Tech Stack:** Playwright + TypeScript

## Run UI Tests
```bash
cd playwright
npm install
npx playwright test
```

## Run in UI mode:
```bash
npx playwright test --ui
```

## Part 2 – API Automation (Karate)

This module contains API tests for the transfer functionality using **Karate**.

---

## Why a Stub Server Is Used

The Cash Palace web application uses Mirage JS, which mocks API calls entirely in the browser.  
As a result, the `/api/transfer` endpoint is not exposed as a real backend HTTP service.

To still perform meaningful API automation, a local API stub has been implemented that mirrors the request/response contract observed from the UI.

---

## API Under Test

**Endpoint**
```http
POST /api/transfer
```

## Run API Stub:
```bash
cd api-stub
npm install
npm start # API stub starts listening on http://localhost:3001
```

## Run Karate Tests
```bash
cd karate
mvn test
```
