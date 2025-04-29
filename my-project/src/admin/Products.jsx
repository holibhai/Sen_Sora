import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const sampleProducts = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Sample ${index % 2 === 0 ? 'Cake' : 'Gift'} ${index + 1}`,
  category: index % 2 === 0 ? 'Cake' : 'Gift',
  price: (Math.random() * 100 + 10).toFixed(2),
  image: `https://via.placeholder.com/150?text=${index % 2 === 0 ? 'Cake' : 'Gift'}`,
}));

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => navigate('/admin/addProduct')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Cake">Cakes</option>
            <option value="Gift">Gifts</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition border border-gray-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                Category: <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Price: <span className="font-medium">${product.price}</span>
              </p>
              <div className="flex justify-between">
                <Link to="/admin/updateProduct">
                <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <Pencil size={16} /> Edit
                </button>
                </Link>
               
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-md border text-sm font-medium transition-all duration-150 ${
                currentPage === i + 1
                  ? 'bg-yellow-400 text-white border-yellow-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-100'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
