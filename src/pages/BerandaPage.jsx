import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { getProducts } from "../services/api/api";
import Image1 from "../assets/image1.jpg";
import Image2 from "../assets/image2.jpg";
import Avatar1 from "../assets/1.png";

const defaultDesc =
  "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...";
const defaultName = "Jenna Ortega";
const defaultRole = "Senior Accountant di Gojek";
const defaultRating = "4.5 (100)";
const defaultAvatar = Avatar1;

const BerandaPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="main-wrapper">
        <section className="hero">
          <div className="hero-image">
            <img src={Image1} alt="Hero" />
            <div className="hero-overlay">
              <h1>
                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
                Interaktif!
              </h1>
              <p>
                Temukan ilmu baru yang menarik dan mendalam melalui koleksi
                video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda
                juga dapat berpartisipasi dalam latihan interaktif yang akan
                meningkatkan pemahaman Anda.
              </p>
              <button type="button" className="btn btn-course">
                Temukan Video Course untuk Dipelajari!
              </button>
            </div>
          </div>
        </section>

        <section className="card-section">
          <h2 className="section-title">Koleksi Video Pembelajaran Unggulan</h2>
          <p className="section-desc">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
          <div className="kategori">
            <a href="#">Semua Kelas</a>
            <a href="#">Pemasaran</a>
            <a href="#">Desain</a>
            <a href="#">Pengembangan Diri</a>
            <a href="#">Bisnis</a>
          </div>
        </section>

        <section className="card-grid">
          {loading ? (
            <div className="product-loading">
              <p>Loading data produk...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Card
                key={`produk-${product.id}`}
                img={product.image}
                title={product.name}
                desc={product.desc || defaultDesc}
                name={product.instructor || defaultName}
                role={product.role || defaultRole}
                rating={product.rating || defaultRating}
                price={`Rp ${new Intl.NumberFormat("id-ID").format(
                  product.price
                )}`}
                avatar={product.avatar || defaultAvatar}
              />
            ))
          ) : (
            <div className="product-empty">
              <p className="font-semibold">Belum ada produk</p>
              <p className="text-sm">
                Produk akan tampil di sini setelah ditambahkan oleh admin.
              </p>
            </div>
          )}
        </section>

        <section className="hero hero-secondary">
          <div className="hero-image">
            <img src={Image2} alt="Hero 2" />
            <div className="hero-overlay">
              <h5>NEWSLETTER</h5>
              <h1>Mau Belajar Lebih Banyak?</h1>
              <p>
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan
                penawaran spesial dari program-program terbaik hariesok.id
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Masukkan Emailmu"
                  required
                />
                <button type="submit" className="btn-subcribe">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BerandaPage;
