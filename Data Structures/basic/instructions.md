## Objective

### Description:

Create a simple contact management system where users can:

Add contacts with names and phone numbers.
Search for contacts using a substring (string matching).
Quickly look up contacts by name using a hash table.
View contacts in both forward and backward order using a doubly linked list.
This project combines linked lists, string matching, and hash tables in a practical way.

Instructions

Instructions:

1. Define a Contact class with name and phone.

2. Store all contacts in a doubly linked list to allow forward/backward display.

3. Use a hash table (dictionary) to store contacts by name for quick lookup.

4. Implement a substring search function (using naive or KMP) to find names matching a given keyword.

5. Allow basic operations via a text menu:

Add contact
Search by keyword (substring match)
Search by name (hash table)
Display all contacts (forward & backward)

### Hint:

Use Python’s dict as your hash table for simplicity.
For doubly linked list, define nodes with prev and next pointers.
For substring matching, implement a simple naive search first.
Store each contact in both the list and the hash table (same object reference).
Expected Output Example: pgsql

1. Add Contact

2. Search by Keyword

3. Search by Exact Name

4. View All (Forward)

5. View All (Backward)

6. Exit

Enter option: 1

Name: Alice

Phone: 1234567890

Contact added.

Enter option: 2

Search keyword: Al

Match found: Alice - 1234567890
