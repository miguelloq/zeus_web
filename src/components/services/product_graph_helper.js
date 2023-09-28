import { totalPricesOnType, returnVisableType } from "./product_list_helper";

export const productPieData = (products) => {
  return [
    {
      name: "Ração",
      value: totalPricesOnType(products, "racao"),
    },
    {
      name: "Brinquedo",
      value: totalPricesOnType(products, "brinquedo"),
    },
    {
      name: "Remédio",
      value: totalPricesOnType(products, "remedio"),
    },
    {
      name: "Outro",
      value: totalPricesOnType(products, "outro"),
    },
  ];
};
const returnMonthInformation = (month, products) => {
  let monthInformation = {};
  products.forEach((product) => {
    let productMonth = new Date(product.purchaseTime).getMonth();
    if (productMonth === month) {
      let productType = returnVisableType(product.type);
      if (productType in monthInformation) {
        monthInformation[productType] =
          monthInformation[productType] + product.price;
      } else {
        monthInformation[productType] = product.price;
      }
    }
  });
  monthInformation.month = month;
  return monthInformation;
};

const visableFormatLineData = (lineData) => {
  let corretFormatLineData = [...lineData];
  corretFormatLineData.forEach((monthInformation) => {
    monthInformation.month = getMonthShortPortugueseName(
      monthInformation.month
    );
  });

  corretFormatLineData.reverse();

  return corretFormatLineData;
};

const getMonthShortPortugueseName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("pt-BR", {
    month: "short",
  });
};

export const productLineData = (products) => {
  const currentMonth = new Date().getMonth();
  const data = [];
  for (let month = currentMonth, cnt = 0; cnt < 6; month--, cnt++) {
    let monthInformation = returnMonthInformation(month, products);
    data.push(monthInformation);
    if (month === 0) {
      month = 12;
    }
  }
  return visableFormatLineData(data);
};
