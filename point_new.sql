-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-01-2021 a las 01:31:33
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `point_new`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carriers`
--

CREATE TABLE `carriers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `radio` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `extra_price` decimal(10,2) NOT NULL,
  `extra_distance` float NOT NULL,
  `id_parent` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `carriers`
--

INSERT INTO `carriers` (`id`, `name`, `phone`, `radio`, `base_price`, `extra_price`, `extra_distance`, `id_parent`, `createdAt`, `updatedAt`) VALUES
(1, 'Andres Aguilar', '0114144', '5', '3000.00', '500.00', 200, 3, '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(2, 'Miguel Campos', '022255', '10', '4000.00', '100.00', 700, 3, '2021-01-11 21:07:59', '2021-01-11 21:07:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrier_addresses`
--

CREATE TABLE `carrier_addresses` (
  `id` int(11) NOT NULL,
  `id_carrier` int(11) NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `address` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `carrier_addresses`
--

INSERT INTO `carrier_addresses` (`id`, `id_carrier`, `latitude`, `longitude`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'jbuhbhubhu5555', 'uhbuhbuh666', 'Macaracuay', '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(2, 2, 'nljnk3513', 'bhkn432', 'Gamarra', '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(3, 1, 'bmnmbm2222', 'njlnjk453', 'Segundera', '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(4, 2, 'bjk452', 'bk4532', 'los tanque la villa', '2021-01-11 21:07:59', '2021-01-11 21:07:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `id_parent`, `createdAt`, `updatedAt`) VALUES
(1, 'categoria 1', NULL, '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(2, 'categoria 2', 3, '2021-01-11 21:07:59', '2021-01-11 21:07:59'),
(3, 'categoria 3', NULL, '2021-01-11 21:07:59', '2021-01-11 21:07:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `discount` tinyint(4) NOT NULL,
  `date_expiration` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `id_store` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `discount`, `date_expiration`, `status`, `id_store`, `id_parent`, `createdAt`, `updatedAt`) VALUES
(1, '111jkg', 10, '0000-00-00 00:00:00', 1, 3, 0, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(2, '222mmm', 30, '0000-00-00 00:00:00', 1, 3, 0, '2021-01-11 21:08:21', '2021-01-11 21:08:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventaries`
--

CREATE TABLE `inventaries` (
  `id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `hour_available` time NOT NULL,
  `is_repeat` tinyint(1) NOT NULL DEFAULT 0,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `inventaries`
--

INSERT INTO `inventaries` (`id`, `stock`, `hour_available`, `is_repeat`, `id_product`, `createdAt`, `updatedAt`) VALUES
(1, 30, '19:00:00', 1, 1, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(2, 80, '08:00:00', 0, 2, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(3, 300, '06:00:00', 0, 4, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(4, 10, '22:00:00', 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(5, 0, '00:00:00', 0, 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `id_seller` int(11) NOT NULL,
  `id_buyer` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('Fisico','Flow') COLLATE utf8mb4_spanish_ci NOT NULL,
  `number_order` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `send_address` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `value_of_send` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `id_carrier` int(11) NOT NULL,
  `amount_discount_coupons` decimal(10,2) DEFAULT NULL,
  `flow_order_payment` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `token_flow` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `name_pdf` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `id_seller`, `id_buyer`, `amount`, `payment_method`, `number_order`, `send_address`, `city`, `value_of_send`, `status`, `id_carrier`, `amount_discount_coupons`, `flow_order_payment`, `token_flow`, `name_pdf`, `createdAt`, `updatedAt`) VALUES
(1, 3, 2, '3000.00', 'Fisico', '00001', 'jhkjhkjhjk', 'Caracas', '300.00', 1, 1, '0.00', '', NULL, NULL, '2021-01-11 21:08:47', '2021-01-11 21:08:47'),
(2, 3, 2, '5000.00', 'Fisico', '00002', 'nkjnkjn', 'Valencia', '500.00', 1, 1, '0.00', '', NULL, NULL, '2021-01-11 21:08:47', '2021-01-11 21:08:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_correlatives`
--

CREATE TABLE `payment_correlatives` (
  `id` int(11) NOT NULL,
  `id_seller` int(11) NOT NULL,
  `correlative` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_products`
--

CREATE TABLE `payment_products` (
  `id` int(11) NOT NULL,
  `id_payment` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` text COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `time_for_preparation` int(11) NOT NULL,
  `is_premium` tinyint(1) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `payment_products`
--

INSERT INTO `payment_products` (`id`, `id_payment`, `name`, `description`, `price`, `time_for_preparation`, `is_premium`, `quantity`, `total`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Mantequilla', 'amarillo', '3000.00', 60, 1, 1, '3000.00', '2021-01-11 21:08:47', '2021-01-11 21:08:47'),
(2, 2, 'Natilla', 'cualquiera', '5000.00', 80, 0, 1, '5000.00', '2021-01-11 21:08:47', '2021-01-11 21:08:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` text COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `youtube_link` text COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `time_for_preparation` int(11) NOT NULL,
  `is_premium` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `id_parent` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `youtube_link`, `time_for_preparation`, `is_premium`, `status`, `id_parent`, `createdAt`, `updatedAt`) VALUES
(1, 'matequilla', 'baja en calorias', '3000.00', '', 60, 0, 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(2, 'Natilla', 'queso cabra', '12000.00', '', 30, 1, 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(3, 'mostaza', 'amarillo', '5000.00', '', 80, 0, 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(4, 'Chocofresa', 'anemia', '8000.00', '', 50, 1, 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(6, 'toddy', 'chocolate', '3000.00', '', 60, 1, 1, 1, '2021-01-26 17:22:03', '2021-01-26 17:22:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_days_availables`
--

CREATE TABLE `products_days_availables` (
  `id` int(11) NOT NULL,
  `day` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `products_days_availables`
--

INSERT INTO `products_days_availables` (`id`, `day`, `id_product`, `createdAt`, `updatedAt`) VALUES
(1, 'Lunes', 1, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(2, 'Jueves', 2, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(3, 'Viernes', 2, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(4, 'Miercoles', 1, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(5, 'Martes', 1, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(6, 'Sabado', 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(7, 'Domingo', 4, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(8, 'LUNES', 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03'),
(9, 'MARTES', 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03'),
(10, 'JUEVES', 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `product_categories`
--

INSERT INTO `product_categories` (`id`, `id_category`, `id_product`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(2, 1, 3, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(3, 2, 2, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(4, 2, 4, '2021-01-11 21:08:21', '2021-01-11 21:08:21'),
(5, 1, 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03'),
(6, 2, 6, '2021-01-26 17:22:03', '2021-01-26 17:22:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_galleries`
--

CREATE TABLE `product_galleries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `name_store` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `img_profile` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `secret_key` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `last_name`, `name_store`, `img_profile`, `api_key`, `secret_key`, `email`, `phone`, `address`, `id_user`, `createdAt`, `updatedAt`) VALUES
(1, 'Carlos', 'Martinez', 'traki', '', '', '', 'lll@gmail.com', '565121312', NULL, 1, '2021-01-11 21:07:01', '2021-01-28 00:20:34'),
(2, 'Luis', 'Aguilar', 'traki', '', '58929F9A-770E-4ED0-9134-52E11LCBD727', '9f4a8fbc04a6cb3c5fe1875da3d89ee0e057b74e', 'mmm@gmail.com', '1234567', 'Caracas', 3, '2021-01-11 21:07:01', '2021-01-28 00:23:27'),
(3, 'xxx', 'xxx', 'xxx', '', '58929F9A-770E-4ED0-9134-52E11LCBD727', '9f4a8fbc04a6cb3c5fe1875da3d89ee0e057b74e', 'xxx@gmail.com', 'xxx', NULL, 2, '2021-01-11 21:07:01', '2021-01-28 00:28:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', '2021-01-11 21:07:01', '2021-01-11 21:07:01'),
(2, 'Comprador', '2021-01-11 21:07:01', '2021-01-11 21:07:01'),
(3, 'Vendedor', '2021-01-11 21:07:01', '2021-01-11 21:07:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `rut` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `dv` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `rut`, `dv`, `password`, `id_rol`, `id_parent`, `createdAt`, `updatedAt`) VALUES
(1, '12', '3', '$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda', 1, NULL, '2021-01-11 21:07:01', '2021-01-11 21:07:01'),
(2, '34', '5', '$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda', 2, NULL, '2021-01-11 21:07:01', '2021-01-11 21:07:01'),
(3, '56', '7', '$2b$10$CW4Gn7vVPSiZwn6zAzD6xuwlxUXvmGZyW8FVEdA3yE6XyPyB7dfda', 3, NULL, '2021-01-11 21:07:01', '2021-01-11 21:07:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `address` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` text COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `id_user`, `latitude`, `longitude`, `address`, `description`, `city`, `createdAt`, `updatedAt`) VALUES
(6, 1, '54654654', '-1221215.22', 'valencia', 'cualquieraII', 'new york', '2021-01-28 00:20:34', '2021-01-28 00:20:34'),
(8, 3, '54654654', '-1221215.22', 'en el puente', 'xxxx', 'maracaibo', '2021-01-28 00:26:46', '2021-01-28 00:26:46'),
(9, 2, '54654654', '-1221215.22', 'xxxx', 'xxxx', 'xxx', '2021-01-28 00:28:30', '2021-01-28 00:28:30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carriers`
--
ALTER TABLE `carriers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carrier_addresses`
--
ALTER TABLE `carrier_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_carrier` (`id_carrier`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_store` (`id_store`);

--
-- Indices de la tabla `inventaries`
--
ALTER TABLE `inventaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_seller` (`id_seller`),
  ADD KEY `id_buyer` (`id_buyer`),
  ADD KEY `id_carrier` (`id_carrier`);

--
-- Indices de la tabla `payment_correlatives`
--
ALTER TABLE `payment_correlatives`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_products`
--
ALTER TABLE `payment_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_payment` (`id_payment`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_parent` (`id_parent`);

--
-- Indices de la tabla `products_days_availables`
--
ALTER TABLE `products_days_availables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `product_galleries`
--
ALTER TABLE `product_galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carriers`
--
ALTER TABLE `carriers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carrier_addresses`
--
ALTER TABLE `carrier_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventaries`
--
ALTER TABLE `inventaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `payment_correlatives`
--
ALTER TABLE `payment_correlatives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `payment_products`
--
ALTER TABLE `payment_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products_days_availables`
--
ALTER TABLE `products_days_availables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `product_galleries`
--
ALTER TABLE `product_galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrier_addresses`
--
ALTER TABLE `carrier_addresses`
  ADD CONSTRAINT `carrier_addresses_ibfk_1` FOREIGN KEY (`id_carrier`) REFERENCES `carriers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`id_store`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventaries`
--
ALTER TABLE `inventaries`
  ADD CONSTRAINT `inventaries_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`id_seller`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`id_buyer`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`id_carrier`) REFERENCES `carriers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `payment_products`
--
ALTER TABLE `payment_products`
  ADD CONSTRAINT `payment_products_ibfk_1` FOREIGN KEY (`id_payment`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_parent`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `products_days_availables`
--
ALTER TABLE `products_days_availables`
  ADD CONSTRAINT `products_days_availables_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_categories_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `product_galleries`
--
ALTER TABLE `product_galleries`
  ADD CONSTRAINT `product_galleries_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
