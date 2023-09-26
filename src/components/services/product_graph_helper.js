import { totalPricesOnType } from "./product_list_helper";

const dateToYYYYMMDD = (date) => {
  return date.toISOString().split("T")[0];
};

export const productPieData = (products) => {
  return (
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
    }
  );
};

export const productLineData = () => {
  const currentDate = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const usedXgraphDates = [currentDate];

  for (let index = 1; index < 10; index++) {
    usedXgraphDates.push(
      new Date(
        currentDate.getTime -
          currentDate.getDay() * (millisecondsPerDay * (index * 10))
      )
    );
  }

  return usedXgraphDates;
};
