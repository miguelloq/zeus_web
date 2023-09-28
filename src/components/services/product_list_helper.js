export function filterBasedOntype(products, type) {
  return products.filter((product) => {
    if (product.type === type) {
      return true;
    }
    return false;
  });
}

export function totalPricesOnType(products, type) {
  return filterBasedOntype(products, type).reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );
}

export function filterBasedOnLimitDays(products, daysNumber) {
  if (daysNumber === undefined) {
    return products;
  }

  const currentDate = new Date();

  const inferiorLimit = new Date(currentDate);
  inferiorLimit.setDate(currentDate.getDate() - daysNumber);

  return products.filter((objeto) => {
    const purchaseTime = new Date(objeto.purchaseTime);
    return purchaseTime >= inferiorLimit && purchaseTime <= currentDate;
  });
}

export function filterLastProducts(products, amountProducts) {
  let newProducts = [...products];

  newProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (amountProducts === undefined) {
    return newProducts;
  } else {
    return newProducts.slice(0, amountProducts);
  }
}
export function filterMostRecentObjects(products, quantidade) {
  const productsCopy = [...products];
  productsCopy.sort((a, b) => {
    const dataA = new Date(a.createdAt);
    const dataB = new Date(b.createdAt);
    return dataB - dataA;
  });
  if (quantidade !== undefined) {
    const recentProducts = products.slice(0, quantidade);
    return recentProducts;
  }
  return productsCopy;
}

export const filterBasedOnSubStringForName = (products, inputText) => {
  return products.filter((product) => {
    if (product.name.toLowerCase().includes(inputText.toLowerCase())) {
      return true;
    }
    return false;
  });
};

export function returnVisableType(type) {
  switch (type) {
    case "racao":
      return "Ração";
    case "remedio":
      return "Remédio";
    case "outro":
      return "Outros";
    case "brinquedo":
      return "Brinquedo";
    default:
      return "Sem tipo";
  }
}
