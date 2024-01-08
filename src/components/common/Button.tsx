function Button({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-[6px] px-[12px] rounded"
    >
      {label}
    </button>
  );
}

export default Button;
