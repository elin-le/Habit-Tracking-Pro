// Hàm giúp loại bỏ dấu tiếng Việt (VD: "thể thao" -> "the thao") để tìm kiếm không phân biệt có dấu hay không dấu
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
