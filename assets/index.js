const URL = "https://striveschool-api.herokuapp.com/api/product/";

const isLoading = (boolean) => {
  const spinner = document.querySelector(".spinner-border");
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const generateAlert = (message) => {
  const container = document.getElementById("main-container");
  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.role = "alert";
  alert.innerText = message;
  container.appendChild(alert);
};

const getProducts = () => {
  isLoading(true);

  fetch(URL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI1NTFjMjUwNDAwMTUxYWI2NmUiLCJpYXQiOjE3NDYxNzQ1NDksImV4cCI6MTc0NzM4NDE0OX0.fgDSkklHlEvqEQOCmrSNdMhukWnA7aIB-GxBPxn81ms",
    },
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Prodotti non trovati");
        } else if (res.status >= 500) {
          throw new Error("Errore lato server");
        }
        throw new Error("Errore nella fetch");
      }
      return res.json();
    })
    .then((products) => {
      const container = document.getElementById("product-list");
      container.innerHTML = "";
      products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="ratio ratio-4x3">
              <img src="${product.imageUrl}" class="card-img-top object-fit-cover" alt="${product.name}" />
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-truncate" title="${product.name}">${product.name}</h5>
              <p class="card-text text-truncate" title="${product.description}">${product.description}</p>
              <p class="card-text fw-bold">${product.price} €</p>
              <div class="mt-auto d-flex flex-wrap gap-2">
                <a href="./details.html?appId=${product._id}" class="btn btn-info btn-sm w-100">Vedi Dettagli</a>
                <a href="./backoffice.html?appId=${product._id}" class="btn btn-secondary btn-sm w-100">Modifica</a>
                <button onclick="deleteProduct('${product._id}')" class="btn btn-danger btn-sm w-100">Elimina</button>
              </div>
            </div>
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch((error) => {
      console.error(error);
      generateAlert(error.message);
    })
    .finally(() => {
      isLoading(false);
    });
};

const deleteProduct = (productId) => {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(URL + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI1NTFjMjUwNDAwMTUxYWI2NmUiLCJpYXQiOjE3NDYxNzQ1NDksImV4cCI6MTc0NzM4NDE0OX0.fgDSkklHlEvqEQOCmrSNdMhukWnA7aIB-GxBPxn81ms",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'eliminazione");
        alert("Prodotto eliminato");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Errore:", err);
        alert("Errore durante l'eliminazione: " + err.message);
      });
  }
};

window.onload = function () {
  getProducts();
};
