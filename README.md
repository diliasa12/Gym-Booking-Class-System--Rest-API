# 🎟️Gym Booking Class System API

Sebuah RESTful API berbasis **Node.js + Express + MongoDB** untuk mengelola sistem pemesanan event.  
API ini memungkinkan **admin** membuat dan mengelola event, serta **user** untuk melihat, memesan, dan membatalkan event yang tersedia.

---

## 🚀 Tech Stack
- **Runtime:** Node.js (Express)
- **Database:** MongoDB + Mongoose ODM
- **Authentication:** JWT (JSON Web Token)
- **Logger:** Morgan / Winston
- **Environment:** dotenv
- **Enkripsi:** bcryptjs

---

## 🧩 Fitur Utama
### 👤 User
- Registrasi & Login dengan JWT
- Lihat daftar event tersedia
- Booking event (dengan pengecekan duplikasi)
- Melihat event yang telah dipesan
- Membatalkan booking event

### 🧑‍💼 Admin
- Menambahkan event baru
- Mengedit event (tanggal, kapasitas, deskripsi, dll)
- Menghapus event
- Melihat semua user dan daftar booking mereka

---
