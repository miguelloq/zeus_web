import CustomButton from "../custom_button/CustomButton";
import "./CompraCard.css";
import api from "../services/api";
import { returnVisableType } from "../services/product_list_helper";

export default function CompraCard(product) {
  const id = product.id;
  const name = product.name;
  const type = product.type;
  const price = product.price;
  const quantity = product.quantity;
  const purchaseTime = new Date(product.purchaseTime);
  const lastEditTime = product.lastEditTime;
  const refreshAllProducts = product.refreshAllProducts;
  const handleOpenEdit = product.handleOpenEdit;

  const visablePurchaseTime = `${purchaseTime.getDate()}/${purchaseTime.getMonth()}/${purchaseTime.getFullYear()}`;
  let visableLastEditTime = "";

  if (lastEditTime === "") {
    visableLastEditTime = "Não foi editado.";
  } else {
    let auxLastEditTime = new Date(lastEditTime);
    visableLastEditTime = `${auxLastEditTime.getDate()}/${auxLastEditTime.getMonth()}/${auxLastEditTime.getFullYear()}`;
  }

  const deleteProduct = (identifier) => {
    api
      .delete(`produtos/${identifier}`)
      .then((response) => {
        alert("Sucesso em deletar");
        refreshAllProducts();
      })
      .catch((error) => {
        console.log(error);
        alert(`Erro em deletar. Error ${error}`);
      });
  };

  return (
    <div className="background-container-compra-card">
      <div className="background-title-container-compra-card">
        <p> {name} </p>
        <div className="background-button-container">
          <CustomButton
            handleClick={() => deleteProduct(id)}
            charForIcon="-"
            title="Remover produto"
            width={40}
            height={40}
          />
          <CustomButton
            handleClick={() => handleOpenEdit(id)}
            charForIcon="#"
            title="Editar produto"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="surface-container-compra-card">
        <p className="atribute-compra-card">
          {`Tipo: ${returnVisableType(type)}`}
        </p>
        <p className="atribute-compra-card">
          {`Preço: R$ ${price.toFixed(2)}`}{" "}
        </p>
        <p className="atribute-compra-card">
          {`Quantidade: ${quantity.toFixed(2)}`}
        </p>
        <p className="atribute-compra-card">{`Data de compra: ${visablePurchaseTime}`}</p>
        <p className="atribute-compra-card">{`Ultima edição: ${visableLastEditTime}`}</p>
      </div>
    </div>
  );
}
