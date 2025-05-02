const params = new URLSearchParams(window.location.search);
const id = params.get("appId");
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI1NTFjMjUwNDAwMTUxYWI2NmUiLCJpYXQiOjE3NDYxNzQ1NDksImV4cCI6MTc0NzM4NDE0OX0.fgDSkklHlEvqEQOCmrSNdMhukWnA7aIB-GxBPxn81ms";

const form = document.getElementById("backoffice-form");
const delBtn = document.getElementById("delete-btn");
const subtitle = document.getElementById("subtitle");

if (id) {
  subtitle.innerText = "Modifica prodotto";
  delBtn.classList.remove("d-none");

  fetch(endpoint + id, { headers: { Authorization: token } })
    .then((res) => res.json())
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("URL").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch((err) => {
      console.error("Errore nel recupero del prodotto:", err);
      alert("Impossibile caricare i dati del prodotto.");
    });
} else {
  subtitle.innerText = "Nuovo prodotto";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    brand: document.getElementById("brand").value.trim(),
    imageUrl: document.getElementById("URL").value.trim(),
    price: parseFloat(document.getElementById("price").value),
  };

  fetch(endpoint + (id || ""), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(newProduct),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error("Errore: " + errorMsg);
      }
      return res.json();
    })
    .then((result) => {
      alert(id ? "Prodotto modificato!" : "Prodotto creato con successo!");
      if (!id) form.reset();
    })
    .catch((err) => {
      console.error("Errore:", err.message);
      alert("Errore durante il salvataggio: " + err.message);
    });
});

delBtn.addEventListener("click", function () {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(endpoint + id, {
      method: "DELETE",
      headers: { Authorization: token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'eliminazione");
        alert("Prodotto eliminato");
        window.location.assign("./backoffice.html");
      })
      .catch((err) => {
        console.error("Errore:", err);
        alert("Errore durante l'eliminazione: " + err.message);
      });
  }
});
