import "./VisaoGeral.css";
import Compra from "../compras/Compra";
import { Pie, PieChart, Cell } from "recharts";
import { totalPricesOnType } from "../services/product_list_helper";

export default function VisaoGeral(props) {
  const products = props.products;
  const refreshAllProducts = props.refreshAllProducts;

  const data01 = [{}];

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
      <div className="content-visao-geral">
        <section className="section-visao-geral-compra">
          <Compra products={products} refreshAllProducts={refreshAllProducts} />
        </section>
        <div className="content-visao-geral-graphs">
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
            <p className="title-graph">Gastos por categoria</p>
            <div className="graph-graph">
              <PieChart width={350} height={300}>
                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#0291C9"
                  label
                />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
