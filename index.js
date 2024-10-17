// https://openapi.programming-hero.com/api/phones?search=iphone

// https://openapi.programming-hero.com/api/phone/${id}

//get phone data
const phoneData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const phoneData = await response.json();
  const phones = phoneData.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-white w-96 shadow-xl`;
    phoneCard.innerHTML = `
          <figure class="px-10 pt-10">
          <img
            src="${phone.image}"
            alt="Shoes"
            class="rounded-xl"
          />  
          </figure>
          <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions">
          <button class="btn bg-[#0D6EFD] text-white"  style="background-color: #0d6efd; color: white; transition: none">Show Details</button>
          </div>
        </div>
    
    `;
    phoneContainer.appendChild(phoneCard);
  });
};



phoneData();
