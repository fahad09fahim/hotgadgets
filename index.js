// https://openapi.programming-hero.com/api/phones?search=iphone

// https://openapi.programming-hero.com/api/phone/${id}

//get phone data
const phoneData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const phoneData = await response.json();
  const phones = phoneData.data;
  console.log(phones);
};

phoneData();
