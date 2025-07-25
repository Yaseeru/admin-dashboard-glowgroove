# 📦 GlowGroove Admin Dashboard (Frontend)

**GlowGroove** is a modern React-based admin interface for managing an e-commerce store specializing in **wellness, decor, and lifestyle** products. This dashboard enables administrators to manage users, products, and orders, and is connected to a secure backend REST API.

> 🛠️ **Backend Repository:** [GlowGroove API on GitHub](https://github.com/Yaseeru/glowgroove)  
> 🔗 **Live Backend URL:** [`https://glowgroove-2.onrender.com/`](https://glowgroove-2.onrender.com/)

---

## 🚀 Features

- 🔐 **Authentication**
  - Login with protected routes
  - Role-based access (`admin` only)

- 👥 **User Management**
  - View all users
  - Enable or disable accounts

- 🛍️ **Product Management**
  - Create, edit, and soft-delete products
  - Image preview, tags, features, specifications
  - Mark featured and active items

- 📦 **Order Management**
  - Paginated order list with search and filtering
  - Full order view with status updates

- 🧭 **Navigation**
  - Dashboard shortcuts
  - 404 fallback for invalid routes
  - Fully responsive (Tailwind CSS)

---

## 🧱 Tech Stack

| Layer      | Technology                                 |
|------------|---------------------------------------------|
| **UI**     | React, Tailwind CSS, React Router           |
| **API**    | Axios (`/services/*.js`)                    |
| **Auth**   | JWT (via backend middleware)                |
| **State**  | Local state (no Redux or Zustand)           |
| **Backend**| Express + MongoDB (hosted separately)       |

---

## 📁 Project Structure

```bash
frontend/
├── pages/           # Views (Dashboard, Users, Products, Orders)
├── services/        # Axios API modules
├── components/      # Reusable UI components
├── AppRoutes.jsx    # Route setup and protection
├── RequireAuth.jsx  # Role-based route guard
└── main.jsx         # Entry point
```

---

## 🔐 Access Instructions

Admin access is protected. Login credentials are validated via the backend:

```http
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

---

## 🧪 Test Credentials

Use seeded admin account for testing:

```
Email: admin@example.com  
Password: admin123
```

---

## 📸 Screenshots

### 🛍️ Product Management  
![Product Management Page](/screenshots/product-management.png)

### 📦 Order Details  
![Order Details View](/screenshots/order-details.png)

### 👥 User Dashboard  
![User Management](/screenshots/user-list.png)

---

## ⚙️ Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Yaseeru/admin-dashboard-glowgroove
   cd admin-dashboard-glowgroove
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**

   Create a `.env` file with the following:

   ```env
   VITE_API_URL=https://glowgroove-2.onrender.com/
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

---

## 🔗 Backend Integration

This frontend connects to a RESTful API that:

- Handles authentication, users, products, and orders
- Sends order status emails
- Implements SKU generation, pagination, and more

👉 Explore the backend repo: [GlowGroove Backend](https://github.com/Yaseeru/glowgroove)

---

## 📜 License & Attribution

This project was built for educational and portfolio purposes.  
Feel free to fork or adapt with attribution.

**Created by Abdulhamid Abdullahi Sulaiman**