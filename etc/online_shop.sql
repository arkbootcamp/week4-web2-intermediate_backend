-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2020 at 01:52 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Elektronik');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_invoice` int(11) NOT NULL,
  `history_subtotal` int(11) NOT NULL,
  `history_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `history_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_invoice`, `history_subtotal`, `history_created_at`, `history_update_at`) VALUES
(1, 123456, 16500, '2020-08-14 10:38:25', '0000-00-00 00:00:00'),
(2, 54312, 50000, '2020-08-27 04:43:20', '0000-00-00 00:00:00'),
(3, 56765, 123, '2020-08-27 04:54:19', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_qty` int(11) NOT NULL,
  `order_price` int(11) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `history_id`, `product_id`, `order_qty`, `order_price`, `order_created_at`, `order_updated_at`) VALUES
(1, 1, 1, 1, 5500, '2020-08-14 10:35:44', '0000-00-00 00:00:00'),
(2, 1, 2, 1, 11000, '2020-08-14 10:35:44', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_harga` int(15) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `product_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_harga`, `product_image`, `product_created_at`, `product_updated_at`, `product_status`) VALUES
(3, 1, 'Kulkas', 70000, '', '2020-08-12 07:15:13', '0000-00-00 00:00:00', 1),
(4, 1, 'Kipas', 90000, '', '2020-08-12 07:22:04', '0000-00-00 00:00:00', 1),
(5, 1, 'Mouse', 50000, '', '2020-08-12 07:27:52', '0000-00-00 00:00:00', 1),
(6, 1, 'Keyboard', 150000, '', '2020-08-12 07:41:37', '0000-00-00 00:00:00', 1),
(7, 0, 'Kipas', 500, '', '2020-09-01 08:07:08', '2020-09-01 10:45:51', 1),
(8, 0, 'Setrika', 500000, '', '2020-09-01 08:14:17', '0000-00-00 00:00:00', 1),
(9, 0, 'Setrika', 500000, '2020-09-01T08-31-32.395Z-Astronaut.jpeg', '2020-09-01 08:31:32', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_status`, `user_created_at`, `user_updated_at`) VALUES
(1, 'bagustri15@gmail.com', '$2b$10$P3x94vC9ryU9nnZzcmE6D.E5OZWwa/sop/k8ajmGZs6InLlc8SUje', 'Bagus TH', 2, 0, '2020-09-01 04:04:24', '0000-00-00 00:00:00'),
(3, 'bagustri16@gmail.com', '$2b$10$4QABFiB.k3w2bHo42GWQqONqL63jUbXPna0cGzBkVdkpP0l7pA7eq', 'Bagus TH', 2, 0, '2020-09-01 07:33:17', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
