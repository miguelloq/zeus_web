import "./ResumoCard.css";

export default function ResumoCard(information) {
  const quantity = information.quantity;
  const text = information.text;

  return (
    <div className="container-card">
      <img
        className="card-pet-icon"
        src="/img/pet_icon_material.png"
        alt="Pet Icon"
      />
      <p className="card-quantity">{`R$ ${quantity}`}</p>
      <p className="card-text">{text}</p>
    </div>
  );
}
