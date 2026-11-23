# SMART CAMPUS 360 — Full Frontend Application (Starter)

This ZIP contains a multi-page, responsive React + Vite campus-management frontend. It is a broad interactive UI prototype with a consistent dark visual system.

## Run in VS Code
1. Install Node.js 18+ (Node.js 20+ recommended).
2. Extract this ZIP.
3. Open the `SMART_CAMPUS_360_FULL_APP` folder in VS Code.
4. Open **Terminal → New Terminal**.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the localhost URL printed in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Frontend modules included
- Campus dashboard with summary cards, charts, schedule, quick links and attention items
- Role switch preview: Student, Faculty, College Admin, HOD, Principal, Parent
- Student directory with search and add-student demo form
- Timetable weekly grid
- Attendance session UI: dynamic QR, consent-based face, biometric and manual methods; live roster demo
- Recorded Classes library/player UI, bookmarks and AI/transcript action placeholders
- Assignments, Learning Hub and Exams & Results workspaces
- Project Hub, Placement & Career, Library, Lab, Hostel, Transport, Canteen, Events & Clubs
- Fees & Finance, Safety & Security, Grievances, Parent Portal, Reports & Analytics, Notifications and Settings
- Responsive sidebar and mobile layout

## Current implementation boundary
This is a **frontend demo/prototype**, not a production-ready college ERP. Several module pages are structured UI previews and some actions show demo feedback. Data is local React state and resets on refresh. No real student records or credentials are included.

The following require backend services and approved integrations before they can work in a real college:
- Authentication, account provisioning, password reset, RBAC and audit logs
- Persistent database, APIs, file uploads, backups and notifications
- Dynamic QR token creation/validation and attendance persistence
- Face verification with explicit consent, secure enrollment and human review
- Fingerprint/biometric hardware integration (browser UI alone cannot access every device)
- CCTV camera/NVR integration, lecture recording, video transcoding, secure storage and publishing
- AI transcription, summaries, question answering, quiz generation and analytics
- Payment gateway and reconciliation, GPS bus tracking, SMS/email/push services

**Privacy and safety:** Face/biometric processing and classroom recording must be authorized by the institution, clearly disclosed, consent-based where required, access-controlled, retained only under policy, and offer suitable alternatives. Security CCTV footage must remain separate from student-facing educational lecture recordings.

## Suggested production architecture
- Frontend: React + Vite
- Backend: Node.js + Express (or NestJS)
- Database: PostgreSQL
- Authentication: secure server-side sessions or short-lived access tokens + refresh flow
- File/video storage: private object storage with signed access URLs
- Background jobs: Redis + BullMQ or RabbitMQ
- Video: approved camera/NVR ingest + FFmpeg processing pipeline
- AI: separate authenticated service for transcription and learning tools
- Deployment: HTTPS, environment variables, backups, monitoring and audit logging

## Next development steps
1. Connect backend authentication and real role permissions.
2. Add PostgreSQL models and API routes for institutions, users, courses, timetable and attendance.
3. Implement student/faculty/parent/admin dashboards with role-specific data.
4. Integrate approved camera recording and recorded-class publishing.
5. Implement remaining module APIs, tests, security review and deployment.
