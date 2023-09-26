import "./CustomButton.css";

export default function CustomButton(props) {
  const handleClick = props.handleClick;
  const charForIcon = props.charForIcon;
  const title = props.title;
  const width = props.width; //not required
  const height = props.height; //not required
  return (
    <button
      style={{ width: width, height: height }}
      className="custom-button"
      onClick={handleClick}
      title={title}
    >
      {charForIcon}
    </button>
  );
}
