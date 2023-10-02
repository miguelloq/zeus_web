export default function verifyProduct(product, isEdit) {
  checkName(product.name);
  checkType(product.type);
  checkQuantity(product.quantity);
  checkPrice(product.price);
  checkPurchaseTime(product.purchaseTime, isEdit);
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
    throw Error("O valor do tipo é invalido");
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
  if (price < 0.01) {
    throw Error("O preço deve ser maior que zero");
  }
  if (price > 1000000) {
    throw Error("O preço tem limite de 1000000");
  }
}

function checkQuantity(quantity) {
  if (!(typeof quantity === "number")) {
    throw Error("A quantidade não é um numero");
  }
  if (quantity < 0.01) {
    throw Error("A quantidade deve ser maior que zero");
  }
  if (quantity > 10000) {
    throw Error("A quantidade tem limite 10000.");
  }
}

function checkPurchaseTime(date, isEdit) {
  let inputDate = new Date(date);
  if (!(inputDate instanceof Date)) {
    throw Error("O campo de data está em um formato errado");
  }

  let postLimitDate = new Date();
  let prevLimitDate = new Date();
  if (isEdit === true) {
    postLimitDate = new Date(date);
    prevLimitDate = new Date(date);
    postLimitDate.setDate(inputDate.getDate() + 5);
    prevLimitDate.setDate(inputDate.getDate() - 5);
  } else {
    postLimitDate.setDate(postLimitDate.getDate() + 50);
    prevLimitDate.setDate(prevLimitDate.getDate() - 50);
  }
  if (inputDate > postLimitDate || inputDate < prevLimitDate) {
    throw Error("O campo de data está fora do intervalo de 50 dias");
  }
}
