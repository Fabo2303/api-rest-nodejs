CREATE DATABASE IF NOT EXISTS expocero;

USE expocero;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    role ENUM('ADMIN', 'EMPLEADO') NOT NULL
);

DESCRIBE usuarios;

INSERT INTO usuarios (username, password, role) VALUES ('admin', 'admin', 'ADMIN');

INSERT INTO usuarios (username, password, role) VALUES ('empleado', 'empleado', 'EMPLEADO');

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

DESCRIBE productos;

INSERT INTO productos (nombre, precio) VALUES ('Producto 1', 100.00);

INSERT INTO productos (nombre, precio) VALUES ('Producto 2', 200.00);