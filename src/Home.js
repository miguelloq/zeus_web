import Header from "./components/banner/Banner";
import Resumo from "./components/gastos/Resumo";
import VisaoGeral from "./components/visao_geral/VisaoGeral";
import React, { useEffect, useState } from "react";
import api from "./components/services/api";
import LoadingIndicator from "./components/loading_indicator/LoadingIndicator";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "ZeusWeb";
    refreshAllProducts();
  }, []);

  const refreshAllProducts = () => {
    api
      .get("/produtos")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Deu erro: ${err}`);
      });
  };

  if (isLoading === true) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Header />
      <Resumo products={products} />
      <VisaoGeral products={products} refreshAllProducts={refreshAllProducts} />
    </>
  );
}
