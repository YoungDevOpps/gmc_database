// ============================================================
//  SYSTEME DE GESTION DE CONTACTS
//  Structures utilisees :
//    - Liste doublement chainee  -> afficher dans les deux sens
//    - Table de hachage (Map)    -> retrouver un contact par son nom
//    - Recherche de sous-chaine  -> retrouver un contact par mot-cle
// ============================================================

// Module de Node.js qui permet de poser des questions dans le terminal
const readline = require("readline/promises");

// ---------- 1. La classe Contact ----------
// Un contact, c'est simplement un nom et un numero de telephone.
class Contact {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  // Definit comment le contact s'affiche sous forme de texte
  toString() {
    return `${this.name} - ${this.phone}`;
  }
}

// ---------- 2. La liste doublement chainee ----------
// Un noeud (Node) est une "boite" qui contient un contact
// et deux fleches : une vers le noeud precedent, une vers le suivant.
//
//   null <- [Alice] <-> [Bob] <-> [Chloe] -> null
//            head                  tail
class Node {
  constructor(contact) {
    this.contact = contact;
    this.prev = null; // noeud precedent
    this.next = null; // noeud suivant
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // premier noeud de la liste
    this.tail = null; // dernier noeud de la liste
  }

  // Ajoute un contact a la fin de la liste
  append(contact) {
    const newNode = new Node(contact);

    if (this.head === null) {
      // La liste est vide : le nouveau noeud est a la fois le premier et le dernier
      this.head = newNode;
      this.tail = newNode;
    } else {
      // On accroche le nouveau noeud apres l'ancien dernier
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode; // le nouveau noeud devient le dernier
    }
  }

  // Affiche du premier au dernier : on part de head et on suit les fleches "next"
  displayForward() {
    let current = this.head;
    if (current === null) {
      console.log("No contacts.");
    }
    while (current !== null) {
      console.log(current.contact.toString());
      current = current.next;
    }
  }

  // Affiche du dernier au premier : on part de tail et on suit les fleches "prev"
  displayBackward() {
    let current = this.tail;
    if (current === null) {
      console.log("No contacts.");
    }
    while (current !== null) {
      console.log(current.contact.toString());
      current = current.prev;
    }
  }
}

// ---------- 3. La recherche de sous-chaine (methode naive) ----------
// On veut savoir si "pattern" (le mot-cle) se trouve dans "text" (le nom).
// Methode naive : on essaie chaque position de depart possible dans le texte
// et on compare lettre par lettre.
//
//   text = "Alice", pattern = "lic"
//   position 0 : "Ali" != "lic"
//   position 1 : "lic" == "lic"  -> trouve !
function naiveSearch(text, pattern) {
  // On met tout en minuscules pour que "al" trouve aussi "Alice"
  text = text.toLowerCase();
  pattern = pattern.toLowerCase();

  const n = text.length;
  const m = pattern.length;

  // i = position de depart dans le texte
  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    // On avance tant que les lettres sont identiques
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    // Si on a parcouru tout le mot-cle, c'est qu'il est present
    if (j === m) {
      return true;
    }
  }

  return false;
}

// ---------- 4. Le stockage des contacts ----------
const contactList = new DoublyLinkedList(); // pour l'affichage dans les deux sens
const contactTable = new Map(); // table de hachage : nom -> contact

// "rl" sert a lire ce que l'utilisateur tape au clavier.
// "await rl.question(...)" attend que l'utilisateur appuie sur Entree.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function addContact() {
  const name = (await rl.question("Name: ")).trim();
  const phone = (await rl.question("Phone: ")).trim();

  if (name === "") {
    console.log("Name cannot be empty.");
    return;
  }

  // Les noms servent de cles dans la table de hachage : ils doivent etre uniques
  if (contactTable.has(name.toLowerCase())) {
    console.log("This contact already exists.");
    return;
  }

  const contact = new Contact(name, phone);

  // Le MEME objet est range dans les deux structures (meme reference)
  contactList.append(contact);
  contactTable.set(name.toLowerCase(), contact); // cle en minuscules : "alice" == "Alice"

  console.log("Contact added.");
}

async function searchByKeyword() {
  const keyword = (await rl.question("Search keyword: ")).trim();
  let found = false;

  // On parcourt toute la liste et on teste chaque nom
  let current = contactList.head;
  while (current !== null) {
    if (naiveSearch(current.contact.name, keyword)) {
      console.log("Match found: " + current.contact);
      found = true;
    }
    current = current.next;
  }

  if (!found) {
    console.log("No match found.");
  }
}

async function searchByName() {
  const name = (await rl.question("Exact name: ")).trim();

  // Avec la table de hachage, pas besoin de parcourir la liste :
  // on accede directement au contact grace a sa cle (tres rapide).
  const contact = contactTable.get(name.toLowerCase());

  if (contact !== undefined) {
    console.log("Contact found: " + contact);
  } else {
    console.log("Contact not found.");
  }
}

// ---------- 5. Le menu ----------
async function main() {
  while (true) {
    console.log();
    console.log("1. Add Contact");
    console.log("2. Search by Keyword");
    console.log("3. Search by Exact Name");
    console.log("4. View All (Forward)");
    console.log("5. View All (Backward)");
    console.log("6. Exit");

    const option = (await rl.question("Enter option: ")).trim();

    if (option === "1") {
      await addContact();
    } else if (option === "2") {
      await searchByKeyword();
    } else if (option === "3") {
      await searchByName();
    } else if (option === "4") {
      contactList.displayForward();
    } else if (option === "5") {
      contactList.displayBackward();
    } else if (option === "6") {
      console.log("Goodbye!");
      break;
    } else {
      console.log("Invalid option.");
    }
  }

  rl.close(); // on arrete la lecture du clavier pour que le programme se termine
}

main();
