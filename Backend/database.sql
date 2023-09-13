DROP DATABASE IF EXISTS instagram;
CREATE DATABASE IF NOT EXISTS instagram;
USE instagram;
-- Création de la table "user"
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    pseudo VARCHAR(100),
    followers int,
    suivies int,
    image VARCHAR(255),
    role VARCHAR(25),
    email VARCHAR(100),
    password VARCHAR(255),
    address VARCHAR(100),
    phone VARCHAR(10)
);
DROP TABLE IF EXISTS friendship;
CREATE TABLE friendship (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    friend_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('pending', 'accepted') DEFAULT 'pending',
    FOREIGN KEY (friend_id) REFERENCES user(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Création de la table "publication"
DROP TABLE IF EXISTS publication;
CREATE TABLE publication (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    user_id INT, 
    imageVideoURL VARCHAR(255), 
    legende TEXT, 
    DatePublication TIMESTAMP ,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, 
    publication_id INT, 
    Content TEXT, 
    CommentDate TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES user(id), 
    FOREIGN KEY (publication_id) REFERENCES publication(id)
);

DROP TABLE IF EXISTS likepublication;
CREATE TABLE likepublication (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, 
    publication_id INT,  
    FOREIGN KEY (user_id) REFERENCES user(id), 
    FOREIGN KEY (publication_id) REFERENCES publication(id)
);

-- Insérer cinq utilisateurs fictifs par défaut

INSERT INTO user (firstname, lastname, pseudo, followers, suivies, image, role, email, password, address, phone)
VALUES
    ("John", "Doe", "john_doe", 0, 0,"https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "user", "john@example.com", "motdepasse123", "123 rue de la Rue", "1234567890"), ("Jane", "Smith", "jane_smith", 0, 0,"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "user", "jane@example.com", "mdpsecret456", "456 avenue de l'Avenue", "9876543210"),
    ("Alice", "Johnson", "alice_j", 0, 0, "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "user", "alice@example.com", "mdp12345", "789 chemin du Chemin", "5555555555"),
    ("Bob", "Brown", "bob_b", 0, 0, "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "user", "bob@example.com", "123456mdp", "1010 boulevard du Boulevard", "1111111111"),
    ("Eva", "Lee", "eva_lee", 0, 0, "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "user", "eva@example.com", "mdp56789", "2020 place de la Place", "2222222222");
