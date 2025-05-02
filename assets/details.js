const URL = "https://striveschool-api.herokuapp.com/api/product/";

const isLoading = (boolean) => {
  const spinner = document.querySelector(".spinner-border");
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const getProductDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("appId");

  if (!productId) {
    alert("ID prodotto non trovato!");
    return;
  }

  isLoading(true);

  fetch(`${URL}${productId}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI1NTFjMjUwNDAwMTUxYWI2NmUiLCJpYXQiOjE3NDYxNzQ1NDksImV4cCI6MTc0NzM4NDE0OX0.fgDSkklHlEvqEQOCmrSNdMhukWnA7aIB-GxBPxn81ms",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel recupero dei dettagli del prodotto");
      }
      return res.json();
    })
    .then((product) => {
      const container = document.getElementById("appointment-details");
      container.innerHTML = `
      <div class="row mb-3 justify-content-center">
        <div class="col-12 col-md-8">
          <h3 class="mb-3 text-center">${product.name}</h3>
          <img src="${product.imageUrl}" class="img-fluid d-block mx-auto" alt="${product.name}" />
        </div>
      </div>
      <div class="row mb-3 justify-content-center">
        <div class="col-12 col-md-8">
          <h4 class="mb-2">Descrizione:</h4>
          <p>${product.description}</p>
        </div>
      </div>
      <div class="row mb-3 justify-content-center">
        <div class="col-12 col-md-8">
          <h4 class="mb-2">Prezzo:</h4>
          <p><strong>${product.price} €</strong></p>
        </div>
      </div>
      <div class="row mb-3 justify-content-center">
        <div class="col-12 col-md-8">
          <a href="./backoffice.html?appId=${product._id}" class="btn btn-primary w-100">Modifica Prodotto</a>
        </div>
      </div>
    `;
    })
    .catch((err) => {
      console.error(err);
      alert("Errore nel recupero dei dettagli: " + err.message);
    })
    .finally(() => {
      isLoading(false);
    });
};

window.onload = function () {
  getProductDetails();
};
