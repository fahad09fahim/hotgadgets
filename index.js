// https://openapi.programming-hero.com/api/phones?search=iphone

// https://openapi.programming-hero.com/api/phone/${id}

//get phone data
const phoneData = async (searchText, isShowAll) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    if (!response.ok) {
      throw new Error("Phone not found");
    }

    const phoneData = await response.json();
    const phones = phoneData.data;

    if (phones.length === 0) {
      alert("Phone not found");
      location.reload();
      return;
    }

    displayPhones(phones, isShowAll);
  } catch (error) {
    // Handle network or other errors
    console.error(error);
    alert(error.message || "An error occurred");
  }
};

// handle display phones
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.textContent = " ";

  const showAll = document.getElementById("show-all-container");
  if (phones.length > 15 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 15);
  }

  phones.forEach((phone) => {
    // console.log(phone);
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
          <button class="btn bg-[#0D6EFD] text-white"  style="background-color: #0d6efd; color: white; transition: none" onclick="handleShowDetails('${phone.slug}')">Show Details</button>
          </div>
        </div>
    
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
};

// handle search function

const handleSearch = (isShowAll) => {
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  // console.log(searchText);
  toggleSpinner(true);
  phoneData(searchText, isShowAll);
};

// handle loading function
const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all button click
const handleShowAll = () => {
  handleSearch(true);
};

// handle show details button click
const handleShowDetails = async (id) => {
  console.log("clicked", id);
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const showDetails = document.getElementById("phone-details");
  showDetails.innerHTML = `
<img class="block mx-auto"  src=${phone?.image} alt="" />
<h1>Name: ${phone?.name}</h1>
<p>Brand: ${phone?.brand}</p>
<p>storage: ${phone?.mainFeatures?.storage}</p>
<p>Display size: ${phone?.mainFeatures?.displaySize}</p>
<p>Chipset: ${phone?.mainFeatures?.chipSet}</p>
  `;
  show_modal_data.showModal();
};
