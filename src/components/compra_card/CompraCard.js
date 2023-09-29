import CustomButton from "../custom_button/CustomButton";
import "./CompraCard.css";
import api from "../services/api";
import { returnVisableType } from "../services/product_list_helper";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

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
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const handleOpenDeleteAlert = () => {
    setIsDeleteAlertOpen(!isDeleteAlertOpen);
  };

  const auxPurchaseTime = new Date(purchaseTime)
    .toISOString()
    .split("T")[0]
    .split("-");
  const visablePurchaseTime = `${auxPurchaseTime[2]}/${auxPurchaseTime[1]}/${auxPurchaseTime[0]}`;

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
        handleOpenDeleteAlert();
        refreshAllProducts();
      })
      .catch((error) => {
        alert(`Erro em deletar, devido: ${error}`);
      });
  };

  return (
    <>
      <div className="background-container-compra-card">
        <div className="background-title-container-compra-card">
          <p> {name} </p>
          <div className="background-button-container">
            <CustomButton
              handleClick={handleOpenDeleteAlert}
              charForIcon={<DeleteOutlineIcon />}
              title="Remover compra"
              width={40}
              height={40}
            />
            <CustomButton
              handleClick={() => handleOpenEdit(id)}
              charForIcon={<EditNoteIcon />}
              title="Editar compra"
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
            {`Preço da compra: R$ ${price.toFixed(2)}`}{" "}
          </p>
          <p className="atribute-compra-card">
            {`Quantidade: ${quantity.toFixed(2)}`}
          </p>
          <p className="atribute-compra-card">{`Data de compra: ${visablePurchaseTime}`}</p>
          <p className="atribute-compra-card">{`Última edição: ${visableLastEditTime}`}</p>
        </div>
      </div>
      <Dialog
        open={isDeleteAlertOpen}
        onClose={handleOpenDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Aperte confirmar para deletar.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`O produto de nome "${name}" será deletado do seu banco de dados. Tem certeza dessa ação?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDeleteAlert}>Cancelar</Button>
          <Button onClick={() => deleteProduct(id)}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
