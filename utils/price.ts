export const formatPrice = (price: number) => {
  const formatDone = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatDone.replace("₫", "");
};
