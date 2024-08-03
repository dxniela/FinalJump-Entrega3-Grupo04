CREATE SCHEMA trailerflix;
USE trailerflix;

CREATE TABLE IF NOT EXISTS `contenido` (
	`id` int AUTO_INCREMENT UNIQUE,
	`titulo` varchar(255),
	`poster` varchar(255),
	`resumen` text,
	`temporadas` int,
	`trailer` varchar(255),
	`categoria` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categorias` (
	`id` int AUTO_INCREMENT UNIQUE,
	`nombre` varchar(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `generos` (
	`id` int AUTO_INCREMENT UNIQUE,
	`nombre` varchar(255),
	 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tags` (
	`id` int AUTO_INCREMENT UNIQUE,
	`nombre` varchar(255),
	 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `actores` (
	`id` int AUTO_INCREMENT UNIQUE,
	`nombre` varchar(255),
	 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `contenido_tag` (
	`contenido_id` int ,
	`tag_id` int,
	 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`contenido_id`, `tag_id`)
);

CREATE TABLE IF NOT EXISTS `contenido_actor` (
	`actor_id` int,
	`contenido_id` int,
	 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`actor_id`, `contenido_id`)
);

CREATE TABLE IF NOT EXISTS `contenido_genero` (
	`contenido_id` int,
	`genero_id` int,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`contenido_id`, `genero_id`)
);

ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk7` FOREIGN KEY (`categoria`) REFERENCES `categorias`(`id`);

ALTER TABLE `contenido_tag` ADD CONSTRAINT `contenido_tag_fk0` FOREIGN KEY (`contenido_id`) REFERENCES `contenido`(`id`);

ALTER TABLE `contenido_tag` ADD CONSTRAINT `contenido_tag_fk1` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`);
ALTER TABLE `contenido_actor` ADD CONSTRAINT `contenido_actor_fk0` FOREIGN KEY (`actor_id`) REFERENCES `actores`(`id`);

ALTER TABLE `contenido_actor` ADD CONSTRAINT `contenido_actor_fk1` FOREIGN KEY (`contenido_id`) REFERENCES `contenido`(`id`);
ALTER TABLE `contenido_genero` ADD CONSTRAINT `contenido_genero_fk0` FOREIGN KEY (`contenido_id`) REFERENCES `contenido`(`id`);

ALTER TABLE `contenido_genero` ADD CONSTRAINT `contenido_genero_fk1` FOREIGN KEY (`genero_id`) REFERENCES `generos`(`id`);
