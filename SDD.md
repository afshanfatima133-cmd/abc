# Software Design Description (SDD)
# SwapNShare — Marketplace Platform + Admin Dashboard

**Document ID:** SNS-FYP-SDD-001  
**Version:** 1.0  
**Date:** 2026-01-04  
**Prepared For:** Final Year Project (FYP) Submission  
**Prepared By:** SwapNShare Team  

---

## Revision History

| Version | Date | Author | Description |
|---|---:|---|---|
| 1.0 | 2026-01-04 | SwapNShare Team | Initial complete SDD for FYP |

---

## Table of Contents

1. Introduction  
2. System Overview  
3. Architectural Design  
4. Data Design  
5. Component Design (Backend)  
6. Component Design (Dashboard)  
7. Interface Design (API Contracts)  
8. Security Design  
9. Error Handling & Logging Design  
10. Performance & Scalability Design  
11. Deployment Design  
12. Testing Strategy  
13. Coding Standards & Maintainability  
14. Diagram Placeholders (No Diagrams)  
15. Appendices  

---

## 1. Introduction

### 1.1 Purpose
This Software Design Description (SDD) explains **how SwapNShare is designed and implemented** to satisfy the requirements defined in `SRS.md`. It describes architecture, components, data design, interfaces, security measures, and deployment approach.

### 1.2 Scope
This SDD covers:
- Backend REST API (Express.js) design and modules
- Admin Dashboard (Next.js) design and modules
- Database design in MongoDB via Mongoose schemas
- Integration contracts between dashboard and backend

### 1.3 Definitions and Acronyms
See `SRS.md` Section 1.3.

---

## 2. System Overview

SwapNShare is a **two-tier application**:
- **Presentation Layer:** Admin Dashboard (Next.js/React, TypeScript)
- **Application/Data Layer:** Backend API (Node.js/Express) + MongoDB (Mongoose)

### 2.1 Key Design Goals
- Security-first: server-side enforcement of auth and role checks
- Modularity: controllers/services/models separation
- Maintainability: consistent response schema, centralized utilities
- Scalability: pagination and indexing support for large datasets

### 2.2 High-Level Flow
1. Admin logs in via dashboard.
2. Backend validates user and returns JWT token.
3. Dashboard stores token (cookie/session) and uses it in subsequent API calls.
4. Admin performs CRUD operations; dashboard uses API endpoints.

---

## 3. Architectural Design

### 3.1 Architectural Style
**Client–Server + Layered Architecture**
- **Client (Dashboard)**: UI, forms, state, and API integration.
- **Server (Backend)**: routing, auth middleware, business logic, validation, persistence.

### 3.2 Layering (Backend)
- **Routes Layer:** Maps endpoints to controllers.
- **Controller Layer:** Validates request shape, calls service layer, returns response.
- **Service Layer:** Core business rules and orchestration.
- **Model Layer:** Mongoose schemas + database access.
- **Middleware Layer:** JWT auth, role checks, request validations.
- **Utilities:** helper functions (default admin creation, token utilities, etc.)

### 3.3 Layering (Dashboard)
- **Pages:** Next.js route pages for each module.
- **Components:** Reusable UI pieces (tables, modals, cards).
- **API Client:** Axios wrapper for consistent base URL and auth headers.
- **State/Storage:** Cookies/local storage for auth token (as implemented).

### 3.4 Deployment Topology (Logical)
- Dashboard runs on port **3000** (dev).
- Backend runs on port **5001** (dev).
- MongoDB runs on port **27017** (local dev).

### 3.5 Diagram Placeholders (Architecture)
Diagrams are not included by request; placeholders are provided in Section 14.

---

## 4. Data Design

### 4.1 Database Choice
**MongoDB** was selected due to:
- Flexible schema evolution during FYP iterations
- Document structure fits nested order/shipping address model
- Mongoose validation provides strong model-level rules

### 4.2 Data Collections (Entities)
- `users`
- `products`
- `categories`
- `orders`
- `vendorrequests`
- `contactrequests`

### 4.3 Relationships (Conceptual)
- A **Product** references a **Category** (and optional subcategory).
- An **Order** references a **User** and contains **OrderItems** referencing Products.
- A **VendorRequest** may correspond to a vendor onboarding flow (approval creates/updates vendor user).

### 4.4 Indexing Strategy (Recommended)
- `users.email` unique index
- `products.category`, `products.status` indexes for filtering
- `orders.user`, `orders.createdAt` for listing and sorting
- `categories.name` unique index (recommended)

### 4.5 Data Integrity Rules
- Vendor role implies additional required fields (CNIC, license, business email)
- Product status must be within supported enum set
- Order requires totals and shipping address required fields

---

## 5. Component Design (Backend)

### 5.1 Entry Points
- `server.js`: loads configuration, connects to DB, starts server
- `app.js`: Express app setup, middleware registration, routes mounting

### 5.2 Routing Modules
The backend is organized under versioned routes:
- `/api/v1/admin/*`
- `/api/v1/users/*`
- `/api/v1/product/*`
- `/api/v1/order/*`

### 5.3 Controllers (Responsibilities)
Controllers are responsible for:
- Parsing input and validating minimal request requirements
- Calling service methods
- Returning consistent JSON response format
- Handling known errors with proper HTTP codes

Typical controller pattern:
- `try/catch` around service call
- validate params (e.g., id format)
- return `{ success: true, data }` on success
- return `{ success: false, error }` on failure

### 5.4 Services (Business Logic)
Services encapsulate business rules and database operations. Main services include:
- **User Service**
  - Login/register (if present)
  - Vendor request management
  - Contact request management
  - User profile/administration operations
- **Product Service**
  - Category CRUD
  - Product CRUD
  - Product status and stock rules
- **Order Service**
  - Order listing/detail
  - Update order status
  - Ensure totals and shipping address validation

**Service responsibilities:**
- Ensure domain rules are enforced regardless of UI
- Perform database operations (create/find/update/delete)
- Normalize/shape return objects for controllers

### 5.5 Middleware Design
Middleware provides cross-cutting concerns:
- **Auth middleware**
  - Extract token from header/cookie (implementation dependent)
  - Verify token signature and expiry
  - Attach decoded user identity to request context
- **Role/permission checks**
  - Ensure request user has admin rights for admin routes
- **Validation helpers**
  - Validate MongoDB ObjectId in params
  - Validate request bodies (required fields)

### 5.6 Models (Mongoose Schemas)
Each entity has a schema that provides:
- field constraints (required, enum, default)
- unique indexes where applicable
- timestamps
- referenced relationships via ObjectId

**Key design note:** For vendor users, certain fields are conditionally required and/or unique. This prevents null-unique conflicts and ensures correct vendor validation.

### 5.7 Response & Error Contract (Backend Standard)
To prevent frontend parsing issues, all endpoints should follow a consistent structure:

**Success:**
```json
{ "success": true, "data": { } }
```

**Error:**
```json
{ "success": false, "error": "message" }
```

And use meaningful HTTP codes:
- 200 OK, 201 Created
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 500 Internal Server Error

---

## 6. Component Design (Dashboard)

### 6.1 Routing & Page Structure
The dashboard uses Next.js routing with feature pages such as:
- Login
- Dashboard overview
- Manage Products
- Manage Categories
- Manage Orders
- Manage Users
- Vendor Requests
- Contact Requests

### 6.2 UI Components
Reusable components include:
- Sidebar / navigation
- Data tables (list view)
- Modal forms (create/edit)
- Cards (KPIs, activity)
- Inputs and buttons

### 6.3 API Integration Layer
The dashboard uses a centralized API client to:
- define base URL via environment variables
- attach auth token dynamically
- standardize error parsing and user messaging

**Design goals:**
- No page should manually build headers; use API helper function
- Handle 401 globally → redirect to login / clear token

### 6.4 State Management Approach
For FYP scope:
- Local component state for forms and lists
- Token stored in cookie/local storage (as implemented)
- On mount: fetch module data and render tables

### 6.5 Form Design & Validation
Forms are designed as controlled inputs:
- initial values must be empty string / default values (avoid undefined)
- submit disabled until required fields are present
- show field-level errors + top-level error message

---

## 7. Interface Design (API Contracts)

### 7.1 API Base URL
Dev base URL:
- `http://localhost:5001/api/v1/`

### 7.2 Authentication Contract
**Login Request**
- Input: `{ email, password }`
- Output: `{ success, token, data }` (token location depends on implementation)

**Authorized Requests**
- Header: `Authorization: Bearer <token>` (recommended)
- Or cookie token (if implemented)

### 7.3 Key Endpoint Groups (High-Level)
- **Admin**: login, get users, delete user
- **Users**: login/register (if present), vendor requests, contact requests
- **Product**: products CRUD, categories CRUD
- **Order**: orders list/detail, status update

### 7.4 Example Contract (Category Creation)
**Request**
```json
{ "name": "Electronics", "description": "All electronic items", "parentCategory": null }
```

**Response**
```json
{ "success": true, "data": { "id": "…", "name": "Electronics" } }
```

### 7.5 Error Contract
All errors should return a consistent shape and a message suitable for display in UI.

---

## 8. Security Design

### 8.1 Authentication
- JWT token generation at login
- bcrypt password hashing (one-way)
- token expiry to limit risk

### 8.2 Authorization
- Role-based checks enforced at backend
- Admin-only endpoints protected

### 8.3 Input Validation & Sanitization
- Validate ObjectId parameters
- Validate required fields in bodies
- Reject invalid enums/status values

### 8.4 Secrets Management
- `.env` values (DB URI, JWT secret) must not be committed
- Production secrets must be stored in secure secret manager or environment config

### 8.5 Security Threats and Mitigation (FYP Level)
- **Broken Auth** → enforce token checks server-side
- **Insecure password storage** → bcrypt hashing
- **Injection** → schema validation + avoid unsafe string concatenation
- **CORS** → configure allowed origins
- **Sensitive data exposure** → no secrets in repo, mask logs

---

## 9. Error Handling & Logging Design

### 9.1 Backend Error Strategy
- Centralized error responses (recommended)
- Log stack traces in development
- Return user-friendly messages to client

### 9.2 Frontend Error Strategy
- Show toast/alert for API failures
- If 401: clear session and redirect to login
- Maintain loading and empty states for lists

---

## 10. Performance & Scalability Design

### 10.1 Backend
- Pagination for list endpoints
- Database indexes for frequent queries
- Avoid N+1 queries; use populate carefully

### 10.2 Frontend
- Fetch only required data per screen
- Use memoization for expensive components (optional)
- Avoid repeated refetch loops

---

## 11. Deployment Design

### 11.1 Development Deployment (Local)
- MongoDB local service
- Backend `npm run dev` (nodemon)
- Dashboard `npm run dev`

### 11.2 Production Deployment (Recommended)
- Backend on VPS/Cloud + process manager (PM2)
- Dashboard on Vercel/Node server
- MongoDB Atlas for managed DB
- HTTPS and reverse proxy (Nginx)

### 11.3 Configuration Management
- Separate `.env` for dev/prod
- Use CI/CD to inject environment variables

---

## 12. Testing Strategy

### 12.1 Test Levels
- **Unit tests**: services and utilities
- **Integration tests**: routes + DB interactions
- **End-to-end tests**: dashboard flows (login, CRUD)

### 12.2 Core Test Scenarios (Minimum for FYP)
- Login success/failure
- Category create/update/delete
- Product create/update/delete
- Orders list + status update
- Unauthorized request returns 401

### 12.3 Test Data
- Use seed script for realistic demo data
- Ensure schemas align to avoid validation failures

---

## 13. Coding Standards & Maintainability

### 13.1 Backend Standards
- Keep controllers thin; business logic in services
- Reuse common validation helpers
- Follow consistent response shape
- Use meaningful names and modular files

### 13.2 Frontend Standards
- Keep API calls in centralized client file
- Use controlled inputs with safe defaults
- Maintain consistent UI patterns across pages

### 13.3 Versioning
- API versioned via `/api/v1/`
- Changes tracked via Git commits

---

## 14. Diagram Placeholders (No Diagrams Included)

### Figure 14.1: System Architecture Diagram (Placeholder)





### Figure 14.2: Layered Backend Architecture Diagram (Placeholder)





### Figure 14.3: Database ER / Data Model Diagram (Placeholder)





### Figure 14.4: Sequence Diagram — Admin Login (Placeholder)





### Figure 14.5: Sequence Diagram — Create Product (Placeholder)





### Figure 14.6: Activity Diagram — Order Status Update (Placeholder)





---

## 15. Appendices

### 15.1 Mapping to Requirements (Summary)
This design satisfies key SRS requirements:
- Auth/RBAC → Sections 5.5, 8
- CRUD modules → Sections 5–7
- Data validation → Section 4
- Performance → Section 10
- Deployment → Section 11

### 15.2 Notes for FYP Submission
- Replace diagram placeholders in Section 14 if required by supervisor.
- Keep `.env` private; submit sample env values in appendix if needed.


