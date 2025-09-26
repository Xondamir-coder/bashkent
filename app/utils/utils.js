export const objectToFormData = data => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
};
export const TEL_NUMBER = '+998 55 307 55 55';
export const DOMAIN_URL = 'https://api.projectview.uz';
