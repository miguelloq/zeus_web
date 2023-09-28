import "./Resumo.css";
import ResumoCard from "../resumo_card/ResumoCard";
import React, { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  filterBasedOnLimitDays,
  totalPricesOnType,
} from "../services/product_list_helper";

export default function Resumo(input) {
  let products = input.products;

  const returnValues = (daysNumber) => {
    return {
      racao: totalPricesOnType(
        filterBasedOnLimitDays(products, daysNumber),
        "racao"
      ),
      remedio: totalPricesOnType(
        filterBasedOnLimitDays(products, daysNumber),
        "remedio"
      ),
      brinquedo: totalPricesOnType(
        filterBasedOnLimitDays(products, daysNumber),
        "brinquedo"
      ),
      outro: totalPricesOnType(
        filterBasedOnLimitDays(products, daysNumber),
        "outro"
      ),
    };
  };

  const [quantityDays, setQuantityDays] = useState(7);
  const [values, setValues] = useState(returnValues(7)); //precisa iniciar direito
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (quantityDays) => {
    if (quantityDays !== null) {
      setQuantityDays(quantityDays);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    setValues(returnValues(quantityDays));
  }, [quantityDays]);

  return (
    <section className="container-gasto">
      <div className="line-gasto">
        <p className="line-gasto--gasto">Resumo</p>

        <button
          type="button"
          onClick={handleClick}
          className="button-date-gasto"
        >
          {quantityDays === undefined
            ? "Todos os dias"
            : `Últimos ${quantityDays} dias`}
        </button>
      </div>
      <div className="container-cards">
        <ResumoCard quantity={values.racao.toFixed(2)} text="Em ração(Kg)" />
        <ResumoCard quantity={values.remedio.toFixed(2)} text="Em remédio" />
        <ResumoCard
          quantity={values.brinquedo.toFixed(2)}
          text="Em brinquedos"
        />
        <ResumoCard quantity={values.outro.toFixed(2)} text="Em outros" />
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(quantityDays)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose(7)}>Últimos 7 dias</MenuItem>
        <MenuItem onClick={() => handleClose(30)}>Últimos 30 dias</MenuItem>
        <MenuItem onClick={() => handleClose(90)}>Últimos 90 dias</MenuItem>
        <MenuItem onClick={() => handleClose(365)}>Últimos 365 dias</MenuItem>
        <MenuItem onClick={() => handleClose(undefined)}>
          Todos os dias
        </MenuItem>
      </Menu>
    </section>
  );
}
