
# 📺 **MovDb**

✨ Silahkan kunjungi website tester nya di :
https://peaceful-gates-d0c811.netlify.app/

🚚 API yang digunakan : http://www.omdbapi.com/

📝 Note :
> page untuk search di mode test deployment masih error 404 not found.

**MovDb** Adalah website yang dapat anda gunakan untuk mencari film atau series di seluruh 🌎. Kamu juga dapat mencari menggunakan kolom pencarian dengan kata kunci dan filter berdasarkan tahunnya. Selain itu, aplikasi ini dapat menampilkan deskripsi lengkap beserta rating IMDB nya. menarik bukan ? berikut adalah fitur lengkapnya !

1. **Tampilan grid responsive**<br>
Showcase yang mempermudah user untuk melihat-lihat film apa saja yang ada.
2. **Infinite scroll**<br>
Geser scoll ke bawah untuk menemukan film lain tanpa harus ribet klik next page.
3. **Download poster**<br>
Tertarik dengan poster filmnya ? Coba untuk klik gambar yang tersedia di Home page dan unduh posternya.
4. **Sensitive search**<br>
Malas untuk mencari film atau lupa untuk mencari nama lengkap filmnya ? Ketik saja huruf awal atau sepotong kata dari judul yang kamu ingat maka website akan mencarikan film sesuai keinginanmu. Selain itu, kamu dapat menyertakan tahun nya juga lho.
5. **Responsive**<br>
Tampilan dapat dilihat dengan baik di browser smartphone kamu, meskipun masih ada beberapa bug.
<br>
<br>

# 🔧 **Deskripsi Sistem**

1. **List dengan thumbnail page**<br>

Home page menggunakan style **flex-images** :
                        <div className="flex-images justify-content-center">
agar gambar wrap secara vertikal maka display dibuat flex dan ditambah flex-wrap. justify content center dari bootstrap digunakan untuk
```css
.flex-images {
    display: flex;
    flex-wrap: wrap;
}
```

2. **Search**<br>

Function untuk search diletakkan di **DefaultHeader.js**, nama function untuk memanggil api nya adalah fetchMovieData. Saat pertama kali aplikasi load, api butuh satu kata kunci, sehingga saya menggunakan kata kunci 'Batman' sebagai default value nya.

Terdapat 3 api yang digunakan untuk search, masing-masing diletakkan di file **RequestHandler.js** yakni :
> RequestMoviesData<br>
RequestMoviesDataByTitle<br>
RequestMoviesDataByYear<br>

**RequestMoviesDataByTitle** digunakan apabila pencarian melakukan RequestMoviesData gagal. Selain itu, api RequestMoviesDataByTitle memiliki sensitivitas lebih baik (meskipun menggunakan 1 huruf/karakter) Apabila RequestMoviesDataByTitle gagal, maka website akan memunculkan alert "Sorry, movies not found"

**RequestMoviesDataByYear** digunakan apabila pencarian menggunakan keyword tahun. sehingga querystring "year" akan muncul angka. jika tahun diisi namun tidak menulis keyword, maka website otomatis mencari keyword menggunakan default valuenya yakni "Batman" (bawaan dari batasan kemampuan api)

Pencarian dapat digunakan baik dari page home maupun dari page detail.

Semua keyword yang sudah tertulis di kolom search dan year akan disimpan di dalam redux (whitelist). sehingga tidak dapat hilang meskipun website direload.

3. **R  edux**<br>

Penampakan isi redux dari console.log :
```
{movies: Array(10), keyword: 'Batman', year: '', _persist: {…}, dispatch: ƒ}
dispatch: ƒ (o)
keyword: "Batman"
movies: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
year: ""
_persist: {version: -1, rehydrated: true}
[[Prototype]]: Object
```
Redux yang digunakan adalah **Redux Persist**. Sehingga data yang sudah tersimpan seperti diatas tidak dapat hilang meskipun website direload/refresh.

>keterangan :<br>
keyword     : digunakan untuk menyimpan kata kunci kolom search<br>
year        : digunakan untuk menyimpan kata kunci tahun<br>
movies      : digunakan untuk menyimpan result dari api<br>

4. **Show detail**<br>

Page detail dapat diakses melalui tombol detail dari page home. page detail memanfaatkan window.location.pathname untuk menterjemahkan query string movies_name dan dimasukkan ke api sama seperti RequestMoviesDataByTitle.

File yang bertanggung jawab untuk menampilkan hasil deskripsi film adalah MovieDetail.js. Result dari API ini ada 20 baris variable. sehingga saya mencoba untuk tidak menghardcode nya satu-persatu. Tetapi dengan bantuan looping for dan Object.entries seperti dibawah ini :

```javascript
for (const [key, value] of Object.entries(movieDetail)) {
    if (key != "Ratings" && key != "Poster" && key != "Title" &key != "Response") {
        details.push({ key: key, value: `: ${value}` })
    }
}
```
Sehingga semua data akan memiliki variable dan value otomatis yang masuk ke array details.

Khusus untuk variable ratings, poster dan title tidak dimasukkan sebab isinya masih berupa object. yang di-push ke array details adalah variable yang hanya berisi string.

Pembuatan kolom juga otomatis mengikuti hasil dari array details. melalui looping for berikut :
```js
let details = []

for (let i = 0; i < (Math.round(details.length / textsAmount)); i++) {
    const slicePartition = 1

    if (Math.round(details.length / textsAmount) <= 1)
        showDetails = <td>{details.map(x => <tr><td style={{ fontSize: '10pt' }}>{x.key}</td><td style={{ fontSize: '10pt' }}><b>{x.value}</b></td></tr>)}</td>
    else
        showDetails.push(<td>{details.slice(first, last).map(x => <tr><td style={{ fontSize: '10pt' }}>{x.key}</td><td style={{ fontSize: '10pt' }}><b>{x.value}</b></td></tr>)}</td>)

    first = last + slicePartition
    last = last + textsAmount
}
```

Jika isi dari array **details** kurang dari 10 value (satu kolom berisi defaultnya 10 value) maka kolom yang terbentuk adalah 1 (hasil dari Math.round yang dibulatkan ke atas). Serta semua valuenya akan masuk ke kolom tersebut, termasuk jika array details berisi kelebihan 4 value.

Jika isi dari array **details** adalah lebih dari atau sama dengan 15 maka hasil dari Math.round nya adalah lebih dari 1. Maka kolom yang terbentuk juga lebih dari 1, dengan masing-masing kolom memiliki 10 value. Jika terdapat kelebihan value (lebih dari 10 value) maka akan masuk ke kolom terakhir.

Pembuatan sistem seperti ini diharapkan apabila ada perubahan nama variable (selain ratings, poster, dan title) website dapat beradaptasi tanpa harus hardcode.

5. **Terdapat reuseable component**<br>

Reuseable component saya letakkan di folder components. component yang sering digunakan diantaranya **Alert.jsx**. contoh Penggunaannya ada di component **InfiniteHome.jsx** :

```js

                        <CustomAlert message='Sorry, movies not found' color='danger' icon={<i class="fas fa-heart-broken"></i>} />
                    }                
                <ImageModal toggle={Toggle} setToggle={setToggle} imgTitle={modals.title} imgLink={modals.link} />
            </div>
            <div className="d-flex justify-content-center">
            {end ? <CustomAlert message='Page reaches end of result' color='success' icon={<i class="fas fa-flag-checkered"></i>} /> : null}
```

Selain itu component reuseable lainnya adalah **TextDecoration.jsx** dan **Line.jsx**

<br><br>

# ➕ **Tambahan** :
* **SEO Friendly (masih belajar)**<br>
1. index.html diberi beberapa kata description
2. page details dan search menggunakan querystring
* **Eye catching & responsive**<br>
1. icons menggunakan bantuan fontawesome, style menggunakan bantuan bootstrap dan reactstrap. page home sudah cukup responsive.
* **Menggunakan lazycomponent**<br>
contoh file yang sudah menggunakan lazy component dan suspense :
1. App.js
2. MovieDetail.js
* ~~testable~~
* **Infinite scroll**<br>
website ini sudah menerapkan infinite scroll, terpasang di file Home.js menggunakan event onScroll. functionnya adalah sebagai berikut :

```js
handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

    if (scrollHeight - scrollTop <= clientHeight) {
        setTimeout(() => {
            this.setState({ page: this.state.page + 1 }, () => this.handleNewListData())  
        }, 1000);
    }
}
```

Konsepnya adalah apabila scroll height (tinggi scroll browser / sesuai zoom nya) dikurangi scrollTop (tinggi scroll oleh user) sama dengan atau kurang dari clientHeight (tinggi screen dari page (css) / berubah-ubah sesuai posisi zoom) maka state page akan tambah 1 dengan delay 1 detik (agar lebih terlihat smooth)

Sebagai gambaran (saat zoom browser posisi 100%) :

> posisi saat scrool diatas (belum digeser)<br>
scroll height : 2016 px<br>
scroll top : 4 px<br>
scroll height - scroll top = 2012 px<br>
client height : 500 px (selisih masih lebih dari 500px)<br>
<br>
posisi saat scroll mentok bawah<br>
scroll height : 2016 px<br>
scroll top : 1516 px<br>
scroll height - scroll top = 500 px<br>
client height : 500 px (selisih sama dengan 500px)<br>

* ~~Typescript~~
* **Commits message rapi**<br>
Dapat dilihat di :<br>
https://github.com/wisnuciwun/movdb-app/commits/main
* **Minim bundle size**<br>
Bundle size setelah  ```npm run build``` adalah 5.77 MB
* **Minim dependency luar**<br>
1. Terdapat 20 dependency luar<br>
2. 14 diantaranya npm install oleh saya
* ~~proptypes/dokumentasi pada reuseable components~~
<br>
<br>
# 😺 **Thank you**
Author : Wisnu Adi Wardhana<br>
Email : adiwardhanawisnu@gmail.com




