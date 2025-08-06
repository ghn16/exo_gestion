class Produit {
  constructor(nom, prix, quantite) {
    this.nom = nom;
    this.prix = parseFloat(prix);
    this.quantite = parseInt(quantite);
  }

  afficher() {
    return `
      <td>${this.nom}</td>
      <td>${this.prix.toLocaleString()} FCFA</td>
      <td>${this.quantite}</td>
    `;
  }
}

class GestionProduits {
  constructor() {
    this.produits = [];
    this.indexAModifier = null;

    this.form = document.getElementById("formProduit");
    this.tbody = document.querySelector(".product-table tbody");
    this.nomInput = document.getElementById("nomProduit");
    this.prixInput = document.getElementById("prixProduit");
    this.quantiteInput = document.getElementById("quantiteProduit");
    this.submitBtn = document.getElementById("submitBtn");

    this.init();
  }

  init() {
    document.querySelector(".add-btn").addEventListener("click", () => {
      this.form.reset();
      this.indexAModifier = null;
      this.submitBtn.textContent = "Ajouter";
      this.form.style.display = "block";
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = this.nomInput.value;
      const prix = this.prixInput.value;
      const quantite = this.quantiteInput.value;

      if (this.indexAModifier === null) {
        this.ajouterProduit(nom, prix, quantite);
      } else {
        this.produits[this.indexAModifier] = new Produit(nom, prix, quantite);
        this.indexAModifier = null;
        this.submitBtn.textContent = "Ajouter";
      }

      this.form.reset();
      this.form.style.display = "none";
      this.afficherProduits();
    });

    this.afficherProduits();
  }

  ajouterProduit(nom, prix, quantite) {
    const nouveau = new Produit(nom, prix, quantite);
    this.produits.push(nouveau);
  }

  afficherProduits() {
    this.tbody.innerHTML = "";
    this.produits.forEach((produit, index) => {
      const ligne = document.createElement("tr");
      ligne.innerHTML = produit.afficher() + `
        <td>
          <button onclick="gestion.modifierProduit(${index})" class="edit-btn">Modifier</button>
          <button onclick="gestion.supprimerProduit(${index})" class="delete-btn">Supprimer</button>
        </td>
      `;
      this.tbody.appendChild(ligne);
    });
  }

  modifierProduit(index) {
    const produit = this.produits[index];
    this.nomInput.value = produit.nom;
    this.prixInput.value = produit.prix;
    this.quantiteInput.value = produit.quantite;

    this.indexAModifier = index;
    this.submitBtn.textContent = "Modifier";
    this.form.style.display = "block";
  }

  supprimerProduit(index) {
    this.produits.splice(index, 1);
    this.afficherProduits();
  }
}

let gestion;
document.addEventListener("DOMContentLoaded", () => {
  gestion = new GestionProduits();
});



