- Nama  : Hamas Izzuddin Fathi
- NIM   : H1D022097

# ScreenShot dan Penjelasan
## Halaman Login
- ![Screenshot 2024-11-14 095836](https://github.com/user-attachments/assets/42845187-c5ae-49bb-b1df-897c9d6097a2)
- ![Screenshot 2024-11-14 095956](https://github.com/user-attachments/assets/5e953842-f9f9-4f1d-b030-2c57393e4104)
## Halaman Home
- ![image](https://github.com/user-attachments/assets/adb60930-535c-4108-88d3-313af1ddf2a4)
## Halaman Profile
- ![Screenshot 2024-11-14 095746](https://github.com/user-attachments/assets/c8ff4ee0-58fd-4c6a-93a4-2d8ebbe336a4)
## Halaman Add ToDo
- ![image](https://github.com/user-attachments/assets/04758688-66fe-495b-8009-60ef028a2950)
## Hasil Add ToDo
- ![image](https://github.com/user-attachments/assets/cb80c500-4e0c-4462-a0ef-43ca79067cc3)
## Complete ToDo
- ![image](https://github.com/user-attachments/assets/e4cf5140-4f2a-49d4-ad28-5e31774c61d3)
- ![image](https://github.com/user-attachments/assets/8419f5a1-f9b9-4869-8d7d-9d84ad8b107f)
- ![image](https://github.com/user-attachments/assets/f87ba464-9654-4569-96c2-28d6949114b3)
## Halaman Edit ToDo
- ![image](https://github.com/user-attachments/assets/b9027adb-f5c3-495f-981a-129a67339817)
- ![image](https://github.com/user-attachments/assets/89e30d10-2a26-4cbc-9231-4d93f62923ab)
## Hapus ToDo
- ![image](https://github.com/user-attachments/assets/0a758b24-9254-49ea-a960-b745dfff989c)
- ![image](https://github.com/user-attachments/assets/3e02f62e-ad4a-4656-9b22-5db2c1c68cce)
## ToDo Active
- ![image](https://github.com/user-attachments/assets/4866acf2-2f9f-447b-8ea8-9bef8e95a152)
- ![image](https://github.com/user-attachments/assets/0f0e08d1-ed5f-4a1c-a458-0be699a324c2)
# Penjelasan
## Membuat Proyek di FireBase
- Langkah pertama adalah membuat proyek di Firebase dan mengaktifkan opsi autentikasi menggunakan Google pada menu Authentication.
- Setelah proyek selesai dibuat, Firebase akan menyediakan konfigurasi khusus (firebaseConfig) yang diperlukan untuk menginisialisasi Firebase di aplikasi Ionic.
## Membuat Proyek Ionic dengan Vue.js
- Setelah proyek Firebase selesai, kita membuat proyek Ionic baru menggunakan template Vue. Kemudian, kita menginstal Pinia untuk manajemen state dan Firebase SDK untuk menangani autentikasi Firebase.
- Struktur folder dalam proyek Ionic mencakup beberapa folder utama, seperti src untuk menyimpan kode aplikasi, public untuk aset, router untuk mengatur navigasi, dan stores untuk mengelola status autentikasi dengan Pinia.
## Inisialisasi Firebase dalam Proyek Ionic
- File firebase.ts dibuat di dalam folder utils untuk menginisialisasi Firebase dengan konfigurasi yang diambil dari Firebase Console. Selain itu, file ini juga berfungsi untuk mengatur autentikasi menggunakan auth dan menyiapkan googleProvider sebagai penyedia autentikasi Google.
## Membuat Fungsi Autentikasi (Sign-In dan Logout)
- Di folder stores, kita membuat file auth.ts yang memanfaatkan Pinia untuk mengelola status autentikasi pengguna. Dalam file ini, terdapat fungsi loginWithGoogle yang digunakan untuk menginisialisasi proses autentikasi Google. Dengan GoogleAuth, aplikasi meminta izin untuk mengakses profil dan email pengguna. Setelah berhasil masuk, aplikasi menerima token ID dari Google yang diubah menjadi kredensial Firebase dan kemudian digunakan untuk proses signInWithCredential.
- Setelah proses login selesai, pengguna akan diarahkan ke halaman beranda (home). Selain itu, disediakan fungsi logout untuk keluar dari akun Google, menghapus sesi, dan mengembalikan pengguna ke halaman login (login).
## Membuat Halaman Login dan Profile
- LoginPage: Halaman ini menyediakan tombol untuk pengguna masuk menggunakan akun Google. Ketika tombol tersebut diklik, fungsi loginWithGoogle dijalankan untuk memulai proses autentikasi.
- HomePage dan ProfilePage: Halaman profil menampilkan informasi pengguna, seperti nama dan email, yang diambil dari akun Google. Navigasi antara halaman utama (Home) dan halaman profil (Profile) dapat dilakukan melalui komponen TabsMenu.
- Di halaman profil, kita memanfaatkan authStore untuk mengakses detail pengguna, termasuk nama dan URL foto profil. Jika pengguna tidak memiliki foto profil, aplikasi akan menampilkan gambar default sebagai gantinya.
## Add ToDo
- Jika editingId ada , maka data todo yang sudah ada akan diperbarui.
- Jika editingId kosong, maka data baru akan ditambahkan dengan status false, menandakan bahwa todo tersebut "active".
- Setelah menambah data, fungsi loadTodos akan dipanggil untuk memperbarui daftar todo di halaman.
## Edit ToDo
- Ketika tombol edit diklik, data todo yang dipilih akan dimasukkan ke dalam todo.value (yang akan digunakan dalam modal).
- ID todo yang sedang diedit disimpan dalam editingId.
- Modal akan dibuka sehingga pengguna dapat mengubah data yang ada.
## Hapus ToDo
- Ketika tombol hapus diklik, handleDelete akan dipanggil.
- Fungsi ini menghapus todo dari Firestore berdasarkan ID todo yang dipilih.
- Setelah penghapusan, daftar todo diperbarui dengan memanggil loadTodos().
## Status
- Fungsi ini mengubah nilai status pada todo, dari false menjadi true (atau sebaliknya).
- Ketika status berubah, todo akan dipindahkan antara dua kategori: active (todo belum selesai) dan completed (todo sudah selesai).
- Status baru akan diperbarui di Firestore dan pengguna akan mendapatkan notifikasi mengenai perubahan status.
## Memindahkan ke Active atau Completed
- Daftar todo yang aktif (activeTodos) dan selesai (completedTodos) dipisahkan menggunakan computed properties berdasarkan nilai status:
  - activeTodos: todo dengan status: false
  - completedTodos: todo dengan status: true
## Konfigurasi Router dengan Perlindungan Rute
- Pada file index.ts di folder router, kita mendefinisikan rute aplikasi sekaligus menerapkan perlindungan pada halaman beranda dan profil agar hanya dapat diakses oleh pengguna yang telah login.
- Untuk setiap perpindahan rute, kita memanfaatkan beforeEach untuk memeriksa status autentikasi pengguna. Jika pengguna belum login, mereka akan dialihkan ke halaman login.
## Alur Autentikasi dan Mendapatkan Data Profil
- Saat pengguna menekan tombol "Sign In with Google" di halaman login, fungsi loginWithGoogle memulai proses autentikasi melalui Google.
- Setelah login berhasil, aplikasi mendapatkan token ID dari Google, yang kemudian dikonversi menjadi kredensial Firebase. Firebase mencatat pengguna sebagai terautentikasi dan menyimpan data seperti nama serta foto profil mereka.
- Data ini disimpan di dalam authStore dan digunakan di seluruh aplikasi untuk menampilkan informasi profil serta memeriksa status autentikasi pengguna.
