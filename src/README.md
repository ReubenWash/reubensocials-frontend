# 🌊 Rocials — Social Media Platform for Creators

Rocials is a **modern social media web app** that empowers creators to showcase exclusive content and allows fans to explore, engage, and support their favorite creators through secure payments.  
Built with **React.js**, it features a **clean monochromatic teal design**, responsive layout, and modular UI components.

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React.js (Vite) |
| **Routing** | React Router v6 |
| **Icons** | Font Awesome |
| **Styling** | CSS3 with global variables (`theme.css`) |
| **State Handling** | React Hooks (useState, useEffect) |
| **Fonts** | Poppins, Inter |
| **Image Assets** | Stored locally under `/src/assets/` |

---

## 🎨 Color Theme (Monochromatic Teal)

Defined in `theme.css`

| Variable | Color | Description |
|-----------|--------|-------------|
| `--primary-color` | `#008080` | Main Teal |
| `--primary-light` | `#E0F0F0` | Soft Teal Background |
| `--primary-dark` | `#006666` | Deep Teal Accent |
| `--text-color` | `#333333` | Primary Text |
| `--background-color` | `#FAFAFA` | Light Gray Background |
| `--border-color` | `#e0e0e0` | Subtle Borders |

This color system ensures **visual harmony**, **modern aesthetics**, and **consistent branding** across the entire interface.

---

## ✨ Features (Frontend)

✅ **User Authentication**  
- Sign Up / Sign In pages  
- Modern minimal login form  

✅ **Profile Page**  
- User info section  
- Posts grid display  

✅ **Explore Page**  
- Browse public posts  
- Open modal to view post details  
- Delete post option (frontend)  

✅ **Feed Page (Home)**  
- Post creation modal  
- Like, comment, and captioned posts  

✅ **Notifications Panel**  
- Slide-in panel for real-time notifications  
- Mark all as read option  

✅ **Messages Page**  
- Chat interface for DMs  

✅ **Payments Page**  
- Wallet balance display  
- “Pay Now” modal for exclusive content  

✅ **Search Page**  
- Explore users or content dynamically  

✅ **Responsive UI**  
- Sidebar adapts to mobile (bottom nav)
- Full scrollable feed in all viewports  

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/rocials-frontend.git
cd rocials-frontend

--install dependencies
npm install


--Run the development server
npm run dev

