export const formatCurrency = (value: number, type: "usd" | "inr") => {
  return type === "inr"
    ? `₹ ${value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : `$ ${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
};
