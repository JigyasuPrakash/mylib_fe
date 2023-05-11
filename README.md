# mylib_fe

 This repository contains source code of mylib_fe. For demonstrating many to many relationship between authors and books.

## Dependency
- <a href="https://github.com/JigyasuPrakash/mylib_be.git">mylib_be</a> (ROR backend application)

## Installation
``` bash
$ git clone https://github.com/JigyasuPrakash/mylib_fe.git

$ cd ./mylib_fe

$ npm install

$ npm start
```

### Problem Statement

#### Requirement 1:

Create 2 models
```
Authors:

- author_id
- first_name
- last_name
- date_of_birth
```
```
Books:

- book_id
- book_title
- price
- level (Beginner, intermediate, advanced)
```

#### Requirement 2:

Books can have many authors and Authors can have many Books.
```
For example:
R D Sharma has written 2 Books Trigonometry and Advanced Trigonometry. On Advanced Trigonometry, he Collaborated with Deepika Yadav. So Advanced Trigonometry itself is composed of 2 Authors. Create any join tables if needed for the above requirement
```

#### Requirement 3:

Create an interface from where you can:
```
- Add Author
- List Author
- Edit Author
- Delete Author
```
```
- Add Book
- List Book
- Edit Book
- Delete Book
```
While adding a book, you can select multiple authors from the author's table for that book.

#### Requirement 4:

Add JQuery validation on all  forms (Required fields, Max or Min length, data type, etc)

#### Requirement 5:

Create an author/show to get author details
```
For Eg:
If I fire /authors/{author_id}
it will return the author's details and all the books that the author has written for the {author_id}
```
#### Requirement 6:
Use Reactjs in frontend
Add a ReactJS filter in the book listing page with price, level, and author name.

### Author
- <a href="https://jigyasuprakash.github.io">Jigyasu Prakash</a>
