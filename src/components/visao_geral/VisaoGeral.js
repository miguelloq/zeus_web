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
  ResponsiveContainer,
} from "recharts";
import {
  productLineData,
  productPieData,
} from "../services/product_graph_helper";
import { useState } from "react";

export default function VisaoGeral(props) {
  const products = props.products;
  const refreshAllProducts = props.refreshAllProducts;
  const [isCompraExpanded, setIsCompraExpanded] = useState(false);

  const handleCompraExpand = () => {
    setIsCompraExpanded(!isCompraExpanded);
  };

  const lineData = productLineData(products);
  const pieData = productPieData(products);

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
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
            <ResponsiveContainer width={"80%"} height={"80%"}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={20}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="content-visao-geral-graph2">
            <p className="title-graph">Gastos por categoria por mês</p>
            <ResponsiveContainer width={"80%"} height={"80%"}>
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Remédio" stroke="#00C49F" />
                <Line type="monotone" dataKey="Brinquedo" stroke="#FF8042" />
                <Line type="monotone" dataKey="Outros" stroke="#0088FE" />
                <Line type="monotone" dataKey="Ração" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
