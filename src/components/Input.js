export default function Input({ type = "text", placeholder = "", value = "", onChange = () => {} }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
