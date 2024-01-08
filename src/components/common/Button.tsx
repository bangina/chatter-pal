function Button({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-[6px] px-[12px] rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
