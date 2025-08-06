document.getElementById("unifiedLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!role) {
    alert("Veuillez choisir un rôle.");
    return;
  }

  if (role === "client") {
    if (password === "1234") {
      window.location.href = "produits.html";
    } else {
      alert("Mot de passe client incorrect !");
    }
  } else if (role === "admin") {
    if (email === "admin@mail.com" && password === "admin") {
      window.location.href = "admin.html";
    } else {
      alert("Identifiants administrateur incorrects !");
    }
  } else {
    alert("Rôle inconnu.");
  }
});