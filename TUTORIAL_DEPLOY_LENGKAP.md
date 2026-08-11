# 🚀 TUTORIAL DEPLOY LENGKAP - GitHub + Netlify + Supabase

## 📚 **DAFTAR ISI:**

1. [Setup GitHub](#1-setup-github)
2. [Setup Supabase](#2-setup-supabase)
3. [Setup Netlify](#3-setup-netlify)
4. [Test Aplikasi](#4-test-aplikasi)

---

# 1. SETUP GITHUB

## ✅ **Status:** SUDAH SELESAI!

Repository sudah ada di:
```
https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan
```

Code sudah di-push, skip ke langkah berikutnya! ✅

---

# 2. SETUP SUPABASE

## 📋 **Langkah 1: Buka Supabase Dashboard**

1. Buka browser, ketik:
   ```
   https://supabase.com/dashboard
   ```

2. Login (jika belum)

3. Pilih project: **absensitenkesrs**
   - URL: https://supabase.com/dashboard/project/schzdduftqwlsbajedzx

---

## 📋 **Langkah 2: Buka SQL Editor**

1. Di sidebar kiri, cari dan klik **"SQL Editor"** (icon database ⚡)

2. Klik tombol **"New query"** (pojok kanan atas)

3. Akan muncul editor kosong

---

## 📋 **Langkah 3: Copy SQL Schema**

1. **Kembali ke VS Code**

2. File `supabase-schema.sql` sudah terbuka di editor

3. **Select All:**
   - Klik di dalam editor
   - Tekan `Ctrl+A` (Windows) atau `Cmd+A` (Mac)
   - Semua text akan ter-highlight (biru)

4. **Copy:**
   - Tekan `Ctrl+C` (Windows) atau `Cmd+C` (Mac)

---

## 📋 **Langkah 4: Paste & Run SQL**

1. **Kembali ke Supabase SQL Editor** (browser)

2. **Paste:**
   - Klik di dalam editor kosong
   - Tekan `Ctrl+V` (Windows) atau `Cmd+V` (Mac)
   - SQL akan muncul (~180 baris)

3. **Run:**
   - Klik tombol **"Run"** (pojok kanan bawah)
   - Atau tekan `Ctrl+Enter`

4. **Tunggu** ~10-30 detik

5. **Lihat Result:**
   - ✅ Harus muncul: `Success. No rows returned` atau `Success. 6 rows affected`
   - ❌ Kalau error "already exists" → **TIDAK MASALAH**, lanjut saja!

---

## 📋 **Langkah 5: Verify Tables**

1. Di sidebar kiri, klik **"Table Editor"** (icon table 📊)

2. Lihat list tables di sidebar:
   - ✅ `departments` → harus ada (6 rows)
   - ✅ `positions` → harus ada (7 rows)
   - ✅ `users` → ada tapi kosong (0 rows) - normal!
   - ✅ `attendance` → ada tapi kosong
   - ✅ `leaves` → ada tapi kosong
   - ✅ `settings` → harus ada (4 rows)

3. **Klik table `departments`:**
   - Harus lihat 6 data:
     1. Poli Umum
     2. Poli Gigi
     3. UGD
     4. Farmasi
     5. Laboratorium
     6. Administrasi

4. **Klik table `positions`:**
   - Harus lihat 7 data:
     1. Dokter Umum
     2. Dokter Gigi
     3. Perawat
     4. Bidan
     5. Apoteker
     6. Analis Kesehatan
     7. Staff Administrasi

✅ **Supabase SELESAI!**

---

# 3. SETUP NETLIFY

## 📋 **Langkah 1: Buka Netlify Dashboard**

1. Buka browser baru, ketik:
   ```
   https://app.netlify.com
   ```

2. Login dengan GitHub

3. Pilih site: **absensitenkesrs**
   - URL: https://absensitenkesrs.netlify.app

---

## 📋 **Langkah 2: Buka Environment Variables**

1. Di menu atas, klik **"Site configuration"** atau **"Site settings"**

2. Di sidebar kiri, scroll cari **"Environment variables"**

3. Klik **"Environment variables"**

4. Akan muncul halaman environment variables (mungkin sudah ada 1: SUPABASE_URL)

---

## 📋 **Langkah 3: Add Environment Variables**

Anda perlu menambahkan **8 VARIABLES** total.

### **Cara Add:**

1. Klik tombol **"Add a variable"** atau **"Add environment variable"**

2. Form akan muncul dengan:
   - **Key:** (nama variable)
   - **Values:** (nilai variable)
   - **Scopes:** (biarkan default - Builds, Functions, Runtime semua centang)

3. Isi Key & Value sesuai list di bawah

4. Klik **"Create variable"**

5. Ulangi untuk 8 variables

---

### **VARIABLE 1: SUPABASE_URL**

```
Key:    SUPABASE_URL
Value:  https://schzdduftqwlsbajedzx.supabase.co
```

(Kalau sudah ada, skip atau edit)

---

### **VARIABLE 2: SUPABASE_ANON_KEY**

```
Key:    SUPABASE_ANON_KEY

Value (copy semua - 1 baris panjang):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaHpkZHVmdHF3bHNiYWplZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMTE0MDIsImV4cCI6MjEwMTg4NzQwMn0._zcyTKo7-WzafAoMne9Jgvv3QjQSf6UB7zlMF03M-U8
```

**Opsional:** Centang "Contains secret values" untuk keamanan

Klik **"Create variable"**

---

### **VARIABLE 3: SUPABASE_SERVICE_KEY**

```
Key:    SUPABASE_SERVICE_KEY

Value (copy semua):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaHpkZHVmdHF3bHNiYWplZHp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjMxMTQwMiwiZXhwIjoyMTAxODg3NDAyfQ.3uAf0lA7WT7gNeIwqedPySGLSlAKwBGnXWuyAMMTIQ8
```

**Centang:** "Contains secret values"

Klik **"Create variable"**

---

### **VARIABLE 4: JWT_SECRET**

```
Key:    JWT_SECRET
Value:  absensi-tenaga-kesehatan-secret-key-2024
```

**Centang:** "Contains secret values"

Klik **"Create variable"**

---

### **VARIABLE 5: JWT_EXPIRE**

```
Key:    JWT_EXPIRE
Value:  7d
```

Klik **"Create variable"**

---

### **VARIABLE 6: NODE_ENV**

```
Key:    NODE_ENV
Value:  production
```

Klik **"Create variable"**

---

### **VARIABLE 7: ADMIN_EMAIL**

```
Key:    ADMIN_EMAIL
Value:  armyteguh00@gmail.com
```

Klik **"Create variable"**

---

### **VARIABLE 8: ADMIN_PASSWORD**

```
Key:    ADMIN_PASSWORD
Value:  Admin123!
```

**Centang:** "Contains secret values"

Klik **"Create variable"**

---

## 📋 **Langkah 4: Verify Variables**

Setelah selesai add semua, pastikan ada **8 variables** di list:

1. ✅ SUPABASE_URL
2. ✅ SUPABASE_ANON_KEY
3. ✅ SUPABASE_SERVICE_KEY
4. ✅ JWT_SECRET
5. ✅ JWT_EXPIRE
6. ✅ NODE_ENV
7. ✅ ADMIN_EMAIL
8. ✅ ADMIN_PASSWORD

**Total: 8 variables**

---

## 📋 **Langkah 5: Redeploy Site**

Environment variables baru **TIDAK LANGSUNG AKTIF**. Harus redeploy dulu!

1. **Klik tab "Deploys"** di menu atas

2. **Klik tombol "Trigger deploy"** (pojok kanan atas)

3. Pilih **"Deploy site"**

4. **Tunggu proses deploy** (~2-3 menit):
   - Status: `Building...` (sedang proses)
   - Status: `Published` (selesai) ✅

5. **Jangan tutup tab**, tunggu sampai selesai!

---

## 📋 **Langkah 6: Check Deploy Success**

1. Setelah status jadi **"Published"**, scroll ke bawah

2. Lihat **"Production deploys"** section

3. Deploy terbaru harus ada status **hijau** dengan centang ✅

4. Kalau ada **merah/error** ❌:
   - Klik deploy yang error
   - Lihat log error
   - Screenshot dan tanyakan ke saya

✅ **Netlify SELESAI!**

---

# 4. TEST APLIKASI

## 📋 **Test 1: API Health Check**

1. **Buka tab browser baru**

2. **Ketik URL:**
   ```
   https://absensitenkesrs.netlify.app/api/health
   ```

3. **Tekan Enter**

4. **Harus muncul JSON seperti ini:**
   ```json
   {
     "success": true,
     "message": "Netlify Functions API is running",
     "timestamp": "2024-..."
   }
   ```

**Hasil:**
- ✅ **Muncul JSON** = Backend jalan! Lanjut test login
- ❌ **Error 502 / Failed to fetch** = Environment variables salah atau belum diset
- ❌ **HTML/404** = Functions belum deploy

---

## 📋 **Test 2: API Departments**

1. **Ketik URL:**
   ```
   https://absensitenkesrs.netlify.app/api/departments
   ```

2. **Harus muncul JSON dengan 6 departments:**
   ```json
   {
     "success": true,
     "data": [
       {"id": 1, "name": "Poli Umum", ...},
       {"id": 2, "name": "Poli Gigi", ...},
       ...
     ]
   }
   ```

**Hasil:**
- ✅ **Muncul 6 departments** = Database connect! Lanjut login
- ❌ **Empty array []** = SQL schema belum dijalankan di Supabase
- ❌ **Error** = Database connection error

---

## 📋 **Test 3: Login Admin**

1. **Buka URL utama:**
   ```
   https://absensitenkesrs.netlify.app
   ```

2. **Halaman login akan muncul** (design purple gradient)

3. **Isi form login:**
   ```
   Email:    armyteguh00@gmail.com
   Password: Admin123!
   ```

4. **Klik tombol "Masuk"**

5. **Tunggu ~2-5 detik**

**Hasil yang Diharapkan:**

✅ **SUCCESS - Masuk ke Dashboard:**
- Halaman berubah ke admin dashboard
- Ada sidebar dengan menu: Dashboard, Pegawai, Absensi, Cuti, Laporan
- Ada data statistik (mungkin masih 0 karena belum ada data)
- Lihat nama "Administrator" atau "armyteguh00" di pojok kanan atas

❌ **ERROR - Login Gagal:**

**Jika muncul error "Email atau password salah":**
- Admin user belum dibuat di database
- Solusi: Run command di terminal (langkah berikutnya)

**Jika muncul "Failed to fetch" atau error 502:**
- Backend belum jalan
- Cek Test 1 (API Health) dulu

**Jika tombol loading terus:**
- Buka browser Console (F12 → Console tab)
- Screenshot error yang muncul
- Tanyakan ke saya

---

## 📋 **Test 4: Create Admin User (Jika Login Gagal)**

Jika login gagal karena admin belum ada, jalankan ini:

1. **Buka VS Code**

2. **Buka Terminal** (Ctrl+` atau View → Terminal)

3. **Ketik command:**
   ```bash
   node database/init-db.js
   ```

4. **Tekan Enter**

5. **Tunggu hasil:**

**Hasil yang Diharapkan:**
```
🚀 Starting Supabase database initialization...
👤 Creating admin user...
✅ Database initialized successfully!

═══════════════════════════════════════════════════
📊 Supabase Database Ready
═══════════════════════════════════════════════════
👤 Admin Credentials:
   Email   : armyteguh00@gmail.com
   Password: Admin123!
═══════════════════════════════════════════════════
```

**Kalau muncul error "admin already exists":**
- Admin sudah ada, tapi mungkin password salah
- Coba login lagi atau reset password

**Kalau muncul error "table not found":**
- SQL schema belum dijalankan
- Kembali ke **STEP 2: SETUP SUPABASE**

---

## 📋 **Test 5: Test Fitur Tambah Pegawai**

Setelah login berhasil:

1. **Di dashboard, klik menu "Pegawai"** (sidebar kiri)

2. **Klik tombol "+ Tambah Pegawai"** (pojok kanan atas)

3. **Modal form akan muncul**

4. **Cek dropdown:**
   - ✅ **Departemen** → harus ada 6 pilihan (Poli Umum, Poli Gigi, dll)
   - ✅ **Jabatan** → harus ada 7 pilihan (Dokter Umum, Perawat, dll)

5. **Isi form test:**
   ```
   NIP:         12345
   Nama:        Test User
   Email:       test@example.com
   Password:    Test123!
   Telepon:     08123456789
   Alamat:      Test alamat
   Departemen:  Pilih salah satu
   Jabatan:     Pilih salah satu
   Role:        User
   Status:      Aktif
   ```

6. **Klik "Simpan"**

7. **Hasil:**
   - ✅ Muncul notifikasi "Pegawai berhasil ditambahkan"
   - ✅ Modal tertutup
   - ✅ User baru muncul di tabel

---

## 📋 **Test 6: Test RFID & Face Registration**

1. **Di menu, ada link "RFID & Face Registration"**

2. **Klik link tersebut**

3. **Halaman registrasi RFID/Face akan muncul**

4. **Pilih user yang baru dibuat**

5. **Test:**
   - ✅ Form RFID UID muncul
   - ✅ Tombol Start Camera muncul
   - ✅ Bisa input RFID UID (test: A1B2C3D4)

---

# 🎉 **SELESAI!**

## ✅ **Checklist Final:**

- [ ] GitHub repository ada dan code ter-push
- [ ] Supabase project dibuat
- [ ] SQL schema dijalankan di Supabase
- [ ] 6 departments ada di database
- [ ] 7 positions ada di database
- [ ] 8 environment variables ditambahkan di Netlify
- [ ] Netlify site di-redeploy
- [ ] `/api/health` return JSON ✅
- [ ] `/api/departments` return 6 data ✅
- [ ] Login berhasil dengan armyteguh00@gmail.com
- [ ] Dashboard tampil
- [ ] Dropdown Departemen & Jabatan terisi
- [ ] Bisa tambah pegawai baru
- [ ] Halaman RFID & Face Registration bisa diakses

---

## 🌐 **URL Aplikasi Anda:**

```
Production:  https://absensitenkesrs.netlify.app
API Health:  https://absensitenkesrs.netlify.app/api/health
GitHub:      https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan
Supabase:    https://supabase.com/dashboard/project/schzdduftqwlsbajedzx
```

---

## 👤 **Login Credentials:**

```
Admin:
Email:    armyteguh00@gmail.com
Password: Admin123!

Test User (setelah dibuat):
Email:    test@example.com
Password: Test123!
```

---

## 💰 **Biaya:**

```
GitHub:   GRATIS selamanya
Netlify:  GRATIS (125K req/month)
Supabase: GRATIS (500MB database)
──────────────────────────────────
TOTAL:    $0/month ✅
```

---

## 🆘 **Troubleshooting:**

### **Problem: Login error "Email atau password salah"**

**Solusi:**
```bash
node database/init-db.js
```

---

### **Problem: API error 502**

**Penyebab:** Environment variables belum diset atau salah

**Solusi:**
1. Cek 8 variables ada di Netlify
2. Redeploy site
3. Test `/api/health` lagi

---

### **Problem: Dropdown kosong**

**Penyebab:** SQL schema belum dijalankan

**Solusi:**
1. Kembali ke **STEP 2: SETUP SUPABASE**
2. Run SQL schema
3. Verify departments & positions ada

---

### **Problem: "Failed to fetch"**

**Penyebab:** Backend tidak jalan

**Solusi:**
1. Test `/api/health` dulu
2. Kalau error, cek environment variables
3. Kalau berhasil, clear browser cache (Ctrl+Shift+Delete)

---

## 📞 **Butuh Bantuan?**

Jika ada error:
1. Screenshot error
2. Screenshot browser console (F12 → Console)
3. Tanyakan ke saya dengan detail error

---

**🎊 SELAMAT! Aplikasi Anda sudah online!** 🎊

*Tutorial dibuat: 2024*
*URL: https://absensitenkesrs.netlify.app*
