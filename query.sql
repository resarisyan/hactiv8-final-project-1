CREATE DATABASE project1_db;
CREATE TABLE users(
    id SERIAL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE reflections(
    id SERIAL,
    success VARCHAR(256),
    low_point VARCHAR(256),
    take_away VARCHAR(256),
    owner_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_reflection_ref_user FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users (email, password) VALUES ('resarisyan@gmail.com', '123456');
INSERT INTO users (email, password) VALUES ('andry@gmail.com', '123456');

INSERT INTO reflections (success, low_point, take_away, owner_id) VALUES ('today success', 'new low key point', 'new take away', 1);
INSERT INTO reflections (success, low_point, take_away, owner_id) VALUES ('tomorrow success', 'new low point', 'new take away2', 2);