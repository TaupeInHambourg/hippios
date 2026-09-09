-- Seed de données de test pour la base hippios
-- A executer APRES init_schema.sql

-- =========================
-- USERS
-- =========================
INSERT INTO "user" (first_name, last_name, phone_number, address, city, mail, notification, stripe_customer_id, password) VALUES
('Camille', 'Dubois', '0611223344', '12 rue des Ecuries', 'Lyon', 'camille.dubois@example.com', true, 'cus_stripe_001', '$2b$10$hashplaceholder1'),
('Julien', 'Martin', '0622334455', '5 chemin du Haras', 'Toulouse', 'julien.martin@example.com', true, 'cus_stripe_002', '$2b$10$hashplaceholder2'),
('Sarah', 'Bernard', '0633445566', '8 avenue des Pâtures', 'Nantes', 'sarah.bernard@example.com', false, 'cus_stripe_003', '$2b$10$hashplaceholder3');

-- =========================
-- BREEDS
-- =========================
INSERT INTO breed (name) VALUES
('Frison'),
('Pur-sang arabe'),
('Selle Français'),
('Shetland'),
('Camargue');

-- =========================
-- HORSES
-- =========================
INSERT INTO horse (name, age, sexe, race, weight, size, color, micropuce_id, id_breed, id_user) VALUES
('Éclair', 8, 'Hongre', 'Selle Français', 550, 165, 'Bai', 'MP-0001-FR', 3, 1),
('Bella', 12, 'Jument', 'Frison', 600, 160, 'Noir', 'MP-0002-FR', 1, 1),
('Sultan', 5, 'Etalon', 'Pur-sang arabe', 450, 150, 'Gris', 'MP-0003-FR', 2, 2),
('Poussière', 15, 'Jument', 'Camargue', 400, 140, 'Gris clair', 'MP-0004-FR', 5, 3);

-- =========================
-- HORSE ACTIVITIES
-- =========================
INSERT INTO horse_activity (id_horse, type, started_at, ended_at, distance, notes) VALUES
(1, 'Entrainement', '2026-08-01 09:00:00', '2026-08-01 10:15:00', 12.5, 'Séance de dressage en carrière'),
(1, 'Sortie', '2026-08-05 15:00:00', '2026-08-05 16:30:00', 18.0, 'Balade en forêt'),
(2, 'Compétition', '2026-08-10 08:00:00', '2026-08-10 12:00:00', 25.3, 'Concours de saut d''obstacles'),
(3, 'Entrainement', '2026-08-12 07:30:00', '2026-08-12 08:45:00', 10.2, 'Travail au galop'),
(4, 'Sortie', '2026-08-15 16:00:00', '2026-08-15 17:00:00', 8.7, 'Promenade tranquille en bord de mer');

-- =========================
-- HORSE HEALTH RECORDS
-- =========================
INSERT INTO horse_health_record (id_horse, id_activity, recorded_at, heart_rate, speed, temperature, sweat_level) VALUES
(1, 1, '2026-08-01 09:15:00', 95, 12.4, 37.8, 'low'),
(1, 1, '2026-08-01 09:45:00', 120, 18.9, 38.2, 'medium'),
(1, 1, '2026-08-01 10:10:00', 88, 6.1, 37.9, 'low'),
(1, 2, '2026-08-05 15:20:00', 105, 15.0, 38.0, 'medium'),
(1, 2, '2026-08-05 16:10:00', 92, 9.3, 37.7, 'low'),
(2, 3, '2026-08-10 08:30:00', 140, 28.5, 38.9, 'high'),
(2, 3, '2026-08-10 10:00:00', 150, 32.1, 39.1, 'high'),
(2, 3, '2026-08-10 11:45:00', 100, 5.0, 38.1, 'medium'),
(3, 4, '2026-08-12 07:45:00', 130, 24.7, 38.6, 'high'),
(3, 4, '2026-08-12 08:30:00', 98, 8.2, 38.0, 'low'),
(4, 5, '2026-08-15 16:20:00', 85, 7.5, 37.6, 'low'),
(4, 5, '2026-08-15 16:50:00', 90, 6.8, 37.7, 'low'),
(3, NULL, '2026-08-20 09:00:00', 60, 0, 37.5, 'low');

-- =========================
-- DOCUMENTS
-- =========================
INSERT INTO document (name, content, id_user, id_horse) VALUES
('Carnet de vaccination', 'Vaccinations à jour au 01/08/2026', 1, 1),
('Contrat de pension', 'Contrat signé le 01/01/2026', 1, NULL),
('Certificat vétérinaire', 'Visite annuelle - RAS', 2, 3),
('Facture maréchal-ferrant', 'Ferrure complète - 80€', 3, 4);

-- =========================
-- CALENDAR
-- =========================
INSERT INTO calendar (title, date, information, id_user, id_horse) VALUES
('Visite vétérinaire', '2026-09-15 10:00:00', 'Contrôle annuel', 1, 1),
('Rendez-vous maréchal-ferrant', '2026-09-20 14:00:00', 'Ferrure des 4 pieds', 1, 2),
('Concours régional', '2026-10-01 08:00:00', 'Épreuve de saut niveau amateur', 2, 3),
('Rappel vaccin', '2026-09-25 09:00:00', 'Rappel grippe équine', 3, 4);

-- =========================
-- CONTACTS
-- =========================
INSERT INTO contact (role, name, phone_number, mail, address, id_user) VALUES
('Vétérinaire', 'Dr. Anne Lefèvre', '0655667788', 'anne.lefevre@vet.example.com', '3 rue de la Clinique, Lyon', 1),
('Maréchal-ferrant', 'Marc Petit', '0644556677', 'marc.petit@ferrure.example.com', '10 route des Forges, Lyon', 1),
('Vétérinaire', 'Dr. Paul Girard', '0633221100', 'paul.girard@vet.example.com', '7 avenue Equine, Toulouse', 2),
('Ostéopathe équin', 'Claire Moreau', '0699887766', 'claire.moreau@osteo.example.com', '2 impasse des Sabots, Nantes', 3);

-- =========================
-- PAYMENTS
-- =========================
INSERT INTO payment (id_user, stripe_customer_id, stripe_payment_id, amount, currency, status, created_at) VALUES
(1, 'cus_stripe_001', 'pi_stripe_1001', 29.99, 'eur', 'succeeded', '2026-08-01 10:00:00'),
(2, 'cus_stripe_002', 'pi_stripe_1002', 29.99, 'eur', 'succeeded', '2026-08-03 11:00:00'),
(3, 'cus_stripe_003', 'pi_stripe_1003', 29.99, 'eur', 'failed', '2026-08-05 09:30:00');

-- =========================
-- SUBSCRIPTIONS
-- =========================
INSERT INTO subscription (id_user, stripe_subscription_id, plan, status, current_period_end) VALUES
(1, 'sub_stripe_2001', 'premium', 'active', '2026-09-01 00:00:00'),
(2, 'sub_stripe_2002', 'standard', 'active', '2026-09-03 00:00:00'),
(3, 'sub_stripe_2003', 'standard', 'past_due', '2026-08-05 00:00:00');
