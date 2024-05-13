export function generateOrderNumber() {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  if (currentYear < startYear) {
    console.error("Invalid year for generating order number.");
    return null;
  }

  const randomSuffix = Math.floor(Math.random() * 1000000); // Adjust the range of random numbers as needed
  const paddedSuffix = String(randomSuffix).padStart(6, "0"); // Pad with zeros to ensure length of 6
  const orderNumber = `${startYear}${paddedSuffix}`;

  return orderNumber;
}
