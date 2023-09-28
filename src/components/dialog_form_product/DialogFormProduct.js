import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import verifyProduct from "../services/product_verification";
import api from "../services/api";

export default function DialogAddProduto(props) {
  let productId = props.productId;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = React.useState("racao");

  useEffect(() => {
    if (!(productId === "")) {
      api
        .get(`/produtos/${productId}`)
        .then((response) => {
          let resProduct = response.data;
          setName(resProduct.name);
          setPrice(resProduct.price.toString());
          setQuantity(resProduct.quantity.toString());
          setDate(
            new Date(resProduct.purchaseTime).toISOString().split("T")[0]
          );
          setType(resProduct.type);
        })
        .catch((error) => {
          alert("Error em achar informações do produto que vai ser editado.");
        });
    }
  }, [props.productId]);

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const resetFields = () => {
    setName("");
    setQuantity("");
    setPrice("");
    setType("racao");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleCloseAdd = () => {
    resetFields();
    props.handleCloseAdd();
  };
  const handleCloseAddandRefresh = () => {
    resetFields();
    props.handleCloseAddandRefresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId === "") {
      postProduct();
    } else {
      editProduct(productId);
    }
  };

  //this can throw a error, use inside a try/catch
  const returnCorrectFormatProduct = () => {
    let correctDate = new Date(date);
    return {
      name: name,
      quantity: Number(quantity),
      price: Number(price),
      type: type,
      purchaseTime: correctDate.toISOString(),
    };
  };

  const postProduct = () => {
    try {
      let product = returnCorrectFormatProduct();
      verifyProduct(product);
      api
        .post("/produtos", product)
        .then((response) => {
          handleCloseAddandRefresh();
        })
        .catch((error) => alert(`Produto não adicionado devido ${error}`));
    } catch (error) {
      alert(`Produto não adicionado devido ${error}`);
    }
  };

  const editProduct = (id) => {
    try {
      let product = returnCorrectFormatProduct();
      verifyProduct(product);
      api
        .put(`/produtos/${id}`, product)
        .then((response) => {
          handleCloseAddandRefresh();
        })
        .catch((error) => alert(`Produto não editado devido ${error}`));
    } catch (error) {
      alert(`Produto não editado devido ${error}`);
    }
  };

  return (
    <Dialog open={props.openAdd} onClose={props.handleCloseAdd}>
      <form noValidate onSubmit={handleSubmit}>
        <DialogTitle>
          {productId === "" ? "Adicione um produto." : "Edite um produto."}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {productId === ""
              ? "Adicione um produto em seu banco de dados. As informações do produto é visível tanto para celular quanto site."
              : "Edite um produto em seu banco de dados. Caso não queira mudar algum campo, não altere-o ou cancele."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do produto"
            type="text"
            fullWidth
            variant="filled"
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Preço do produto"
            type="number"
            fullWidth
            variant="filled"
            required={true}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantidade"
            type="number"
            fullWidth
            variant="filled"
            required={true}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            //min={`${currentDate.getFullYear}-${currentDate.getMonth - 2}-${1}`}
            fullWidth
            variant="filled"
            required={true}
            value={date}
            //max="2020-12-31T00:00"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <InputLabel id="demo-simple-select-label">Tipo de produto</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={type}
            label="Tipo de produto"
            onChange={handleChangeType}
            id="demo-simple-select"
          >
            <MenuItem value={"racao"}>Ração</MenuItem>
            <MenuItem value={"remedio"}>Remédio</MenuItem>
            <MenuItem value={"brinquedo"}>Brinquedo</MenuItem>
            <MenuItem value={"outro"}>Outros</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancelar</Button>
          <Button type="submit">
            {productId === "" ? "Adicionar" : "Editar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
