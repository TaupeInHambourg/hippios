-- Script d'initialisation PostgreSQL
-- Basé sur le schéma DBML précédent

-- Extension pour générer des UUID si tu préfères des UUID plutôt que des SERIAL
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    mail VARCHAR(255) NOT NULL UNIQUE,
    notification BOOLEAN NOT NULL DEFAULT true,
    stripe_customer_id VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE breed (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE horse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 0),
    sexe VARCHAR(20),
    race VARCHAR(100),
    weight REAL CHECK (weight >= 0),
    size REAL CHECK (size >= 0),
    color VARCHAR(50),
    micropuce_id VARCHAR(50) UNIQUE,
    id_breed INTEGER REFERENCES breed(id) ON DELETE SET NULL,
    id_user INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Une session d'activité (sortie, entraînement, compétition...)
CREATE TABLE horse_activity (
    id SERIAL PRIMARY KEY,
    id_horse INTEGER NOT NULL REFERENCES horse(id) ON DELETE CASCADE,
    type VARCHAR(50), -- sortie, entrainement, competition...
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    distance REAL CHECK (distance >= 0), -- en metres ou km, a definir
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Relevés ponctuels de santé/vitaux, rattachés à un cheval
-- et optionnellement à une activité en cours
CREATE TABLE horse_health_record (
    id SERIAL PRIMARY KEY,
    id_horse INTEGER NOT NULL REFERENCES horse(id) ON DELETE CASCADE,
    id_activity INTEGER REFERENCES horse_activity(id) ON DELETE SET NULL,
    recorded_at TIMESTAMP NOT NULL DEFAULT now(),
    heart_rate INTEGER CHECK (heart_rate >= 0), -- bpm
    speed REAL CHECK (speed >= 0), -- vitesse instantanee
    temperature REAL, -- en °C
    sweat_level VARCHAR(20), -- low, medium, high (ou score selon capteur)
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE document (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    id_user INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    id_horse INTEGER REFERENCES horse(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CHECK (id_user IS NOT NULL OR id_horse IS NOT NULL)
);

CREATE TABLE calendar (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    information TEXT,
    id_user INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    id_horse INTEGER REFERENCES horse(id) ON DELETE CASCADE,
    CHECK (id_user IS NOT NULL OR id_horse IS NOT NULL)
);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    role VARCHAR(100), -- veterinaire, marechal-ferrant...
    name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    mail VARCHAR(255),
    address VARCHAR(255),
    id_user INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(100),
    stripe_payment_id VARCHAR(100) NOT NULL UNIQUE,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'eur',
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, succeeded, failed, refunded
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE subscription (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(100) NOT NULL UNIQUE,
    plan VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, canceled, past_due
    current_period_end TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Index utiles pour les recherches fréquentes
CREATE INDEX idx_horse_id_breed ON horse(id_breed);
CREATE INDEX idx_horse_id_user ON horse(id_user);
CREATE INDEX idx_horse_activity_id_horse ON horse_activity(id_horse);
CREATE INDEX idx_horse_health_record_id_horse ON horse_health_record(id_horse);
CREATE INDEX idx_horse_health_record_id_activity ON horse_health_record(id_activity);
CREATE INDEX idx_horse_health_record_recorded_at ON horse_health_record(recorded_at);
CREATE INDEX idx_document_id_user ON document(id_user);
CREATE INDEX idx_document_id_horse ON document(id_horse);
CREATE INDEX idx_calendar_id_user ON calendar(id_user);
CREATE INDEX idx_calendar_id_horse ON calendar(id_horse);
CREATE INDEX idx_contact_id_user ON contact(id_user);
CREATE INDEX idx_payment_id_user ON payment(id_user);
CREATE INDEX idx_subscription_id_user ON subscription(id_user);