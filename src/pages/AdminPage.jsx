import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api/api";

const placeholderImage = "https://picsum.photos/600/400";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Tambah / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setNotif("");

    if (!name.trim()) {
      setFormError("Nama produk wajib diisi.");
      return;
    }
    if (!price.trim() || isNaN(price) || Number(price) <= 0) {
      setFormError("Harga produk harus berupa angka dan lebih dari 0.");
      return;
    }

    try {
      setLoading(true);
      if (editId) {
        const updated = await updateProduct(editId, {
          name,
          price: Number(price),
        });
        setProducts(products.map((p) => (p.id === editId ? updated : p)));
        setNotif("Produk berhasil diupdate!");
        setEditId(null);
      } else {
        const newProduct = await createProduct({
          name,
          price: Number(price),
          image: `https://picsum.photos/seed/${Date.now()}/600/400`,
        });
        setProducts([...products, newProduct]);
        setNotif("Produk berhasil ditambahkan!");
      }
      setName("");
      setPrice("");
    } catch (err) {
      setFormError("Terjadi kesalahan saat menyimpan data.");
      console.error("Error simpan data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(String(product.price));
  };

  // 🔹 Hapus
  const handleDelete = async (id) => {
    setNotif("");
    if (window.confirm("Hapus produk ini?")) {
      try {
        setLoading(true);
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        setNotif("Produk berhasil dihapus!");
      } catch (err) {
        setFormError("Gagal menghapus produk.");
        console.error("Gagal hapus data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="adminpage-bg">
        <div className="adminpage-container">
          <div className="adminpage-header">
            <h1>Manajemen Produk Kursus</h1>
            <p>Tambah, edit, atau hapus produk kursus Anda.</p>
          </div>

          {/* Form */}
          <div className="admin-form-container">
            <h2>{editId ? "Edit Produk" : "Tambah Produk Baru"}</h2>
            {formError && <div className="alert alert-error">{formError}</div>}
            {notif && <div className="alert alert-success">{notif}</div>}
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  placeholder="Contoh: Kursus React"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label>Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="Contoh: 200000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <button type="submit" className="btn-primary">
                  {editId ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setName("");
                      setPrice("");
                    }}
                    className="btn-secondary"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Produk */}
          <div className="product-grid">
            {loading ? (
              <div className="product-loading">
                <p>Loading data produk...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image || placeholderImage}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="product-card-body">
                    <h3>{product.name}</h3>
                    <p className="product-price">
                      Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                    </p>
                  </div>
                  <div className="product-card-footer">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn-delete"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="product-empty">
                <p className="font-semibold">Belum ada produk</p>
                <p className="text-sm">
                  Gunakan formulir di atas untuk menambahkan produk pertama
                  Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
