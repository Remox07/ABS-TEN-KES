# 🚀 LANGKAH DEPLOY KE NETLIFY

## ✅ CODE SUDAH DI GITHUB!

Repository: **https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan**

---

## 📋 LANGKAH SELANJUTNYA:

### **STEP 1: Login ke Netlify**

1. Buka: **https://app.netlify.com**
2. Login dengan GitHub (jika belum)
3. Authorize Netlify jika diminta

---

### **STEP 2: Import Project dari GitHub**

1. Di dashboard Netlify, klik **"Add new site"**
2. Pilih **"Import an existing project"**
3. Pilih **"Deploy with GitHub"**
4. Cari dan pilih repository: **absensi-tenaga-kesehatan**

---

### **STEP 3: Configure Build Settings**

Isi form deploy dengan setting ini:

```
Site name (optional):     absensitenkes
                          (atau nama lain yang Anda mau)

Branch to deploy:         main

Base directory:           (kosong/tidak diisi)

Build command:            npm install

Publish directory:        public

Functions directory:      netlify/functions
```

**⚠️ JANGAN KLIK "Deploy site" DULU!**

Scroll ke bawah dulu untuk set environment variables!

---

### **STEP 4: Add Environment Variables**

Sebelum deploy, klik **"Add environment variables"** atau **"Advanced build settings"**

Tambahkan 8 variables ini **SATU PER SATU**:

#### **Variable 1:**
```
Key:   SUPABASE_URL
Value: https://tbjshustaqijmbtxssod.supabase.co
```

#### **Variable 2:**
```
Key:   SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMDc5NDksImV4cCI6MjEwMTY4Mzk0OX0._2vkja-T3NdOxExUCR3wYhl9xRJxiAQhCOMcJvceLVM
```

#### **Variable 3:**
```
Key:   SUPABASE_SERVICE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRianNodXN0YXFpam1idHhzc29kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjEwNzk0OSwiZXhwIjoyMTAxNjgzOTQ5fQ.Y_tdjt1SPC8NrEGZqKf4qywh_OpdvPMfKlXmhFVbbRY
```

#### **Variable 4:**
```
Key:   JWT_SECRET
Value: absensi-tenaga-kesehatan-secret-key-2024
```

#### **Variable 5:**
```
Key:   JWT_EXPIRE
Value: 7d
```

#### **Variable 6:**
```
Key:   NODE_ENV
Value: production
```

#### **Variable 7:**
```
Key:   ADMIN_EMAIL
Value: armyteguh00@gmail.com
```

#### **Variable 8:**
```
Key:   ADMIN_PASSWORD
Value: Admin123!
```

---

### **STEP 5: Deploy!**

Setelah semua environment variables ditambahkan:

1. Klik **"Deploy site"**
2. Tunggu proses build (~2-3 menit)
3. Status akan berubah dari "Building" → "Published"

---

### **STEP 6: Get Your URL**

Setelah deploy selesai:

1. Netlify akan generate URL otomatis, contoh: **https://absensitenkes.netlify.app**
2. Atau: **https://[random-name].netlify.app**
3. Copy URL ini!

---

### **STEP 7: Test API**

Buka URL ini di browser (ganti dengan URL Anda):

```
https://absensitenkes.netlify.app/api/health
```

**Harus muncul:**
```json
{
  "success": true,
  "message": "Netlify Functions API is running",
  "timestamp": "2024-..."
}
```

✅ Kalau muncul JSON seperti ini = **BACKEND BERHASIL!**

❌ Kalau muncul HTML/404 = Environment variables belum diset

---

### **STEP 8: Test Login**

1. Buka: **https://absensitenkes.netlify.app** (atau URL Anda)
2. Login dengan:
   ```
   Email:    armyteguh00@gmail.com
   Password: Admin123!
   ```
3. Klik **"Masuk"**
4. ✅ **BERHASIL MASUK KE DASHBOARD!**

---

## 🎯 JIKA SUDAH ADA SITE DI NETLIFY:

Kalau site **absensitenkes** sudah ada (dari deploy manual sebelumnya):

### **Option A: Update Site yang Ada**

1. Buka site: **absensitenkes**
2. **Site settings** → **Build & deploy**
3. **Link repository**
4. Pilih GitHub → **absensi-tenaga-kesehatan**
5. Set build settings (sama seperti di atas)
6. **Site settings** → **Environment variables**
7. Add 8 variables (jika belum ada)
8. **Deploys** → **Trigger deploy** → **Deploy site**

### **Option B: Buat Site Baru**

1. Ikuti STEP 1-8 di atas
2. Buat site baru dengan nama berbeda
3. Setelah jadi, hapus site lama (optional)

---

## 🔧 CUSTOM DOMAIN (Optional)

Jika ingin ganti dari `absensitenkes.netlify.app` ke nama custom:

1. **Site settings** → **Domain management**
2. **Options** → **Edit site name**
3. Ketik nama baru (contoh: `absensi-kesehatan`)
4. Save → URL jadi: `absensi-kesehatan.netlify.app`

---

## 🐛 TROUBLESHOOTING:

### **Problem 1: Functions Error 500**

**Solusi:**
1. Netlify → Site → **Functions** tab
2. Click function `api`
3. View logs
4. Cek error message
5. Biasanya: environment variables salah/kurang

**Fix:**
- Cek semua 8 variables sudah diisi
- Tidak ada typo di Key atau Value
- Redeploy setelah fix

### **Problem 2: "Failed to fetch" di Login**

**Penyebab:**
- API belum jalan (environment variables belum diset)

**Fix:**
1. Set environment variables (8 variables)
2. Redeploy site
3. Test `/api/health` endpoint dulu
4. Baru test login

### **Problem 3: Build Failed**

**Cek:**
1. **Deploys** → Click failed deploy
2. View deploy log
3. Cari error di log

**Common issues:**
- npm install failed → Check package.json
- Missing files → Check .gitignore

---

## 📊 VERIFIKASI DEPLOYMENT:

### ✅ Checklist:

- [ ] Code sudah di GitHub: https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan
- [ ] Site di-import ke Netlify
- [ ] Build settings correct (public folder, netlify/functions)
- [ ] 8 Environment variables sudah ditambahkan
- [ ] Deploy successful (status: Published)
- [ ] `/api/health` return JSON ✅
- [ ] Login berhasil dengan armyteguh00@gmail.com ✅
- [ ] Dashboard tampil ✅

---

## 🎉 HASIL AKHIR:

```
✅ Frontend:  https://absensitenkes.netlify.app
✅ Backend:   https://absensitenkes.netlify.app/api
✅ Database:  Supabase PostgreSQL
✅ Login:     armyteguh00@gmail.com / Admin123!
✅ Cost:      $0/month (GRATIS!)
```

---

## 📱 AKSES DARI HP:

Setelah deploy, aplikasi bisa diakses dari:
- ✅ Laptop/PC: Chrome, Firefox, Edge
- ✅ HP Android: Chrome, Firefox
- ✅ iPhone: Safari, Chrome
- ✅ Tablet: Any browser

URL yang sama: **https://absensitenkes.netlify.app**

---

## 🔄 UPDATE APLIKASI NANTI:

Jika mau update code:

```bash
# Edit files yang mau diupdate
git add .
git commit -m "Update feature X"
git push origin main
```

**Netlify otomatis:**
- Detect push ke GitHub
- Build ulang
- Deploy otomatis
- Update dalam ~2-3 menit

No need redeploy manual! 🚀

---

## 💡 TIPS:

1. **Bookmark** URL Netlify dashboard Anda
2. **Save** environment variables di tempat aman (password manager)
3. **Enable** deploy notifications (email/Slack) di Netlify
4. **Check** Functions logs jika ada error
5. **Monitor** usage di Netlify analytics

---

**🎊 SEKARANG TINGGAL:**
1. Login ke Netlify
2. Import repository
3. Set environment variables
4. Deploy!
5. ✅ **SELESAI!**

---

*Repository: https://github.com/ArmyTeguhNico/absensi-tenaga-kesehatan*  
*Deploy: https://app.netlify.com*
