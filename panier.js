// Références DOM
const nameInput = document.getElementById("productName");
const qtyInput = document.getElementById("productQty");
const addBtn = document.getElementById("addBtn");
const productList = document.getElementById("productList");
const totalCount = document.getElementById("totalCount");
const emptyMsg = document.getElementById("emptyMsg");

// Mettre à jour le total
function updateTotal() {
    let total = 0;

    const allItems = productList.querySelectorAll("li span.qty");
    allItems.forEach(q => {
        total += parseInt(q.textContent);
    });

    totalCount.textContent = total;

    // Afficher / cacher message "panier vide"
    emptyMsg.style.display = total === 0 ? "block" : "none";
}

// Ajouter un produit
addBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const qty = parseInt(qtyInput.value);

    if (name === "" || qty <= 0) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création d’un <li>
    const li = document.createElement("li");

    // Texte produit
    const label = document.createElement("span");
    label.textContent = name + " - ";

    // Quantité
    const qtySpan = document.createElement("span");
    qtySpan.classList.add("qty");
    qtySpan.textContent = qty;

    // Bouton +
    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
        qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
        updateTotal();
    });

    // Bouton -
    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => {
        const current = parseInt(qtySpan.textContent);
        if (current > 1) {
            qtySpan.textContent = current - 1;
        }
        updateTotal();
    });

    // Bouton supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateTotal();
    });

    // Construction du <li>
    li.appendChild(label);
    li.appendChild(qtySpan);
    li.appendChild(plusBtn);
    li.appendChild(minusBtn);
    li.appendChild(deleteBtn);

    // Ajout au DOM
    productList.appendChild(li);

    // Mise à jour total
    updateTotal();

    // Vider champs
    nameInput.value = "";
    qtyInput.value = 1;
});
