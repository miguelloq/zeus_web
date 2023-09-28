import "./VisaoGeral.css";
import "./ExpandVisaoGeral.css";
import Compra from "../compras/Compra";
import {
  Pie,
  PieChart,
  Cell,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { totalPricesOnType } from "../services/product_list_helper";
import { productLineData } from "../services/product_graph_helper";
import { useState } from "react";

export default function VisaoGeral(props) {
  const products = props.products;
  const refreshAllProducts = props.refreshAllProducts;
  const [isCompraExpanded, setIsCompraExpanded] = useState(false);

  const handleCompraExpand = () => {
    setIsCompraExpanded(!isCompraExpanded);
  };

  const data01 = productLineData(products);
  const data02 = [
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name, // Adicione a propriedade name para acessar o nome da categoria
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(2)}%`}{" "}
      </text>
    );
  };

  return (
    <section className="section-visao-geral">
      <p className="title-visao-geral">Visão Geral</p>
      <div
        className={
          isCompraExpanded
            ? "content-visao-geral-expand"
            : "content-visao-geral"
        }
      >
        <section
          className={
            isCompraExpanded
              ? "section-visao-geral-compra-expand"
              : "section-visao-geral-compra"
          }
        >
          <Compra
            products={products}
            refreshAllProducts={refreshAllProducts}
            isCompraExpanded={isCompraExpanded}
            handleCompraExpand={handleCompraExpand}
          />
        </section>
        <div
          className={
            isCompraExpanded
              ? "content-visao-geral-graphs-expand"
              : "content-visao-geral-graphs"
          }
        >
          <div className="content-visao-geral-graph1">
            <p className="title-graph">Gastos por categoria</p>
            <div className="graph-graph">
              <PieChart width={400} height={300}>
                <Pie
                  data={data02}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={20}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data02.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="content-visao-geral-graph2">
            <p className="title-graph">Gastos por categoria por mês</p>
            <div className="graph-graph">
              <LineChart
                width={450}
                height={250}
                data={data01}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="remedio" stroke="#0088FE" />
                <Line type="monotone" dataKey="brinquedo" stroke="#00C49F" />
                <Line type="monotone" dataKey="outro" stroke="#FFBB28" />
                <Line type="monotone" dataKey="racao" stroke="#FF8042" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
