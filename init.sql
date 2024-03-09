-- Create User table
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    fullname VARCHAR(255),
    membership VARCHAR(50) CHECK (membership IN ('Premium', 'Normal')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Admin table
CREATE TABLE "admin_users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    fullname VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Post table
CREATE TABLE "post" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    category_id INT,
    status VARCHAR(50) CHECK (status IN ('Draft', 'Published', 'Pending Review')),
    label VARCHAR(50) CHECK (label IN ('Normal', 'Premium')) NOT NULL DEFAULT 'Normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Category table
CREATE TABLE "category" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    activated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Payment table
CREATE TABLE "payment" (
    id SERIAL PRIMARY KEY,
    payment_id INT,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, fullName, membership) VALUES ('user1', 'user1@example.com', 'user1', 'User 1', 'Normal');
INSERT INTO users (username, email, password, fullName, membership) VALUES ('user2', 'user2@example.com', 'user2', 'User 2', 'Normal');
INSERT INTO admin_users (username, email, password, fullName) VALUES ('admin', 'user2@example.com', 'admin', 'Admin');
INSERT INTO category (name, description, activated) VALUES ('Cars', 'Cars Description', true);
INSERT INTO category (name, description, activated) VALUES ('Motor', 'Motor Description', true);
INSERT INTO category (name, description, activated) VALUES ('Air Plane', 'Air Plane Description', false);
INSERT INTO post (title, body, category_id, status) VALUES ('Cars Introduction 1', '<h1>Cars Introduction 1</h1>', 1, 'Published');
INSERT INTO post (title, body, category_id, status) VALUES ('Motor Introduction 1', '<h1>Motor Introduction 1</h1>', 2, 'Published');
INSERT INTO post (title, body, category_id, status) VALUES ('Cars Introduction 2', '<h1>Cars Introduction 2</h1>', 1, 'Published');
INSERT INTO post (title, body, category_id, status) VALUES ('Motor Introduction 2', '<h1>Motor Introduction 2</h1>', 2, 'Published');
INSERT INTO post (title, body, category_id, status, label) VALUES ('Cars Introduction 3', '<h1>Cars Introduction 3</h1>', 1, 'Published', 'Premium');