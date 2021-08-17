import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const { data: products, loading, error } = useFetch(
    "products?category=" + category
  );

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <>
      <section id="filters">
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
