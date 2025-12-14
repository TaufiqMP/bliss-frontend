# BLISS – Web Application with Machine Learning Integration

## Deskripsi Singkat Proyek
BLISS adalah aplikasi berbasis web yang mengintegrasikan **Frontend**, **Backend API**, dan **Machine Learning Service**. Aplikasi ini dikembangkan dengan arsitektur terpisah (separate services) agar mudah dikelola, dikembangkan, dan di-deploy. Sistem BLISS memungkinkan pengguna berinteraksi melalui antarmuka web, memproses data melalui Backend, serta memanfaatkan model Machine Learning untuk kebutuhan analisis dan prediksi.

## Tautan Deployment
- **Frontend (Vercel)**  
  https://bliss-frontend-opal.vercel.app/

- **Backend API (Railway)**  
  https://bliss-backend-production.up.railway.app

- **Machine Learning Service (Railway)**  
  https://bliss-model-service-production.up.railway.app

- **Model Machine Learning (Google Drive)**  
  https://drive.google.com/drive/folders/1CEPcDeGrDvWUowlbDMS4jFBL8PWJLLNV?usp=sharing

## Tautan Model Machine Learning
Model Machine Learning **tidak disimpan langsung di repository** dan disediakan melalui Google Drive.

🔗 Tautan model:
https://drive.google.com/drive/folders/1CEPcDeGrDvWUowlbDMS4jFBL8PWJLLNV?usp=sharing

## Petunjuk Penggunaan Aplikasi
1. Buka aplikasi melalui browser:
   https://bliss-frontend-opal.vercel.app/
2. Pengguna melakukan login atau registrasi
3. Frontend mengirim request ke Backend API
4. Backend memproses data dan memanggil Model Machine Learning jika diperlukan
5. Hasil pemrosesan ditampilkan kembali ke pengguna melalui frontend

---

## Teknologi yang Digunakan Pada BLISS
- Frontend: Next.js 14, React 18, Tailwind CSS
- Backend: Node.js, Express.js
- Machine Learning: TensorFlow.js
- Database: PostgreSQL
- Authentication: JSON Web Token (JWT)

© BLISS Project