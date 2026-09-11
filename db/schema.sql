CREATE DATABASE IF NOT EXISTS agenda;
USE agenda;
 
CREATE TABLE contacts (
  id         CHAR(36)     PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  phone      VARCHAR(50)  NOT NULL,
  notes      TEXT,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 