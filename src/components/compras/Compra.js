import "./Compra.css";
import CompraCard from "../compra_card/CompraCard";
import * as React from "react";
import DialogFormProduct from "../dialog_form_product/DialogFormProduct";
import CustomButton from "../custom_button/CustomButton";
import { filterLastProducts } from "../services/product_list_helper";

export default function Compra(inputProducts) {
  const [openAdd, setOpenAdd] = React.useState(false);
  const refreshAllProducts = inputProducts.refreshAllProducts;
  const [editProductId, setEditProductId] = React.useState("");

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

  return (
    <>
      <section className="section-compra">
        <div className="primary-compra">
          <p className="primary-title-compra">Compras</p>
          <div className="primary-options-compra">
            <CustomButton
              charForIcon="+"
              handleClick={() => handleClickOpenAdd("")}
              title="Adicionar produto"
            />
          </div>
        </div>
        <div className="content-compra">
          {filterLastProducts(inputProducts.products, 10).map((product) => {
            console.log(`${product.name}: ${product.purchaseTime}`);
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
