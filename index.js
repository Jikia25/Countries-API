const fatchButton = document.querySelector(".get-data");
const baseUrl = "https://restcountries.com/v3.1/all";
const wrapper = document.querySelector(".card-wrapper");
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
    renderItems(wrapper,json)
  } catch (error) {
    console.error(error.message);
  }
}

function  renderItems (wrapper,array){
  array.forEach((country)=>{
    const card = document.createElement('div')
    card.classList.add('card')
    
    const img = document.createElement("img")
    img.setAttribute("src", country.flags.svg)
    card.append(img)
    wrapper.append(card)
  })
}