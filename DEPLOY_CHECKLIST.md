# ✅ CHECKLIST DEPLOY NETLIFY

## 🎯 PROGRESS:

### ✅ **DONE:**
- [x] Code lengkap (frontend + backend + database)
- [x] Netlify Functions setup (`netlify/functions/api.js`)
- [x] Config file (`netlify.toml`)
- [x] Git initialized
- [x] **CODE PUSHED KE GITHUB** ✅
  - Repository: https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan

---

## 📋 **TODO (ANDA):**

### **1. Login ke Netlify** 🌐
```
URL: https://app.netlify.com
Login dengan: GitHub account
```
- [ ] Buka https://app.netlify.com
- [ ] Login/Sign up dengan GitHub
- [ ] Authorize Netlify (jika diminta)

---

### **2. Import Project** 📥
```
Add new site → Import from GitHub
```
- [ ] Klik "Add new site"
- [ ] Pilih "Import an existing project"
- [ ] Pilih "Deploy with GitHub"
- [ ] Cari repository: **absensi-tenaga-kesehatan**
- [ ] Klik repository tersebut

---

### **3. Build Settings** ⚙️
```
Isi form ini:
```
- [ ] **Site name:** `absensitenkes` (atau nama lain)
- [ ] **Branch:** `main`
- [ ] **Base directory:** (kosong)
- [ ] **Build command:** `npm install`
- [ ] **Publish directory:** `public`
- [ ] **Functions directory:** `netlify/functions`

---

### **4. Environment Variables** 🔐
```
⚠️ PALING PENTING! Jangan skip!
```

Klik **"Add environment variables"** atau **"Advanced"**, lalu tambahkan:

#### ✅ **Variable 1:**
- [ ] Key: `SUPABASE_URL`
- [ ] Value: `https://tbjshustaqijmbtxssod.supabase.co`

#### ✅ **Variable 2:**
- [ ] Key: `SUPABASE_ANON_KEY`
- [ ] Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMDc5NDksImV4cCI6MjEwMTY4Mzk0OX0._2vkja-T3NdOxExUCR3wYhl9xRJxiAQhCOMcJvceLVM`

#### ✅ **Variable 3:**
- [ ] Key: `SUPABASE_SERVICE_KEY`
- [ ] Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjEwNzk0OSwiZXhwIjoyMTAxNjgzOTQ5fQ.Y_tdjt1SPC8NrEGZqKf4qywh_OpdvPMfKlXmhFVbbRY`

#### ✅ **Variable 4:**
- [ ] Key: `JWT_SECRET`
- [ ] Value: `absensi-tenaga-kesehatan-secret-key-2024`

#### ✅ **Variable 5:**
- [ ] Key: `JWT_EXPIRE`
- [ ] Value: `7d`

#### ✅ **Variable 6:**
- [ ] Key: `NODE_ENV`
- [ ] Value: `production`

#### ✅ **Variable 7:**
- [ ] Key: `ADMIN_EMAIL`
- [ ] Value: `armyteguh00@gmail.com`

#### ✅ **Variable 8:**
- [ ] Key: `ADMIN_PASSWORD`
- [ ] Value: `Admin123!`

---

### **5. Deploy Site** 🚀
- [ ] Pastikan semua 8 variables sudah ditambahkan
- [ ] Klik **"Deploy site"**
- [ ] Tunggu ~2-3 menit (lihat progress bar)
- [ ] Status berubah jadi **"Published"** ✅

---

### **6. Copy URL** 📋
- [ ] Setelah deploy selesai, copy URL site
- [ ] Contoh: `https://absensitenkes.netlify.app`
- [ ] Save URL ini!

---

### **7. Test API** 🧪
```
Buka di browser:
https://YOURSITE.netlify.app/api/health
```
- [ ] Buka URL: `https://[your-site].netlify.app/api/health`
- [ ] Harus muncul JSON:
  ```json
  {
    "success": true,
    "message": "Netlify Functions API is running"
  }
  ```
- [ ] ✅ Jika muncul JSON = Backend berhasil!
- [ ] ❌ Jika HTML/404 = Cek environment variables

---

### **8. Test Login** 🔐
```
Login credentials:
Email:    armyteguh00@gmail.com
Password: Admin123!
```
- [ ] Buka: `https://[your-site].netlify.app`
- [ ] Masukkan email: `armyteguh00@gmail.com`
- [ ] Masukkan password: `Admin123!`
- [ ] Klik **"Masuk"**
- [ ] ✅ Berhasil masuk dashboard!

---

## 🎉 SUCCESS CRITERIA:

### ✅ **Semua ini harus berhasil:**

1. ✅ Site published di Netlify
2. ✅ `/api/health` return JSON (bukan HTML)
3. ✅ Login berhasil dengan armyteguh00@gmail.com
4. ✅ Dashboard tampil dengan data
5. ✅ No console errors (F12 → Console)

---

## 🐛 TROUBLESHOOTING:

### ❌ **Deploy Failed**
**Cek:**
- Build command: `npm install`
- Publish directory: `public`
- Functions directory: `netlify/functions`

**Fix:** Update build settings, redeploy

---

### ❌ **Functions Error 500**
**Penyebab:** Environment variables salah/kurang

**Fix:**
1. Site settings → Environment variables
2. Pastikan 8 variables sudah ada
3. Cek tidak ada typo di Key/Value
4. Deploys → Trigger deploy → Deploy site

---

### ❌ **"Failed to fetch" Error**
**Penyebab:** Backend belum jalan

**Fix:**
1. Test `/api/health` endpoint dulu
2. Kalau return HTML → environment variables belum diset
3. Kalau return JSON → backend OK, cek frontend config

---

### ❌ **Login Error "Unexpected token"**
**Penyebab:** Backend return HTML instead of JSON

**Fix:**
1. Set semua 8 environment variables
2. Redeploy site
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test lagi

---

## 📱 JIKA SUDAH BERHASIL:

### **Akses dari Device Lain:**
- ✅ Laptop/PC: Buka `https://[your-site].netlify.app`
- ✅ HP Android: Chrome → buka URL yang sama
- ✅ iPhone: Safari → buka URL yang sama
- ✅ Tablet: Any browser → buka URL yang sama

### **Fitur yang Bisa Digunakan:**
- ✅ Login admin (armyteguh00@gmail.com)
- ✅ Registrasi user dengan RFID + Face photo
- ✅ View data users
- ✅ View attendance records
- ✅ Dashboard statistics

---

## 🔄 UPDATE CODE NANTI:

Jika mau update aplikasi:

```bash
# 1. Edit files
# 2. Commit & push
git add .
git commit -m "Update feature X"
git push origin main

# 3. Netlify auto-deploy! (2-3 menit)
```

No need manual redeploy! 🎉

---

## 💰 BIAYA:

```
Netlify Free Tier:
- 125,000 requests/month  ✅
- 100GB bandwidth          ✅
- Unlimited sites          ✅
- Auto SSL (HTTPS)         ✅
- Cost: $0                 ✅

Supabase Free Tier:
- 500MB database           ✅
- Unlimited API calls      ✅
- Cost: $0                 ✅

TOTAL: $0/month forever! 🎊
```

---

## 🎯 NEXT STEPS AFTER DEPLOY:

- [ ] Bookmark Netlify dashboard
- [ ] Save environment variables di password manager
- [ ] Test semua fitur (register, login, attendance)
- [ ] Setup hardware (ESP8266, RFID, Camera) - optional
- [ ] Share URL dengan team/dosen
- [ ] 🎉 **DEMO READY!**

---

## 📧 SUPPORT:

Jika ada masalah:
1. Cek file: `NETLIFY_DEPLOY_STEPS.md` (panduan detail)
2. Cek Netlify Functions logs (Functions tab)
3. Cek browser console (F12 → Console)
4. Screenshot error + kirim ke chat

---

**🚀 GOOD LUCK!**

*Code repository: https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan*  
*Netlify dashboard: https://app.netlify.com*

