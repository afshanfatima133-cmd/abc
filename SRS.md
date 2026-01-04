# Software Requirements Specification (SRS)
# SwapNShare — Marketplace Platform + Admin Dashboard

**Document ID:** SNS-FYP-SRS-001  
**Version:** 1.0  
**Date:** 2026-01-04  
**Prepared For:** Final Year Project (FYP) Submission  
**Prepared By:** SwapNShare Team  

---

## Revision History

| Version | Date | Author | Description |
|---|---:|---|---|
| 1.0 | 2026-01-04 | SwapNShare Team | Initial complete SRS for FYP |

---

## Table of Contents

1. Introduction  
2. Overall Description  
3. System Features (Functional Requirements)  
4. External Interface Requirements  
5. Non‑Functional Requirements  
6. Data Requirements  
7. Use Cases (Textual)  
8. Business Rules  
9. Assumptions and Dependencies  
10. Constraints  
11. Requirements Traceability Matrix (RTM)  
12. Acceptance Criteria  
13. Appendices (Glossary, Acronyms)  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the requirements for **SwapNShare**, a full‑stack marketplace/e‑commerce management platform consisting of:
- A **Backend REST API** (Node.js/Express + MongoDB)
- An **Admin Dashboard** (Next.js + TypeScript)

The purpose of the system is to support administrative management of marketplace operations including **authentication**, **users**, **vendors**, **products**, **categories**, **orders**, and **customer contact requests**.

This document is intended for:
- FYP evaluators/supervisors
- Developers and testers
- Future maintainers

### 1.2 Scope
SwapNShare provides an admin‑focused dashboard for managing the marketplace data and operations. The system supports:
- Secure admin login and session handling
- CRUD for products, categories, orders, and users
- Vendor request workflow
- Contact request management
- Basic analytics/overview for dashboard (KPIs, summaries)

Out of scope (for this version):
- Customer storefront UI (end‑user shopping web/app)
- Payment gateway integration (Stripe/JazzCash/EasyPaisa etc.)
- Real‑time chat between buyer and seller
- Delivery partner integration

### 1.3 Definitions, Acronyms, and Abbreviations
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **JWT**: JSON Web Token
- **RBAC**: Role‑Based Access Control
- **SRS**: Software Requirements Specification
- **SDD**: Software Design Description
- **Vendor**: A user who sells products (requires approval/verification)

### 1.4 References
- IEEE 29148 (requirements specification guideline) — followed conceptually
- MongoDB + Mongoose documentation
- Next.js / React documentation

### 1.5 Overview
Section 2 describes the system context and users. Section 3 defines the functional requirements as system features. Sections 4–6 cover interfaces and quality requirements. Sections 7–12 provide use cases, rules, traceability, and acceptance criteria.

---

## 2. Overall Description

### 2.1 Product Perspective
SwapNShare is a web‑based system with a separated frontend and backend:
- **Admin Dashboard (Next.js)** consumes the **Backend REST API (Express)**.
- **MongoDB** stores persistent system data.

#### 2.1.1 System Context (High Level)
- Admin interacts with Dashboard (browser).
- Dashboard interacts with Backend via HTTP(S).
- Backend interacts with MongoDB.

### 2.2 Product Functions (High-Level)
- Authentication: admin login, token issuance, authorization checks
- User management: list users, view details, delete/disable (admin actions)
- Vendor workflow: vendor requests listing, approval/rejection
- Category management: create/update/delete categories and subcategories
- Product management: create/update/delete products; assign categories; manage status/stock
- Order management: list orders; view order details; update status; view totals/shipping details
- Contact request management: list and track customer messages

### 2.3 User Classes and Characteristics

#### 2.3.1 Admin (Primary User)
- Has full access to dashboard features
- Performs moderation and operational management
- Requires secure login and persistent session

#### 2.3.2 Vendor (System Actor)
- May exist as a role in the database
- Vendor onboarding may require request + admin approval
- Vendor data includes business fields (license, CNIC, business email, etc.)

#### 2.3.3 Customer (System Actor)
- Can exist in the database as a normal user
- Not the primary UI user in this phase (dashboard only)

### 2.4 Operating Environment
- **Client**: Chrome (and modern browsers), macOS/Windows/Linux
- **Server**: Node.js runtime
- **Database**: MongoDB Community/Atlas
- **Network**: localhost for development; HTTPS recommended in production

### 2.5 Design and Implementation Constraints
- REST APIs must follow consistent JSON response format
- JWT must be used for protected endpoints
- MongoDB schema validation via Mongoose
- Dashboard must be responsive for typical laptop screens (1366×768 and above)

### 2.6 User Documentation
Documentation artifacts included:
- `README.md` (setup, run instructions)
- This `SRS.md` and `SDD.md`

### 2.7 Assumptions and Dependencies
- MongoDB is available and running
- Admin credentials exist (default admin seeding/creation)
- Environment variables are configured correctly

---

## 3. System Features (Functional Requirements)

> **Notation:** Requirements are labeled as **FR-xx** (Functional Requirement).

### 3.1 Authentication & Authorization

#### FR-01: Admin Login
**Description:** System shall allow admin to log in using email and password.  
**Inputs:** email, password  
**Outputs:** JWT token, admin profile data  
**Preconditions:** Admin account exists.  
**Postconditions:** Session token is stored client-side and used for subsequent calls.

#### FR-02: Token-Based Authorization
**Description:** System shall protect all admin routes and APIs using JWT tokens.  
**Behavior:** Requests without valid token must be rejected with HTTP 401.

#### FR-03: Role-Based Access Control (RBAC)
**Description:** System shall restrict administrative functions to admin role only.  
**Rules:** Non-admin tokens must not access admin endpoints.

---

### 3.2 User Management

#### FR-04: View Users List
System shall display a list of users including basic attributes (name, email, role, created date).

#### FR-05: View User Details
System shall allow admin to view full details of a selected user.

#### FR-06: Delete / Disable User
System shall allow admin to delete or disable a user account (based on implemented backend behavior).

#### FR-07: Search & Filter Users
System shall allow filtering users by role and searching by name/email.

---

### 3.3 Vendor Requests Management

#### FR-08: Submit Vendor Request (System Capability)
System shall store vendor request data (name, email, phone number, CNIC) when a vendor application is created.

#### FR-09: View Vendor Requests
System shall allow admin to list vendor requests with status (Pending/Approved/Rejected).

#### FR-10: Approve/Reject Vendor Request
System shall allow admin to approve or reject vendor requests and store decision status.

---

### 3.4 Category Management

#### FR-11: Create Category
System shall allow admin to create a category with name and optional description.

#### FR-12: Create Subcategory
System shall allow admin to create a subcategory linked to a parent category.

#### FR-13: Read Categories
System shall list all categories and subcategories for selection and management.

#### FR-14: Update Category
System shall allow admin to update category fields.

#### FR-15: Delete Category
System shall allow admin to delete a category.

---

### 3.5 Product Management

#### FR-16: Create Product
System shall allow admin to create products with required attributes (name, price, category, status, etc.).

#### FR-17: Read Products
System shall list products with pagination/sorting (as supported) and show key fields.

#### FR-18: Update Product
System shall allow admin to update product details including stock and status.

#### FR-19: Delete Product
System shall allow admin to delete a product.

#### FR-20: Product Status Rules
System shall support product status values: **Active**, **Inactive**, **Out of Stock**, **Discontinued**.

---

### 3.6 Order Management

#### FR-21: Create Order (System Capability)
System shall store order data including items, shipping address, subtotal, and total.

#### FR-22: View Orders List
System shall allow admin to list all orders with status and totals.

#### FR-23: View Order Details
System shall display full order details including shipping address, items, and prices.

#### FR-24: Update Order Status
System shall allow admin to update order status (e.g., Pending → Processing → Shipped → Delivered).

---

### 3.7 Contact Requests (Customer Support)

#### FR-25: Submit Contact Request (System Capability)
System shall store customer contact requests including name, subject, and message.

#### FR-26: View Contact Requests
System shall allow admin to list contact requests and view details.

#### FR-27: Update Contact Request Status
System shall allow admin to mark requests as In Progress / Resolved (if supported).

---

## 4. External Interface Requirements

### 4.1 User Interfaces (Admin Dashboard)
The UI shall provide:
- Login page with validation and error messages
- Sidebar navigation for modules (Products, Categories, Orders, Users, Requests)
- Tables with search/filter
- Modal forms for add/edit operations
- Toast/alert messages for success/failure

### 4.2 Hardware Interfaces
No specialized hardware required.

### 4.3 Software Interfaces
- **MongoDB** (local or Atlas)
- **Node.js** runtime
- **Browser**: Chrome preferred

### 4.4 Communications Interfaces
Dashboard communicates with backend via HTTP:
- Base URL example: `http://localhost:5001/api/v1/`
- JSON request/response format
- JWT via Authorization header or cookie (as implemented)

---

## 5. Non‑Functional Requirements

> **Notation:** Requirements are labeled as **NFR-xx**.

### 5.1 Security
- **NFR-01**: Passwords shall be stored hashed using bcrypt (or equivalent).
- **NFR-02**: Protected APIs shall require valid JWT (HTTP 401 if missing/invalid).
- **NFR-03**: Role checks shall be enforced server-side (no UI-only security).
- **NFR-04**: Environment secrets shall not be committed to GitHub.

### 5.2 Performance
- **NFR-05**: Typical dashboard API responses should return within 1–3 seconds on local dev.
- **NFR-06**: List endpoints should support pagination to avoid excessive payload size.

### 5.3 Reliability & Availability
- **NFR-07**: System shall recover gracefully from server errors with readable messages.
- **NFR-08**: Database connection failures shall be logged clearly on backend.

### 5.4 Usability
- **NFR-09**: Admin actions must provide confirmation feedback (success/failure).
- **NFR-10**: Forms must validate required fields before submission.

### 5.5 Maintainability
- **NFR-11**: Backend shall follow modular structure (routes/controllers/services/models).
- **NFR-12**: Codebase shall follow consistent naming and formatting.

### 5.6 Portability
- **NFR-13**: System shall run on macOS/Windows/Linux with Node.js + MongoDB.

---

## 6. Data Requirements

### 6.1 Data Entities
Primary entities (collections):
- Users
- Products
- Categories (including subcategories)
- Orders
- VendorRequests
- ContactRequests

### 6.2 Data Validation Rules (Examples)
- User email: unique, valid format
- Vendor role: additional required fields (businessEmail, CNIC, businessLicense, etc.)
- Product status: must match allowed enum
- Order totals: subtotal and total required; shippingAddress has required subfields

### 6.3 Data Retention
For FYP scope:
- All data persists in MongoDB until explicitly deleted by admin or via database reset.

---

## 7. Use Cases (Textual)

> Diagrams are **not included** by request; placeholders are provided in Section 7.1.

### 7.1 Diagram Placeholders (No Diagrams Included)

#### Use Case Diagram (Placeholder)





#### Activity Diagram — “Admin Login” (Placeholder)





#### Activity Diagram — “Create Category” (Placeholder)





#### Sequence Diagram — “Create Product” (Placeholder)





#### Sequence Diagram — “Update Order Status” (Placeholder)





### 7.2 UC-01: Admin Login
**Primary Actor:** Admin  
**Goal:** Access dashboard securely  
**Preconditions:** Admin exists; backend running  
**Main Flow:**
1. Admin opens login page.
2. Admin enters email and password.
3. System validates inputs.
4. System calls backend login API.
5. Backend verifies credentials and returns JWT.
6. Dashboard stores token and navigates to dashboard home.
**Alternate Flows:**
- A1: Invalid credentials → show error message; remain on login page.
- A2: Backend unavailable → show “Server not reachable” message.
**Postconditions:** Admin session established.

### 7.3 UC-02: Create Category
**Actor:** Admin  
**Preconditions:** Admin is logged in  
**Main Flow:**
1. Admin opens “Manage Categories”.
2. Admin clicks “Add Category”.
3. Admin fills name/description.
4. System validates form.
5. System submits to backend.
6. Backend saves category and returns created record.
7. UI refreshes list and confirms success.
**Alternates:**
- A1: Missing name → show validation error.
- A2: Unauthorized (401) → redirect to login.

### 7.4 UC-03: Create Product
**Actor:** Admin  
**Preconditions:** Categories exist; admin logged in  
**Main Flow:**
1. Admin opens “Manage Products”.
2. Click “Add Product”.
3. Fill product fields (name, price, category, status, stock).
4. Submit; backend creates product.
5. UI refreshes and shows product in list.

### 7.5 UC-04: View Orders & Update Status
**Actor:** Admin  
**Main Flow:**
1. Admin opens “Orders”.
2. Select an order; view details.
3. Update status (Processing/Shipped/Delivered).
4. Backend updates order; UI confirms.

### 7.6 UC-05: Manage Vendor Requests
**Actor:** Admin  
**Main Flow:**
1. Admin opens “Vendor Requests”.
2. Select request; review details.
3. Approve or reject.
4. Backend updates status; UI refreshes list.

### 7.7 UC-06: Handle Contact Requests
**Actor:** Admin  
**Main Flow:**
1. Admin opens “Contact Requests”.
2. View message details.
3. Mark request as resolved (if supported).

---

## 8. Business Rules

> **BR-xx** denotes Business Rules.

- **BR-01**: Only Admin can access dashboard operations.
- **BR-02**: Product status must be one of: Active, Inactive, Out of Stock, Discontinued.
- **BR-03**: Vendor role requires vendor verification fields (CNIC, business license, etc.).
- **BR-04**: Orders must contain subtotal and total and a valid shipping address.
- **BR-05**: Category names should be unique (recommended; enforce if schema supports).
- **BR-06**: Deleting categories/products should be controlled (warn admin about impacts).

---

## 9. Assumptions and Dependencies

- **A-01**: MongoDB is installed and accessible.
- **A-02**: Default admin is present or auto-created.
- **A-03**: Network is available between dashboard and backend.
- **A-04**: Browser supports modern JavaScript features.

Dependencies:
- Node.js
- MongoDB
- npm packages (Express, Mongoose, Next.js, etc.)

---

## 10. Constraints

- **C-01**: System must run locally using ports (backend 5001, dashboard 3000) unless changed.
- **C-02**: Must follow a consistent API response structure to avoid frontend parsing issues.
- **C-03**: `.env` files must remain private (not committed).
- **C-04**: FYP submission requires complete documentation (SRS + SDD).

---

## 11. Requirements Traceability Matrix (RTM)

| Feature | Requirement IDs | Module |
|---|---|---|
| Authentication | FR-01..FR-03, NFR-01..NFR-04 | Backend Auth + Dashboard Login |
| Users | FR-04..FR-07 | Admin/User services + dashboard pages |
| Vendor Requests | FR-08..FR-10 | User services + dashboard pages |
| Categories | FR-11..FR-15 | Product services + dashboard pages |
| Products | FR-16..FR-20 | Product services + dashboard pages |
| Orders | FR-21..FR-24 | Order services + dashboard pages |
| Contact Requests | FR-25..FR-27 | User services + dashboard pages |

---

## 12. Acceptance Criteria

### 12.1 Authentication
- Admin can log in with valid credentials and reach dashboard.
- Invalid credentials return appropriate error message.
- Accessing protected pages without token redirects to login.

### 12.2 CRUD Operations
- Admin can create, view, update, and delete categories.
- Admin can create, view, update, and delete products.
- Admin can view orders and update order status.

### 12.3 Requests
- Admin can view vendor requests and approve/reject.
- Admin can view contact requests.

### 12.4 Quality
- API returns proper HTTP codes (200/201/400/401/404/500).
- UI provides clear feedback for actions.

---

## 13. Appendices

### 13.1 Glossary
- **Category/Subcategory**: A grouping mechanism for products.
- **Order**: A purchase record containing items, totals, and shipping details.

### 13.2 Acronyms
API, CRUD, JWT, RBAC, SRS, SDD.


