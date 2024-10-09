//--- Modal Interaction ---\\
// Sélectionne la modale, le bouton d'ouverture et le bouton de fermeture
const modal = document.getElementById('restaurant-modal');
const openButton = document.getElementById('button-modal');
const closeButton = document.getElementById('close-modal');

//--- Fonction pour ouvrir la modale ---\\
// Affiche la modale et désactive le scroll de la page principale
function openModal() {
    modal.style.visibility = 'visible';
    document.body.classList.add('modal-open'); // Désactiver le scroll du body
    generateForm(); // Générer dynamiquement le formulaire lorsque la modale s'ouvre
}

//--- Fonction pour fermer la modale ---\\
// Cache la modale et réactive le scroll de la page principale
function closeModal() {
    modal.style.visibility = 'hidden';
    document.body.classList.remove('modal-open'); // Réactiver le scroll du body à chaque fermeture
}

//--- Ajout des événements d'ouverture et de fermeture de la modale ---\\
// Ajoute des écouteurs d'événements sur les boutons pour ouvrir et fermer la modale
openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

//--- Génération dynamique du formulaire de réservation ---\\
// Cette fonction crée et insère un formulaire à l'intérieur de la modale si cela n'a pas déjà été fait
function generateForm() {
    const formContainer = document.querySelector('.modal-container');

    // Si le formulaire existe déjà, ne pas le recréer
    if (document.getElementById('reservation-form')) return;

    // Créer le formulaire et le remplir avec les champs nécessaires
    const form = document.createElement('form');
    form.id = 'reservation-form';

    // --- Contenu du formulaire --- \\
    form.innerHTML = `
        <div>
            <label for="nom">Nom:</label>
            <input type="text" id="nom" name="nom" pattern="^[a-zA-Z\\- ]{2,}$" required
                title="Le nom doit comporter au moins 2 caractères et ne peut contenir que des lettres, des tirets ou des espaces.">
        </div>
        <div>
            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" name="prenom" pattern="^[a-zA-Z\\- ]{2,}$" required
                title="Le prénom doit comporter au moins 2 caractères et ne peut contenir que des lettres, des tirets ou des espaces.">
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$" required
                title="Veuillez entrer une adresse email valide, par exemple: example@example.com">
        </div>
        <div>
            <label for="telephone">Téléphone:</label>
            <input type="tel" id="telephone" name="telephone" pattern="^\\+33[0-9]{9}$" required
                title="Le numéro de téléphone doit être au format français +33XXXXXXXXX (ex: +33123456789)">
        </div>
        <div>
            <label for="date">Date de réservation:</label>
            <input type="date" id="date" name="date" required>
        </div>
        <div>
            <label for="heure">Heure de réservation:</label>
            <select id="heure" name="heure" required>
                <option value="">Sélectionner une heure</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
            </select>
        </div>
        <div>
            <label for="personnes">Nombre de personnes:</label>
            <input type="number" id="personnes" name="personnes" min="1" required title="Le nombre de personnes doit être au moins 1.">
        </div>
        <div class="form-submit">
            <button class="button" type="submit">Envoyer</button>
        </div>
    `;

    // Ajouter le formulaire dans la modale
    formContainer.appendChild(form);

    //--- Contrainte de date ---\\
    // Définit les dates valides : aujourd'hui et jusqu'à 3 mois dans le futur
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3);

    document.getElementById('date').min = today.toISOString().split('T')[0];
    document.getElementById('date').max = maxDate.toISOString().split('T')[0];

    //--- Validation du formulaire lors de la soumission ---\\
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupérer et valider les valeurs des champs
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const personnes = document.getElementById('personnes').value;

        // Vérifier que les champs respectent bien les critères avant de soumettre
        if (nom.length < 2 || prenom.length < 2 || !/^\+33[0-9]{9}$/.test(telephone) || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(email) || personnes < 1) {
            alert('Veuillez remplir correctement tous les champs avant de soumettre.');
        } else {
            alert('Formulaire soumis avec succès!');
            closeModal(); // Fermer la modale après la soumission
        }
    });
}
