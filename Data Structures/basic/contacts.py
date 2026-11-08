# ============================================================
#  SYSTEME DE GESTION DE CONTACTS
#  Structures utilisees :
#    - Liste doublement chainee  -> afficher dans les deux sens
#    - Table de hachage (dict)   -> retrouver un contact par son nom
#    - Recherche de sous-chaine  -> retrouver un contact par mot-cle
# ============================================================


# ---------- 1. La classe Contact ----------
# Un contact, c'est simplement un nom et un numero de telephone.
class Contact:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone

    # Definit comment le contact s'affiche avec print()
    def __str__(self):
        return f"{self.name} - {self.phone}"


# ---------- 2. La liste doublement chainee ----------
# Un noeud (Node) est une "boite" qui contient un contact
# et deux fleches : une vers le noeud precedent, une vers le suivant.
#
#   None <- [Alice] <-> [Bob] <-> [Chloe] -> None
#            head                  tail
class Node:
    def __init__(self, contact):
        self.contact = contact
        self.prev = None  # noeud precedent
        self.next = None  # noeud suivant


class DoublyLinkedList:
    def __init__(self):
        self.head = None  # premier noeud de la liste
        self.tail = None  # dernier noeud de la liste

    # Ajoute un contact a la fin de la liste
    def append(self, contact):
        new_node = Node(contact)

        if self.head is None:
            # La liste est vide : le nouveau noeud est a la fois le premier et le dernier
            self.head = new_node
            self.tail = new_node
        else:
            # On accroche le nouveau noeud apres l'ancien dernier
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node  # le nouveau noeud devient le dernier

    # Affiche du premier au dernier : on part de head et on suit les fleches "next"
    def display_forward(self):
        current = self.head
        if current is None:
            print("No contacts.")
        while current is not None:
            print(current.contact)
            current = current.next

    # Affiche du dernier au premier : on part de tail et on suit les fleches "prev"
    def display_backward(self):
        current = self.tail
        if current is None:
            print("No contacts.")
        while current is not None:
            print(current.contact)
            current = current.prev


# ---------- 3. La recherche de sous-chaine (methode naive) ----------
# On veut savoir si "pattern" (le mot-cle) se trouve dans "text" (le nom).
# Methode naive : on essaie chaque position de depart possible dans le texte
# et on compare lettre par lettre.
#
#   text = "Alice", pattern = "lic"
#   position 0 : "Ali" != "lic"
#   position 1 : "lic" == "lic"  -> trouve !
def naive_search(text, pattern):
    # On met tout en minuscules pour que "al" trouve aussi "Alice"
    text = text.lower()
    pattern = pattern.lower()

    n = len(text)
    m = len(pattern)

    # i = position de depart dans le texte
    for i in range(n - m + 1):
        j = 0
        # On avance tant que les lettres sont identiques
        while j < m and text[i + j] == pattern[j]:
            j += 1
        # Si on a parcouru tout le mot-cle, c'est qu'il est present
        if j == m:
            return True

    return False


# ---------- 4. Le stockage des contacts ----------
contact_list = DoublyLinkedList()  # pour l'affichage dans les deux sens
contact_table = {}                 # table de hachage : nom -> contact


def add_contact():
    name = input("Name: ").strip()
    phone = input("Phone: ").strip()

    if name == "":
        print("Name cannot be empty.")
        return

    # Les noms servent de cles dans la table de hachage : ils doivent etre uniques
    if name.lower() in contact_table:
        print("This contact already exists.")
        return

    contact = Contact(name, phone)

    # Le MEME objet est range dans les deux structures (meme reference)
    contact_list.append(contact)
    contact_table[name.lower()] = contact  # cle en minuscules : "alice" == "Alice"

    print("Contact added.")


def search_by_keyword():
    keyword = input("Search keyword: ").strip()
    found = False

    # On parcourt toute la liste et on teste chaque nom
    current = contact_list.head
    while current is not None:
        if naive_search(current.contact.name, keyword):
            print("Match found:", current.contact)
            found = True
        current = current.next

    if not found:
        print("No match found.")


def search_by_name():
    name = input("Exact name: ").strip()

    # Avec la table de hachage, pas besoin de parcourir la liste :
    # on accede directement au contact grace a sa cle (tres rapide).
    contact = contact_table.get(name.lower())

    if contact is not None:
        print("Contact found:", contact)
    else:
        print("Contact not found.")


# ---------- 5. Le menu ----------
def main():
    while True:
        print()
        print("1. Add Contact")
        print("2. Search by Keyword")
        print("3. Search by Exact Name")
        print("4. View All (Forward)")
        print("5. View All (Backward)")
        print("6. Exit")

        option = input("Enter option: ").strip()

        if option == "1":
            add_contact()
        elif option == "2":
            search_by_keyword()
        elif option == "3":
            search_by_name()
        elif option == "4":
            contact_list.display_forward()
        elif option == "5":
            contact_list.display_backward()
        elif option == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid option.")


# Lance le programme seulement si on execute ce fichier directement
if __name__ == "__main__":
    main()
