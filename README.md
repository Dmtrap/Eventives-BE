# Backend API – Event Management

Backend API untuk aplikasi manajemen event yang dibangun menggunakan **NestJS**, **PostgreSQL**, dan **Prisma ORM**. Repository ini berfungsi sebagai penyedia layanan API yang digunakan oleh frontend berbasis **Next.js**. Untuk menjalankan aplikasi secara penuh, backend dan frontend harus dijalankan secara bersamaan.

---

## 🚀 Tech Stack

* **NestJS** – Backend framework
* **PostgreSQL** – Database
* **Prisma ORM** – Database ORM & migration
* **Swagger** – API Documentation

---

## 📦 Instalasi & Menjalankan Project

### 1️⃣ Install dependency

```bash
npm install
```

### 2️⃣ Setup Environment Variable

Buat file `.env` berdasarkan `.env.example` dan sesuaikan konfigurasi database serta service yang digunakan.

Contoh minimal:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nama_database"
```

### 3️⃣ Jalankan migrasi database

```bash
npx prisma migrate dev
```

### 4️⃣ Jalankan server

```bash
npm run start
```

---

## 📘 API Documentation (Swagger)

Setelah server berjalan, dokumentasi API dapat diakses melalui:

```
http://localhost:3000/api
```

Swagger menampilkan seluruh endpoint, request body, serta response API secara lengkap.

---

## ⚙️ Konfigurasi Penting

Beberapa konfigurasi pada project ini masih menggunakan tanda `#` sebagai **placeholder** dan **harus diisi secara manual** sebelum aplikasi dijalankan.

### Cara menemukan konfigurasi yang perlu diisi:

1. Buka project menggunakan **Visual Studio Code**
2. Tekan `Ctrl + Shift + F`
3. Ketik `#`
4. Pilih hasil pencarian yang berada di file `.ts`
5. Ganti nilai `#` sesuai dengan konfigurasi milik Anda

### Contoh konfigurasi yang perlu diisi:

* Redirect URL frontend
* Reset password link
* Konfigurasi email (SMTP host, user, password)
* Google OAuth (Client ID, Client Secret, Callback URL)
* JWT Secret

> ⚠️ **Catatan:**
> Sangat disarankan untuk memindahkan konfigurasi tersebut ke **Environment Variable (`.env`)**
> agar lebih aman dan mudah dikonfigurasi.

---

## ⚠️ Catatan Penting

* Pastikan database PostgreSQL sudah dibuat sebelum menjalankan migrasi
* Jangan commit file `.env` ke repository publik
* Gunakan Swagger untuk mencoba dan mengecek endpoint API

---

## 📌 Keterangan

Repository ini merupakan **backend API** dan tidak menyediakan tampilan UI. Frontend aplikasi dibangun secara terpisah menggunakan **Next.js**.

## 📸 Tampilan Aplikasi
![alt text](src/images/Readme/Readme1.png)
![alt text](src/images/Readme/Readme2.png)
![alt text](src/images/Readme/Readme3.png)