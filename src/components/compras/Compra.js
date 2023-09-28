import "./Compra.css";
import CompraCard from "../compra_card/CompraCard";
import { useState, useEffect } from "react";
import DialogFormProduct from "../dialog_form_product/DialogFormProduct";
import CustomButton from "../custom_button/CustomButton";
import {
  filterLastProducts,
  filterBasedOnSubStringForName,
} from "../services/product_list_helper";

export default function Compra(inputProducts) {
  const [openAdd, setOpenAdd] = useState(false);
  const [editProductId, setEditProductId] = useState("");

  const refreshAllProducts = inputProducts.refreshAllProducts;
  const isCompraExpanded = inputProducts.isCompraExpanded;
  const handleCompraExpand = inputProducts.handleCompraExpand;
  const products = inputProducts.products;
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(inputProducts.products);
  }, [inputProducts.isCompraExpanded, inputProducts.products]);

  const handleClickOpenAdd = (productId) => {
    if (!(productId === "")) {
      setEditProductId(productId);
    }
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    if (!(editProductId === "")) {
      setEditProductId("");
    }
    setOpenAdd(false);
  };

  const handleCloseAddandRefresh = () => {
    if (!(editProductId === "")) {
      setEditProductId("");
    }
    refreshAllProducts();
    setOpenAdd(false);
  };

  const filterBasedOnSearch = (inputText) => {
    setFilteredProducts(filterBasedOnSubStringForName(products, inputText));
  };

  return (
    <>
      <section className="section-compra">
        <div className="primary-compra">
          <div>
            <p className="primary-title-compra">
              {isCompraExpanded ? "Histórico" : "Compras"}
            </p>
          </div>
          <div className="primary-options-compra">
            <CustomButton
              charForIcon="/"
              handleClick={handleCompraExpand}
              width={isCompraExpanded ? 50 : undefined}
              height={isCompraExpanded ? 50 : undefined}
              title="Expandir compras"
            />
            <CustomButton
              charForIcon="+"
              handleClick={() => handleClickOpenAdd("")}
              width={isCompraExpanded ? 50 : undefined}
              height={isCompraExpanded ? 50 : undefined}
              title="Adicionar produto"
            />
          </div>
        </div>
        {isCompraExpanded ? (
          <div className="search-compra-expand">
            <label>Busque o produto pelo seu nome</label>
            <input
              maxLength={20}
              onChange={(e) => filterBasedOnSearch(e.target.value)}
            ></input>
          </div>
        ) : undefined}
        <div
          className={
            isCompraExpanded ? "content-compra-expand" : "content-compra"
          }
        >
          {filterLastProducts(
            isCompraExpanded ? filteredProducts : products,
            isCompraExpanded ? undefined : 10
          ).map((product) => {
            return (
              <CompraCard
                key={product._id}
                id={product._id}
                name={product.name}
                type={product.type}
                price={product.price}
                quantity={product.quantity}
                purchaseTime={product.purchaseTime}
                lastEditTime={product.lastEditTime}
                refreshAllProducts={refreshAllProducts}
                handleOpenEdit={handleClickOpenAdd}
              />
            );
          })}
        </div>
      </section>
      <DialogFormProduct
        handleCloseAddandRefresh={handleCloseAddandRefresh}
        handleCloseAdd={handleCloseAdd}
        openAdd={openAdd}
        productId={editProductId}
      />
    </>
  );
}
