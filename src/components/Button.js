export default function Button({ text, onClick = () => {}, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {text}
    </button>
  );
}
