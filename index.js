const fatchButton = document.querySelector(".get-data");
const baseUrl = "https://restcountries.com/v3.1/all";
const wrapper = document.querySelector(".card-wrapper");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.querySelector(".modal-close");
closeModal.addEventListener("click", () => {
  modalWrapper.classList.remove("visible");
});
fatchButton.addEventListener("click", () => {
  getData(baseUrl);
  console.log("button-ckicked");
});

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    renderItems(wrapper, json);
  } catch (error) {
    console.error(error.message);
  }
}

function renderItems(wrapper, array) {
  array.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.setAttribute("src", country.flags.svg);
    img.setAttribute("alt", country.flags.alt);
    card.append(img);
    const title = document.createElement("h2");
    title.textContent = `country : ${country.name.official}`;
    card.append(title);
    const capital = document.createElement("p");
    capital.textContent = `Capital : ${
      country.capital ? country.capital[0] : "capital city not found"
    }`;
    card.append(capital);
    const population = document.createElement("p");
    population.classList.add("population");
    population.textContent = `population : ${country.population} 👤`;
    card.append(population);

    const languagesWrapper = document.createElement("ul");

    if (country.languages) {
      Object.entries(country.languages).forEach(([key, value]) => {
        if (key && value) {
          const listItem = document.createElement("li");
          listItem.textContent = `${key} : ${value}`;
          languagesWrapper.append(listItem);
        }
      });
    }
    card.append(languagesWrapper);

    const continets = document.createElement("p");
    const continentStr = country.continents.join(" , ");
    continets.textContent = `continents : ${continentStr}`;
    card.append(continets);

    const map = document.createElement("a");
    map.setAttribute("href", country.maps.googleMaps);
    map.textContent = `📍Location`;
    card.append(map);
    const moreInfoButton = document.createElement("button");
    moreInfoButton.textContent = "See more Information 👀";
    card.append(moreInfoButton);

    moreInfoButton.addEventListener("click", (e) => {
      modalContent.innerHTML = "";
      const cardData = e.target.parentNode.cloneNode(true);
      modalWrapper.classList.add("visible");
      modalContent.append(cardData);
    });
    wrapper.append(card);
  });
}
