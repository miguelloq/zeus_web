export default function verifyProduct(product) {
  checkName(product.name);
  checkType(product.type);
  checkQuantity(product.quantity);
  checkPrice(product.price);
  checkPurchaseTime(product.purchaseTime);
}

function checkType(type) {
  if (
    !(
      type === "racao" ||
      type === "brinquedo" ||
      type === "remedio" ||
      type === "outro"
    )
  ) {
    throw Error("O valor de type é invalido");
  }
}

function checkName(name) {
  if (name.length > 24 || name.length < 3) {
    throw Error("O nome deve ter entre 3 e 24 caracteres");
  }
}

function checkPrice(price) {
  if (!(typeof price === "number")) {
    throw Error("O preço não é um numero");
  }
  if (price < 0) {
    throw Error("O preço deve ser maior que zero");
  }
  if (price > 1000000) {
    throw Error("Numero muito grande");
  }
}

function checkQuantity(quantity) {
  if (!(typeof quantity === "number")) {
    throw Error("A quantidade não é um numero");
  }
  if (quantity < 0) {
    throw Error("A quantidade deve ser maior que zero");
  }
  if (quantity > 10000) {
    throw Error("Numero muito grande");
  }
}

function checkPurchaseTime(date) {
  let currentDate = new Date();
  let limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + 50);
  console.log(date);
  let inputDate = new Date(date);
  console.log("em cima inputDate");
  console.log(inputDate);
  if (!(inputDate instanceof Date)) {
    throw Error("O campo de data está em um formato errado");
  }
  if (inputDate >= currentDate && inputDate <= limitDate) {
    throw Error("O campo de data está fora do intervalo de 50 dias");
  }
}
