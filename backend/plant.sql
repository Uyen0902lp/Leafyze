-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 05, 2024 lúc 02:55 PM
-- Phiên bản máy phục vụ: 8.0.39
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `plant`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brand`
--

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `logo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `brand`
--

INSERT INTO `brand` (`id`, `name`, `logo`, `slug`) VALUES
(1, 'Fresh Farms', NULL, 'fresh-farms'),
(2, 'Boar’s Head', NULL, 'boar’s-head');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `parentId` int DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `parentId`, `title`, `image`, `slug`, `status`) VALUES
(1, NULL, 'NPK Fertilizers', 'https://i.ibb.co/zNNpN80/npk.png', 'npk-fertilizers', 'active'),
(2, 1, 'General NPK Fertilizers', NULL, 'general-npk-fertilizers', 'active'),
(3, 1, 'Specialty NPK Granules', NULL, 'specialty-npk-granules', 'active'),
(4, NULL, 'Micronutrient Fertilizers', 'https://i.ibb.co/pJ871yb/Micronutrient-Fertilizers.png', 'micronutrient-fertilizers', 'active'),
(5, 4, 'Calcium & Boron', NULL, 'calcium-boron', 'active'),
(6, 4, 'Silicon Fertilizers', NULL, 'silicon-fertilizers', 'active'),
(7, NULL, ' Organic and Bio-Stimulants', 'https://i.ibb.co/tMmxFxz/Organic.png', ' organic-bio-stimulants', 'active'),
(8, 7, 'Bio Stimulants', NULL, 'bio-stimulants', 'active'),
(9, 7, 'Neem Oil Products', NULL, 'neem-oil-products', 'active'),
(10, NULL, 'Fungicides', 'https://i.ibb.co/mbSQBZM/Fungicides.png', 'fungicides', 'active'),
(11, NULL, 'Soil Conditioners and Root Enhancers', 'https://i.ibb.co/nbYRpR3/Conditioners.png', 'soil-conditioners-root-enhancers', 'active'),
(12, 11, 'Soil Conditioners', NULL, 'soil-conditioners', 'active'),
(13, 11, 'Root Strengtheners', NULL, 'root-strengtheners', 'active'),
(14, NULL, 'Insecticides and Mite Control', 'https://i.ibb.co/Q64djvj/Insecticides.png', 'insecticides-mite-control', 'active'),
(18, 4, 'Multi Micronutrients', NULL, 'multi-micronutrients', 'active'),
(19, 7, 'Immunity Boosters', NULL, 'immunity-boosters', 'active'),
(20, 10, 'Broad Spectrum Fungicides', NULL, 'broad-spectrum-fungicides', 'active'),
(21, 10, 'Targeted Fungicides', NULL, 'targeted-fungicides', 'active'),
(22, 14, 'General Insecticides', NULL, 'general-insecticides', 'active'),
(23, 14, 'Mite and Pest Control', NULL, 'mite-pest-control', 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coupon_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `discount_percentage` int DEFAULT NULL,
  `minimum_amount` decimal(10,2) DEFAULT NULL,
  `product_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons`
--

INSERT INTO `coupons` (`id`, `title`, `logo`, `coupon_code`, `end_time`, `discount_percentage`, `minimum_amount`, `product_type`) VALUES
(1, 'November Gift Voucher', 'https://i.ibb.co/bX70JvS/444.png', 'NOVEMBER24', '2024-12-31 06:00:00', 14, 700.00, 'npk'),
(2, 'SUMMER Vacation', 'https://i.ibb.co/4tgpHcd/222.png', 'SUMMER23', '2025-01-22 00:56:00', 8, 400.00, 'sale'),
(3, 'Paper On Demand', 'https://i.ibb.co/h9PYFHJ/lip-liner-2.png', 'PAPER12', '2025-02-01 20:19:00', 14, 500.00, 'beauty'),
(4, 'Fifty Fifty', 'https://i.ibb.co/rvmPWxc/bracelet-5.png', 'FIF50', '2024-12-01 20:19:00', 10, 300.00, 'jewelry');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diseases`
--

CREATE TABLE `diseases` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `pathogen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `symptoms` text NOT NULL,
  `conditions` text NOT NULL,
  `prevention` text NOT NULL,
  `is_healthy` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `diseases`
--

INSERT INTO `diseases` (`id`, `name`, `pathogen`, `symptoms`, `conditions`, `prevention`, `is_healthy`) VALUES
(1, 'Early Blight', '🍄 Alternaria tomatophila: A fungus that causes brown leaf spots on tomatoes, leading to wilting and reduced yield.\r\n\r\n👾 Alternaria solani: A fungus responsible for early blight, creating concentric circular spots on tomato leaves, resulting in leaf drop and decreased production.', '🌿 Leaf Spots: The disease typically first appears on older leaves with irregular, dark brown spots showing signs of necrosis. These spots gradually develop into concentric black rings, resembling a target, with the surrounding leaf tissue turning yellow.\r\n\r\n🍂 Leaf Yellowing and Shedding: When numerous spots are present on a leaf, the entire leaf turns yellow and may fall off. Under favorable conditions for the disease, the plant may experience complete defoliation.\r\n\r\n🌱 Stem and Petiole Lesions: Dark brown, elongated, sunken lesions appear on the stem and petioles. If the lesions develop near the soil surface, they may form a \"girdle\" around the stem, hindering the plant\'s growth.', '🔬 Bacterial Survival: The bacteria Alternaria tomatophila and A. solani can survive from one season to the next in plant debris left in the soil.\r\n\r\n🌱 Other Sources of Infection: Wild tomatoes, potatoes, and other plants of the nightshade family can also serve as sources of infection.\r\n\r\n🌦️ Disease Development Conditions: The disease thrives in warm (24-29°C) and humid weather. It primarily spreads through wind and rain, as fungal spores are easily dispersed in the air. Prolonged warm and moist conditions promote vigorous disease development. It can also flare up in dry, hot climates, especially when plants suffer from frequent water stress or when overhead irrigation is used.', '💦 Preventive Spraying: Combining preventive spraying with an early warning system is the most effective way to control and prevent disease spread.\r\n\r\n🧹 Field Sanitation: Implementing sanitation measures such as crop rotation, tillage, and removal of all crop residues from the previous season helps reduce the risk of disease development.', 0),
(2, 'Late Blight', '👾 Phytophthora infestans: A fungus that causes late blight in tomatoes, thriving in wet conditions, leading to leaf rot and reduced yield.', '🍃 Initial Symptoms: Infected leaves show drooping petioles.\r\n\r\n🌱 Lesions on Leaves and Stems: Large, irregular, water-soaked lesions appear on leaves and stems, initially pale green. These lesions gradually expand, turn brown, and develop a parchment-like appearance.\r\n\r\n💧 In Humid Conditions: Under humid weather, the fungus proliferates rapidly, producing spores on the underside of leaves.\r\n\r\n☁️ Rapid Spread in Moist Conditions: Leaves can develop widespread blight rapidly in warm, moist conditions.\r\n\r\n🌾 Crop Damage: If the disease progresses severely, the entire field can suffer heavy damage, with significant leaf and stem injury.', '🍄 Fungal Survival: The late blight fungus can survive from season to season on wild-growing tomatoes and potatoes, in compost piles, or on other nightshade plants.\r\n\r\n🌬️ Sources of Spread: The fungus produces spores that can be carried long distances by strong winds or storms, facilitating rapid disease spread in the environment.\r\n\r\n🌧️ Favorable Weather Conditions: The disease thrives in cool, wet weather, promoting rapid spread and damage. Under these conditions, the fungus can devastate an entire tomato field in just a few days.\r\n\r\n🏡 Enclosed Environments: Crops grown in greenhouses or tunnels are also susceptible to late blight if humidity is not properly controlled.\r\n\r\n💦 High Humidity: The disease progresses rapidly in high humidity. The late blight fungus requires high moisture levels to infect and can spread quickly in wet environments.', '💧 Preventive Spraying: Combining preventive spraying with a late blight forecasting system is the most effective way to control and prevent the disease.\r\n\r\n🌾 Field Management: Avoid planting tomatoes in fields or near areas previously planted with potatoes, as the late blight fungus also affects potatoes. In greenhouses or covered growing areas, maintaining low humidity helps reduce the risk of infection.', 0),
(3, 'Septoria Leaf Spot', '🍂 Septoria lycopersici: A fungus that causes leaf spot disease in tomatoes, producing small brown spots on older leaves, leading to yellowing and leaf drop, ultimately affecting plant health and yield.\r\n', '🌱 Initial Spots: Small, dark, water-soaked spots initially appear on older leaves.\r\n\r\n🌿 Spot Development: The spots gradually enlarge, forming circular lesions about 5 mm in diameter. These spots have dark brown or black borders, a gray center, and contain numerous small black specks.\r\n\r\n🍃 Lesions on Stems and Petioles: On stems and petioles, the lesions are elongated and also exhibit small black specks in the center.\r\n\r\n🍂 Severe Infection: In severe cases, the spots merge together, causing the leaves to collapse and eventually fall off.', '🍄 Fungal Survival: The fungus that causes Septoria leaf spot can survive on plant debris from previous seasons and on certain weeds, such as nettle, jimsonweed, nightshade, and ground cherry.\r\n\r\n💧 High Humidity and Optimal Temperature: The disease thrives under prolonged high humidity (up to 100%) and temperatures ranging from 20-25°C. Under these conditions, the fungus produces spores that can easily spread in a moist environment.\r\n\r\n🌧️ Modes of Spread: Fungal spores can be dispersed by rain, overhead irrigation, or through contact with workers\' clothing, tools, and insects.', '💧 Preventive Spraying: Regularly apply fungicide combined with consistent field sanitation to minimize the risk of infection.\r\n\r\n🧹 Field Cleanup: Remove plant debris from previous seasons or till the soil to reduce disease inoculum. Practice crop rotation with non-solanaceous plants for at least three years to mitigate the impact of Septoria leaf spot.', 0),
(4, 'Bacterial Spot', '🦠 Xanthomonas euvesicatoria: A bacterium that causes leaf spot in tomatoes, resulting in black spots on leaves, leading to defoliation and reduced yield.\r\n\r\n💦 Xanthomonas vesicatoria: A bacterium that creates water-soaked spots on leaves and fruit, affecting plant health and fruit quality.\r\n\r\n🌿 Xanthomonas perforans: A bacterial strain primarily affecting tomato leaves, causing yellowing and the appearance of brown spots.\r\n\r\n🌡️ Xanthomonas gardneri: A bacterium that causes leaf spot, leading to yellowing and wilting of leaves, which impacts the plant\'s photosynthetic ability.', '🍃 On Leaves: Small, dark, water-soaked spots appear, typically less than 3 mm in diameter. These spots may be angular, turning gray with a somewhat translucent center and a black border. The center of the spot is often dry, cracked, and surrounded by a yellow halo. Under high humidity conditions (heavy rain, fog, or dew), the leaves may turn yellow and fall off.\r\n\r\n🌱 Development Location: The disease can occur on all above-ground parts of the plant. Lesions are usually more prevalent on young leaves where the canopy is developing.', '🦠 Bacterial Survival: The bacteria can survive long-term in plant debris, wild hosts, and seeds, increasing the risk of infecting new crops.\r\n\r\n💦 Irrigation Method: Overhead irrigation (directly spraying water from above) can facilitate the rapid spread of bacteria, particularly during plant care.\r\n\r\n🌾 Infection Pathways: In the field, the disease often enters through wounds on plants, such as those caused by insect feeding, strong winds, heavy rain, or high-pressure irrigation.\r\n\r\n🌡️ Temperature and Humidity Conditions: Warm temperatures (24-30°C) combined with heavy rain or overhead irrigation create ideal conditions for vigorous bacterial growth.', '🌱 Select Disease-Free Seeds: Sow seeds that have been tested and certified free of pathogenic bacteria. Ensure seedlings are free of disease before transplanting.\r\n\r\n🧴 Use Plant Protection Chemicals: Apply copper-based sprays to protect plants, although their effectiveness may diminish over time as bacteria develop resistance.\r\n\r\n🚫 Avoid Overhead Irrigation: Avoid overhead watering to prevent the spread of bacteria through water.\r\n\r\n🔄 Crop Rotation: Rotate with non-solanaceous crops or non-host plants to reduce the risk of bacteria persisting in the soil.\r\n\r\n🧹 Field Sanitation: Clean up and till all plant debris immediately after harvest to reduce the risk of outbreaks in future crops.\r\n\r\n🍅 Choose Disease-Resistant Varieties: Where possible, select tomato varieties resistant to the specific bacterial strains prevalent in the area to improve disease prevention.', 0),
(5, 'Tomato Yellow Leaf Curl Virus', '🦠 Geminivirus (Begomovirus): A group of viruses that cause yellow leaf curl disease in tomatoes, leading to stunted growth and reduced yield, spread by whiteflies.\r\n\r\n🐞 Transmission Vector: Whiteflies (Bemisia tabaci and Bemisia argentifolii), commonly known as sweet potato whiteflies, are the primary insects responsible for spreading the virus through their feeding.', '🌱 On Young Plants: When plants are young, they often develop poorly, with short stems, small leaves, and stunted growth.\r\n\r\n🍃 Curling and Yellowing Leaves: Leaves become small, curled, yellowed, rolled upward, and may become scorched.\r\n\r\n🍅 Lack of Fruit Set: Severely infected plants may not bear fruit. If they do, the fruits do not fully develop, resulting in significantly reduced yield.', '🪴 Susceptible Plants: The virus causing yellow leaf curl affects not only tomatoes but can also spread to other crops such as beans, corn, and various other plants.\r\n\r\n⏱️ Rapid Transmission: Whiteflies only need to feed on an infected plant for about 15-30 minutes to transmit the virus to healthy plants.\r\n\r\n🌞 Favorable Conditions: The disease easily spreads in warm, humid weather, which promotes whitefly population growth and virus transmission.', '🪟 Whitefly Control: Chemical insecticides are often ineffective against whiteflies, so using insect-proof netting is recommended to prevent whitefly contact with plants.\r\n\r\n🧹 Field Sanitation: Remove infected plant debris and weeds, and implement regular sanitation measures to reduce the risk of new disease spread.\r\n\r\n🔄 Crop Rotation: Intercrop with non-solanaceous plants to limit the spread of the virus in tomato growing areas.', 0),
(6, 'Target Spot', '🌑 Corynespora cassiicola: A fungus that causes target spot on leaves, producing round brown spots and leading to early leaf drop, which impacts crop yield.', '🍃 On Leaves: The disease begins with tiny spots on the leaves that quickly develop into larger, light brown spots, often surrounded by a pale yellow halo. These spots can sometimes expand, causing the infected leaf tissue to die.\r\n\r\n🌿 On Stems: Initial symptoms are small lesions that quickly expand and elongate, potentially girdling the stem, causing the leaves above the lesion to wilt. In severe cases, multiple lesions form on stems and leaves, leading to wilting and ultimately plant death.', '🌡️ Optimal Temperature Range: The fungus causing leaf spot can survive in a wide temperature range. The disease spreads readily when temperatures range from 16-32°C, especially under prolonged high humidity (>16 hours).\r\n\r\n💨 Modes of Spread: Fungal spores develop extensively on infected tissues and can easily spread through the air or irrigation activities.', '💧 Preventive Spraying: Begin applying fungicides as soon as symptoms are detected to minimize damage caused by leaf spot disease.', 0),
(7, 'Tomato Mosaic Virus', '🦠 Tobamovirus: A group of viruses that cause mosaic disease, resulting in mottled and discolored leaves, leading to stunted growth and reduced yield.', '🍃 On Leaves: Leaves develop mottled discoloration, with yellow spots, deformation, and curling. Leaf size becomes uneven, and they may wilt or become necrotic.\r\n\r\n🌱 Plant Growth: The plant shows stunted growth, reduced vigor, curled leaves, and brittleness. In cool weather, young leaves may twist. Under hot and humid conditions, leaf symptoms may be less noticeable, but the yield is significantly reduced.', '🔍 Sources of Infection: The virus can spread from contaminated farming tools, weeds, and infected plants. Seeds from infected plants are also a source of transmission.\r\n\r\n🛠️ Transmission Methods: The virus can persist in the environment, on tools, and insects. It can spread through the hands of caretakers, clothing, or farming tools if not properly sanitized.', '🧬 Use Disease-Resistant Varieties: Choosing resistant varieties is the most effective prevention method, although some new Tobamovirus strains may overcome resistance.\r\n\r\n🪣 Field Sanitation: Implement sanitation measures such as washing hands and tools with alcohol-based disinfectants (e.g., 1% alcohol) to eliminate the virus.\r\n\r\n🧰 Tool Sanitation: Gardening tools should be thoroughly cleaned and disinfected. Plastic containers and planting trays can be effectively cleaned and disinfected with bleach. Avoid reusing soil that has been contaminated.', 0),
(8, 'Leaf Mold', '🍂 Passalora fulva (also known as Fulvia fulva or Cladosporium fulvum): A fungus that causes leaf mold in tomatoes, producing yellow spots and an olive-green mold on the underside of leaves, leading to leaf wilting.\r\n', '🍃 On Leaves: The disease typically affects the leaves, and occasionally the stems, flowers, and fruits. Early symptoms include pale green to yellow patches on the upper surface of older leaves, with olive-green fungal spores developing on the underside.\r\n\r\n🍂 Leaf Drop: As the disease progresses, lower leaves begin to yellow and fall off. Affected fruits may develop a black, tough, leathery layer on the blossom end.\r\n\r\n🏠 Occurrence Environment: The disease can occur in open fields but is more prevalent in greenhouses, where it spreads rapidly under favorable conditions.', '🌱 Fungal Survival: The fungus can persist as spores and sclerotia in soil and plant debris for at least one year.\r\n\r\n🌡️ Conditions for Spread: The fungus can spread through clothing, gardening tools, and easily disseminates when relative humidity reaches 90% and the optimal temperature is 24°C. The disease can also develop at temperatures between 10 and 32°C, but will not progress if humidity drops below 85%.', '💨 Preventive Spraying: In greenhouses, ensure proper ventilation and heating to keep humidity below 85%. Plant disease-resistant varieties if available, although it is challenging to select a variety resistant to all Passalora fulva strains in a given area.', 0),
(9, 'Two-Spotted Spider Mites', '🕷️ Tetranychus urticae: The two-spotted spider mite, a pest that affects many crops, causing leaf discoloration, small yellow spots, and potentially leading to leaf desiccation.', '🍃 On Leaves: Small, pale yellow or white spots appear on the underside of leaves where the spider mites feed. As the mite population increases, the leaves gradually turn yellow or brown, become dry, and may fall prematurely. Additionally, a thin webbing may appear on the underside of leaves, providing protection for the mites and making them easier to spot.\r\n\r\n🌱 On Plants: Spider mites cause stunted growth and slow development as the plant loses vital fluids and nutrients. In severe infestations, the plant weakens significantly, reducing both yield and fruit quality.', '🌡️ Temperature and Humidity: Spider mites thrive in high temperatures (25-30°C) and low humidity. Hot, dry weather accelerates their reproduction, with rapid growth cycles allowing each generation to complete in approximately 5-10 days.\r\n\r\n🍃 Spread: Spider mites easily spread through wind, caretakers, and gardening tools. They can also move from plant to plant, especially when the population density on a single plant becomes too high.', '🐞 Biological Control: Using natural predators of spider mites, such as predatory mites like Phytoseiulus persimilis or Amblyseius californicus, can help control spider mite populations naturally.\r\n\r\n💧 Watering: Increasing humidity around plants by misting them or maintaining moisture in their surroundings can reduce spider mite growth, as they do not thrive in humid environments.\r\n\r\n🧴 Horticultural Oil or Soap Sprays: Using horticultural oils or insecticidal soaps can effectively eliminate spider mites by damaging their protective wax layer, causing them to dry out and die.\r\n\r\n🕸️ Miticide Sprays: In cases of high mite populations where biological control is ineffective, specialized miticides can be used. However, rotating different miticides is necessary to prevent the development of resistance.', 0),
(10, 'Powdery Mildew', '🌿 Leveillula taurica (asexual stage: Oidium sicula): A fungus that causes powdery mildew on various plants, forming a white powdery layer on the underside of leaves, leading to yellowing and wilting.\r\n\r\n🍅 Oidium neolycopersici: Causes powdery mildew on tomatoes, appearing as small white spots on the upper side of leaves, resulting in drying and premature leaf drop.\r\n\r\n☁️ Oidium lycopersici: Also causes powdery mildew on tomatoes, covering leaves with a white powdery coating, which affects photosynthesis and overall plant health.', '🌱 Leveillula taurica: Initial symptoms include pale green to bright yellow spots appearing on the leaf surface. Subsequently, a white fungal powder begins to develop on the leaf surface. Under ideal conditions, white spore masses can form on both sides of the leaf. As the disease progresses, leaves turn brown, wilt, and may die. Infected plants often produce small fruits and are more susceptible to sunburn.\r\n\r\n🍂 Oidium neolycopersici and O. lycopersici: The disease appears as round, white spots on the upper surface of leaves. These powdery spots gradually enlarge, causing the underlying leaf tissue to turn brown and dry out. Oidium typically develops on the upper leaf surface, while Leveillula appears on the underside of leaves. In severe infections, fungal spores may cover the entire surface of leaves, petioles, and flower calyxes, but the fruit is generally not affected.', '🍃 Leveillula taurica: This fungus can persist on many host plants and may spread to tomatoes. Its spores are easily dispersed by wind and can germinate under relatively low humidity conditions (52-75%). The fungus thrives at high temperatures above 27°C and can grow within a range of 10 to 32°C.\r\n\r\n🌧️ Oidium neolycopersici and O. lycopersici: These fungi grow best under low light conditions, temperatures ranging from 20-27°C, and high humidity (85-95%). However, with Leveillula taurica, the disease can still develop under low humidity conditions (around 50%).', '💧 Preventive Spraying: Use fungicides, particularly those containing sulfur. Ensure thorough coverage and apply at the right time for maximum effectiveness.\r\n\r\n🧂 Other Measures: Bicarbonate (baking soda) or hydroxide (slaked lime) can also be used to control powdery mildew.', 0),
(11, 'Healthy', '', '', '', '', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `disease_products`
--

CREATE TABLE `disease_products` (
  `id` int NOT NULL,
  `disease_id` int NOT NULL,
  `product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `disease_products`
--

INSERT INTO `disease_products` (`id`, `disease_id`, `product_id`) VALUES
(1, 1, 1),
(2, 1, 4),
(3, 1, 5),
(4, 1, 7),
(5, 1, 6),
(6, 2, 1),
(7, 2, 4),
(8, 2, 5),
(9, 2, 7),
(10, 2, 9),
(11, 3, 4),
(12, 3, 5),
(13, 3, 7),
(14, 3, 10),
(15, 3, 11),
(16, 4, 4),
(17, 4, 6),
(18, 4, 7),
(19, 4, 9),
(20, 4, 26),
(21, 5, 26),
(22, 5, 27),
(23, 5, 28),
(24, 5, 14),
(25, 6, 27),
(26, 6, 28),
(27, 6, 26),
(28, 6, 14),
(29, 7, 1),
(30, 7, 4),
(31, 7, 7),
(32, 7, 10),
(33, 7, 17),
(34, 8, 27),
(35, 8, 28),
(36, 8, 19),
(37, 8, 20),
(38, 9, 1),
(39, 9, 5),
(40, 9, 7),
(41, 9, 11),
(42, 9, 22),
(43, 10, 1),
(44, 10, 3),
(45, 10, 5),
(46, 10, 8),
(47, 10, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `orderID` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_intent_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `products` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_general_ci,
  `city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_note` text COLLATE utf8mb4_general_ci,
  `shipCost` decimal(10,2) NOT NULL DEFAULT '20.00',
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pending','processing','shipped','delivered','canceled') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `orderID`, `amount`, `payment_intent_id`, `products`, `created_at`, `updated_at`, `username`, `company`, `state`, `country`, `address`, `city`, `zip_code`, `phone`, `email`, `order_note`, `shipCost`, `user_id`, `status`) VALUES
(1, 'C5EFDCBF364B1C', 532.40, 'COD', '[{\"id\": 1, \"img\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": 49, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"orderQuantity\": 1, \"quantityAvailable\": 50}, {\"id\": 2, \"img\": \"https://i.ibb.co/jDSTfR5/Copper-Soap-32oz.png\", \"price\": 60, \"title\": \"Copper Soap Fungicide (Ready-to-Use Spray)\", \"orderQuantity\": 1, \"quantityAvailable\": 40}, {\"id\": 5, \"img\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": 213.4, \"title\": \"Score 250EC\", \"orderQuantity\": 1, \"quantityAvailable\": 42}, {\"id\": 4, \"img\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": 190, \"title\": \"Kasumin 2L\", \"orderQuantity\": 1, \"quantityAvailable\": 35}]', '2023-11-19 10:10:52', '2023-11-19 10:10:52', 'Test Ahihi', NULL, 'Viet Nam', 'usa', 'Abeel Avenue, Greenwich', 'New York', '10000', '0239884534', 'testtest@gmail.com', 'Please deliver after 6 PM. Please deliver after 6 PM.  Please deliver after 6 PM.  Please deliver after 6 PM.  ', 20.00, '9', 'canceled'),
(2, '2545710A009FDB', 112.00, 'COD', '[{\"id\": 6, \"img\": \"https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png\", \"price\": 50, \"title\": \"Confidor 100SL\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 50}, {\"id\": 8, \"img\": \"https://i.ibb.co/8dcwddx/Ortiva-600-SC.png\", \"price\": 20, \"title\": \"Ortiva 600SC\", \"orderQuantity\": 1, \"quantityAvailable\": 28}, {\"id\": 11, \"img\": \"https://i.ibb.co/7RDV6nQ/Yara-Liva-NITRABOR.png\", \"price\": 22, \"title\": \"YaraLiva NITRABOR\", \"orderQuantity\": 1, \"quantityAvailable\": 9}]', '2024-11-19 10:12:02', '2024-11-19 10:12:02', 'Test Testing', NULL, 'Viet Nam', 'usa', 'Test Test Test', 'New York', '10000', '0239884534', 'test@gmail.com', 'Please deliver as soon as possible, please.', 20.00, '9', 'delivered'),
(3, 'B9352802F7C103', 90.00, 'COD', '[{\"id\": 22, \"img\": \"https://i.ibb.co/QDp5wfp/Silica-Power-small.png\", \"price\": 10, \"title\": \"SilicaPower (Small)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 23, \"img\": \"https://i.ibb.co/4jDDZPR/CSV-Agrolife-NPK-13-30-18-TE.png\", \"price\": 30, \"title\": \"Unikey Round-Granular NPK 13-30-18 + TE\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 25, \"img\": \"https://i.ibb.co/BVmz2Sy/NPK-17-17-17-Baconco.png\", \"price\": 25, \"title\": \"NPK 17-17-17\", \"orderQuantity\": 1, \"quantityAvailable\": 20}]', '2024-11-19 10:16:24', '2024-11-19 10:16:24', 'user1 User', 'QQQ', 'USA', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '018634875', 'user1@gmail.com', 'Please deliver before 3 PM.', 25.00, '11', 'canceled'),
(4, 'F4EA00682380A2', 225.00, 'COD', '[{\"id\": 6, \"img\": \"https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png\", \"price\": 50, \"title\": \"Confidor 100SL\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 50}, {\"id\": 7, \"img\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": 80, \"title\": \"Daconil 500SC\", \"orderQuantity\": 1, \"quantityAvailable\": 28}, {\"id\": 19, \"img\": \"https://i.ibb.co/3ffS33v/kalisilic.png\", \"price\": 15, \"title\": \"Ka-Silic (Box)\", \"orderQuantity\": 1, \"quantityAvailable\": 50}, {\"id\": 20, \"img\": \"https://i.ibb.co/ZWHVMxV/Ka-Silic.png\", \"price\": 20, \"title\": \"Ka-Silic (Packet)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 18, \"img\": \"https://i.ibb.co/jL5dtcj/kalisi.png\", \"price\": 10, \"title\": \"Potassium Sulphate (Ka-Silic)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 35}, {\"id\": 17, \"img\": \"https://i.ibb.co/rkDhP4B/Siltron-Cal-Mag.png\", \"price\": 30, \"title\": \"Siltron Cal Mag\", \"orderQuantity\": 1, \"quantityAvailable\": 20}]', '2024-11-19 10:17:45', '2024-11-19 17:04:09', 'user1 User', 'QQQ', 'USA', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '018634875', 'user1@gmail.com', NULL, 20.00, '11', 'shipped'),
(5, '9F666C104E819F', 313.00, 'COD', '[{\"id\": 18, \"img\": \"https://i.ibb.co/jL5dtcj/kalisi.png\", \"price\": 10, \"title\": \"Potassium Sulphate (Ka-Silic)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 35}, {\"id\": 21, \"img\": \"https://i.ibb.co/bQGdnnh/Silica-Power-big.png\", \"price\": 30, \"title\": \"SilicaPower (Large)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 24, \"img\": \"https://i.ibb.co/pJ03jVK/npk.png\", \"price\": 25, \"title\": \"NPK 15-5-25 + TE\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 25, \"img\": \"https://i.ibb.co/BVmz2Sy/NPK-17-17-17-Baconco.png\", \"price\": 25, \"title\": \"NPK 17-17-17\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 26, \"img\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": 29, \"title\": \" YaraMila UNIK 16\", \"orderQuantity\": 1, \"quantityAvailable\": 100}, {\"id\": 27, \"img\": \"https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png\", \"price\": 29, \"title\": \"Neem Bliss Pure Neem Oil (16 oz)\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 28, \"img\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": 29, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 29, \"img\": \"https://i.ibb.co/5RsbzfT/AT-Vaccino-CAN.png\", \"price\": 29, \"title\": \"AT Vaccino CAN\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 30, \"img\": \"https://i.ibb.co/K5L9mZ8/Reasgant-3-6-EC.png\", \"price\": 29, \"title\": \"Reasgant 3.6EC\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 31, \"img\": \"https://i.ibb.co/7bPsHvp/BIO-CSV.png\", \"price\": 29, \"title\": \"BIO CSV\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 32, \"img\": \"https://i.ibb.co/py72S7t/biohumic.png\", \"price\": 29, \"title\": \"BioHumic NP CSV\", \"orderQuantity\": 1, \"quantityAvailable\": 10}]', '2024-11-19 10:18:21', '2024-11-19 10:18:21', 'user1 User', 'QQQ', 'USA', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '018634875', 'user1@gmail.com', NULL, 20.00, '11', 'pending'),
(7, '98173CF2C2244B', 510.00, 'COD', '[{\"id\": 1, \"img\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": 49, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"orderQuantity\": 10, \"quantityAvailable\": 50}]', '2024-11-19 12:03:30', '2024-11-19 12:03:30', 'user1 User', 'QQQ', 'USA', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '018634875', 'user1@gmail.com', NULL, 20.00, '11', 'pending'),
(8, 'TCK6KP2VTU2IM3', 313.00, 'COD', '[{\"id\": 18, \"img\": \"https://i.ibb.co/jL5dtcj/kalisi.png\", \"price\": 10, \"title\": \"Potassium Sulphate (Ka-Silic)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 35}, {\"id\": 21, \"img\": \"https://i.ibb.co/bQGdnnh/Silica-Power-big.png\", \"price\": 30, \"title\": \"SilicaPower (Large)\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 24, \"img\": \"https://i.ibb.co/pJ03jVK/npk.png\", \"price\": 25, \"title\": \"NPK 15-5-25 + TE\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 25, \"img\": \"https://i.ibb.co/BVmz2Sy/NPK-17-17-17-Baconco.png\", \"price\": 25, \"title\": \"NPK 17-17-17\", \"orderQuantity\": 1, \"quantityAvailable\": 20}, {\"id\": 26, \"img\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": 29, \"title\": \" YaraMila UNIK 16\", \"orderQuantity\": 1, \"quantityAvailable\": 100}, {\"id\": 27, \"img\": \"https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png\", \"price\": 29, \"title\": \"Neem Bliss Pure Neem Oil (16 oz)\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 28, \"img\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": 29, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 29, \"img\": \"https://i.ibb.co/5RsbzfT/AT-Vaccino-CAN.png\", \"price\": 29, \"title\": \"AT Vaccino CAN\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 30, \"img\": \"https://i.ibb.co/K5L9mZ8/Reasgant-3-6-EC.png\", \"price\": 29, \"title\": \"Reasgant 3.6EC\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 31, \"img\": \"https://i.ibb.co/7bPsHvp/BIO-CSV.png\", \"price\": 29, \"title\": \"BIO CSV\", \"orderQuantity\": 1, \"quantityAvailable\": 10}, {\"id\": 32, \"img\": \"https://i.ibb.co/py72S7t/biohumic.png\", \"price\": 29, \"title\": \"BioHumic NP CSV\", \"orderQuantity\": 1, \"quantityAvailable\": 10}]', '2024-11-19 10:18:21', '2024-11-19 16:14:38', 'Linda', 'SJC', 'Washington', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '018634875', 'linda@gmail.com', 'Hello there, I hope to receive my ordered products soon.', 20.00, '14', 'processing'),
(9, '0D314BD85A0871', 2977.00, 'COD', '[{\"id\": 54, \"img\": \"https://i.ibb.co/zNNpN80/npk.png\", \"price\": 678, \"title\": \"test5\", \"orderQuantity\": 4, \"quantityAvailable\": 33}, {\"id\": 1, \"img\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": 49, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"orderQuantity\": 5, \"quantityAvailable\": 50}]', '2024-11-21 10:32:49', '2024-11-21 10:32:49', 'Admin A', NULL, 'VN', 'south-africa', '1194 Lang', 'Ha Noi', '10011', '0988021535', 'admin@gmail.com', NULL, 20.00, '8', 'delivered'),
(12, '9F83CC3539B582', 4761.00, 'COD', '[{\"id\": 1, \"img\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": 49, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"orderQuantity\": 2, \"quantityAvailable\": 50}, {\"id\": 2, \"img\": \"https://i.ibb.co/jDSTfR5/Copper-Soap-32oz.png\", \"price\": 60, \"title\": \"Copper Soap Fungicide (Ready-to-Use Spray)\", \"orderQuantity\": 3, \"quantityAvailable\": 40}, {\"id\": 3, \"img\": \"https://i.ibb.co/Sy4fCnj/Ridomil-Gold-68-WG.png\", \"price\": 9, \"title\": \"Ridomil Gold 68 WG\\r\\n\", \"orderQuantity\": 1, \"quantityAvailable\": 30}, {\"id\": 4, \"img\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": 190, \"title\": \"Kasumin 2L\", \"orderQuantity\": 1, \"quantityAvailable\": 35}, {\"id\": 54, \"img\": \"https://i.ibb.co/zNNpN80/npk.png\", \"price\": 678, \"title\": \"test5\", \"orderQuantity\": 6, \"quantityAvailable\": 33}, {\"id\": 38, \"img\": \"https://i.ibb.co/SVWTsms/Potassium-Sulphate.png\", \"price\": 49, \"title\": \"Potassium Sulphate Soluble\", \"orderQuantity\": 4, \"quantityAvailable\": 1000}]', '2024-11-22 08:41:06', '2024-11-22 08:41:06', 'user1 User1', 'QQQ', 'USA', 'usa', 'Abeel Avenue, Greenwich', 'Washington', '23442', '0396777532', 'user1@gmail.com', 'This is a test.', 20.00, '11', 'pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `prediction_history`
--

CREATE TABLE `prediction_history` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `disease_id` int NOT NULL,
  `accuracy` float NOT NULL,
  `predicted_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) NOT NULL,
  `suggested_products` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `prediction_history`
--

INSERT INTO `prediction_history` (`id`, `user_id`, `disease_id`, `accuracy`, `predicted_time`, `image_url`, `suggested_products`) VALUES
(1, 8, 4, 0.99883, '2024-11-30 13:49:33', 'http://localhost:5000/uploads/28987f02-b2dd-48c3-89d5-35e8b4b2d242.jpg', '[{\"id\": 9, \"sku\": \"BA1513\", \"slug\": \"zorvec-encantia-330se\\r\\n\", \"image\": \"https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png\", \"price\": \"15.00\", \"stock\": 15, \"title\": \"Zorvec Encantia 330SE\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌾 Long-lasting Disease Prevention\\r\\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\\r\\n\\r\\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.\", \"final_price\": \"15.00\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}, {\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}]'),
(2, 8, 1, 0.982846, '2024-11-30 13:49:50', 'http://localhost:5000/uploads/e3ca925a-526d-4165-ad96-0baec88bd1ab.jpg', '[{\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 5, \"sku\": \"DA1220\", \"slug\": \"score-250ec\\r\\n\", \"image\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": \"220.00\", \"stock\": 42, \"title\": \"Score 250EC\", \"brand_id\": 1, \"discount\": \"3.00\", \"category_id\": 20, \"description\": \"🌱 Broad-spectrum Fungicide\\r\\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\\r\\n\\r\\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\\r\\n\\r\\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.\", \"final_price\": \"213.40\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}]'),
(3, 8, 11, 0.999947, '2024-11-30 13:49:57', 'http://localhost:5000/uploads/d417842a-e8ea-4eb2-bfaf-511b837120b5.jpg', '[]'),
(4, 8, 2, 0.999888, '2024-11-30 13:50:06', 'http://localhost:5000/uploads/3f4fbd12-1fea-4fa8-9a1c-f7247207d378.jpg', '[{\"id\": 5, \"sku\": \"DA1220\", \"slug\": \"score-250ec\\r\\n\", \"image\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": \"220.00\", \"stock\": 42, \"title\": \"Score 250EC\", \"brand_id\": 1, \"discount\": \"3.00\", \"category_id\": 20, \"description\": \"🌱 Broad-spectrum Fungicide\\r\\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\\r\\n\\r\\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\\r\\n\\r\\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.\", \"final_price\": \"213.40\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}]'),
(5, 8, 8, 0.999069, '2024-11-30 13:50:14', 'http://localhost:5000/uploads/00d15d87-ff3e-4ebf-b281-739bbd15c284.jpg', '[{\"id\": 27, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-16oz\", \"image\": \"https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (16 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 Neem Bliss Pure Neem Oil is an organic solution that effectively combats a range of pests while promoting plant health.\\r\\n\\r\\n🔍 Uses: Helps manage pests such as spider mites, aphids, and whiteflies, while preventing diseases like powdery mildew and bacterial spot.\\r\\n\\r\\n🧴 Application: Dilute in water for foliar application or apply as a soil drench. Best used during active growth stages to ensure maximum protection and nutrient absorption.\", \"final_price\": \"29.00\"}, {\"id\": 20, \"sku\": \"EF1219\", \"slug\": \"ka-silic-packet\\r\\n\", \"image\": \"https://i.ibb.co/ZWHVMxV/Ka-Silic.png\", \"price\": \"20.00\", \"stock\": 20, \"title\": \"Ka-Silic (Packet)\\r\\n\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🌿 Silicon-Potassium Blend for Enhanced Growth\\r\\nThis silicon-enriched potassium fertilizer improves nutrient absorption and cell wall integrity, making plants more resistant to pathogens and stresses. It promotes better growth and helps prevent nutrient-related deficiencies.\\r\\n\\r\\n🔍 Uses: Provides protection against diseases like tomato mosaic virus and two-spotted spider mites by strengthening plant immunity.\\r\\n\\r\\n🧴 Application: Mix with water for foliar spray or apply to the soil around the root zone. Repeat applications every two weeks to maintain resilience.\", \"final_price\": \"20.00\"}, {\"id\": 28, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-8oz\", \"image\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 The 8 oz Neem Bliss Pure Neem Oil is designed for efficient pest control and enhancing plant health.\\r\\n\\r\\n🔍 Uses: Addresses issues with aphids, whiteflies, and thrips, while preventing viral diseases such as tomato yellow leaf curl virus.\\r\\n\\r\\n🧴 Application: Mix with water and spray on affected areas or apply directly to the soil. Recommended during active growth for optimal results.\", \"final_price\": \"29.00\"}]'),
(6, 8, 10, 0.972854, '2024-11-30 13:50:21', 'http://localhost:5000/uploads/08f9f849-6eff-400b-b8dc-2c42da72062a.jpg', '[{\"id\": 3, \"sku\": \"CA1215\", \"slug\": \"ridomil-gold\\r\\n\", \"image\": \"https://i.ibb.co/Sy4fCnj/Ridomil-Gold-68-WG.png\", \"price\": \"30.00\", \"stock\": 28, \"title\": \"Ridomil Gold 68 WG\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 21, \"description\": \"🌱 Targeted disease control\\r\\nRidomil Gold 68 WG is a systemic fungicide known for its strong action against oomycete pathogens, like those causing late blight. It is absorbed into the plant tissue, offering internal protection and stopping disease spread from within.\\r\\n\\r\\n🔍 Uses: Primarily used to control late blight in tomatoes and other vegetables, it’s one of the most effective options for this devastating disease.\\r\\n\\r\\n🧴 Application: Mix with water according to label instructions and apply to the base of the plants to allow absorption through the roots. Repeat as recommended, especially during wet conditions.\", \"final_price\": \"9.00\"}, {\"id\": 21, \"sku\": \"EF1219\", \"slug\": \"silicapower-large\\r\\n\", \"image\": \"https://i.ibb.co/bQGdnnh/Silica-Power-big.png\", \"price\": \"30.00\", \"stock\": 20, \"title\": \"SilicaPower (Large)\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🧪 Advanced Silica Biostimulant for All Crops\\r\\nSilicaPower is a high-concentration silica solution designed to increase plant resilience and growth. It supports root and stem strength, improves nutrient uptake, and helps plants handle stress better.\\r\\n\\r\\n🔍 Uses: Protects against powdery mildew, early blight, and leaf mold. Ideal for use as a preventative measure in stressed plants.\\r\\n\\r\\n🧴 Application: Shake well, dilute with water, and apply as a foliar spray. Recommended to use every 7-10 days during peak growth for consistent protection.\", \"final_price\": \"30.00\"}, {\"id\": 5, \"sku\": \"DA1220\", \"slug\": \"score-250ec\\r\\n\", \"image\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": \"220.00\", \"stock\": 42, \"title\": \"Score 250EC\", \"brand_id\": 1, \"discount\": \"3.00\", \"category_id\": 20, \"description\": \"🌱 Broad-spectrum Fungicide\\r\\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\\r\\n\\r\\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\\r\\n\\r\\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.\", \"final_price\": \"213.40\"}]'),
(7, 8, 3, 0.798298, '2024-11-30 13:50:29', 'http://localhost:5000/uploads/f60664b6-6b07-432b-853c-e21a91e8ab4f.jpg', '[{\"id\": 11, \"sku\": \"DA1219\", \"slug\": \"yaraliva-nitrabor\", \"image\": \"https://i.ibb.co/7RDV6nQ/Yara-Liva-NITRABOR.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"YaraLiva NITRABOR\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🧪 Balanced Calcium and Boron Fertilizer for Healthy Roots and Fruits\\r\\nYaraLiva NITRABOR is specially formulated to support root strength and robust fruit set by supplying calcium and boron, both essential nutrients for tomatoes and other fruiting plants. It prevents disorders caused by calcium deficiencies, helping maintain fruit quality and plant structure.\\r\\n\\r\\n🔍 Uses: Prevents blossom end rot in tomatoes and enhances resistance against diseases like bacterial spot and fungal leaf spots, which are often exacerbated by nutrient imbalances.\\r\\n\\r\\n🧴 Application: Apply directly to soil or as a foliar spray. For best results, use at the start of flowering and continue during fruiting stages to ensure plants receive adequate calcium and boron.\", \"final_price\": \"22.00\"}, {\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 10, \"sku\": \"CA1514\", \"slug\": \"silimax\", \"image\": \"https://i.ibb.co/DYNrGWP/Silimax.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"Silimax\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🛡️ Enhanced Resilience and Disease Prevention\\r\\nSilimax is a foliar silicon-based fertilizer that fortifies plant cell walls, making plants more resilient against environmental stress, pathogens, and fungal infections. By strengthening tissue structure, it helps plants resist common fungal issues that thrive in humid conditions.\\r\\n\\r\\n🔍 Uses: Effective in improving defense against diseases like powdery mildew, leaf mold, and Septoria leaf spot, which attack plant foliage. This enhanced resilience boosts overall plant health, reducing vulnerability to environmental stresses.\\r\\n\\r\\n🧴 Application: Dilute with water and apply as a foliar spray during early growth stages, ideally in the morning for better absorption. Reapply every 10-14 days to maintain consistent protection.\", \"final_price\": \"22.00\"}]'),
(8, 8, 9, 1, '2024-11-30 13:50:38', 'http://localhost:5000/uploads/43bfbbc6-3273-43e4-a00b-807b050a4eb3.JPG', '[{\"id\": 22, \"sku\": \"EF1219\", \"slug\": \"silicapower-small\\r\\n\", \"image\": \"https://i.ibb.co/QDp5wfp/Silica-Power-small.png\", \"price\": \"10.00\", \"stock\": 20, \"title\": \"SilicaPower (Small)\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🌾 Silica Supplement for Stronger, Healthier Plants\\r\\nA smaller, convenient bottle of SilicaPower that delivers the same concentrated silica to boost plant health. It enhances cell wall strength, improves drought resistance, and supports overall plant vitality.\\r\\n\\r\\n🔍 Uses: Helps prevent common issues like bacterial spot and powdery mildew by promoting tougher plant tissues.\\r\\n\\r\\n🧴 Application: Shake well and mix with water for foliar application. Spray thoroughly on plant surfaces every 10 days for best results, especially during vulnerable growth stages.\", \"final_price\": \"10.00\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}, {\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}]'),
(9, 8, 6, 0.999998, '2024-11-30 13:52:04', 'http://localhost:5000/uploads/728b1ee0-fbf2-4b58-b729-388e9580890b.JPG', '[{\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}, {\"id\": 14, \"sku\": \"EF1219\", \"slug\": \"canxi-kali-ko-zinc-dn32\\r\\n\", \"image\": \"https://i.ibb.co/rddxsMp/Canxi-Kali-Bo-Kem-DN32.png\", \"price\": \"30.00\", \"stock\": 20, \"title\": \"Canxi Kali Bo Zinc DN32\\r\\n\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 18, \"description\": \"🌾 Comprehensive Nutrient Solution for Flowering and Fruiting\\r\\nThis balanced blend of calcium, potassium, boron, and micronutrients boosts plant vigor, supporting flowering and fruit set. The addition of boron and potassium enhances fruit quality and increases disease resistance by improving nutrient flow within the plant.\\r\\n\\r\\n🔍 Uses: Reduces occurrences of bacterial and fungal leaf spots, like bacterial spot and target spot, by promoting overall plant health and resilience during peak growth phases.\\r\\n\\r\\n🧴 Application: Apply around the root zone or dissolve in water for foliar application. Best used during flowering and fruiting stages to maximize nutrient uptake and promote robust fruit development.\", \"final_price\": \"30.00\"}, {\"id\": 28, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-8oz\", \"image\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 The 8 oz Neem Bliss Pure Neem Oil is designed for efficient pest control and enhancing plant health.\\r\\n\\r\\n🔍 Uses: Addresses issues with aphids, whiteflies, and thrips, while preventing viral diseases such as tomato yellow leaf curl virus.\\r\\n\\r\\n🧴 Application: Mix with water and spray on affected areas or apply directly to the soil. Recommended during active growth for optimal results.\", \"final_price\": \"29.00\"}]'),
(10, 8, 7, 0.99951, '2024-11-30 13:52:11', 'http://localhost:5000/uploads/a34237d6-39d8-4e76-a341-3dd41ccb1069.jpg', '[{\"id\": 17, \"sku\": \"EF1219\", \"slug\": \"siltron-cal-mag\\r\\n\", \"image\": \"https://i.ibb.co/rkDhP4B/Siltron-Cal-Mag.png\", \"price\": \"30.00\", \"stock\": 20, \"title\": \"Siltron Cal Mag\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 18, \"description\": \"🌿 Calcium and Magnesium Supplement for Strong Foliage and Fruit\\r\\nSiltron Cal Mag provides essential calcium and magnesium, both critical for robust leaf and fruit development. Magnesium improves chlorophyll production, while calcium prevents leaf tip burn and improves overall leaf health.\\r\\n\\r\\n🔍 Uses: Reduces the risk of early blight, tomato yellow leaf curl virus, and two-spotted spider mites by promoting healthy, resilient foliage that can better withstand disease pressures.\\r\\n\\r\\n🧴 Application: Dilute with water and spray on leaves or apply to the root zone during early and mid-growth stages. Reapply as needed to ensure continued availability of these essential nutrients throughout the growing cycle.\", \"final_price\": \"30.00\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}, {\"id\": 10, \"sku\": \"CA1514\", \"slug\": \"silimax\", \"image\": \"https://i.ibb.co/DYNrGWP/Silimax.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"Silimax\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🛡️ Enhanced Resilience and Disease Prevention\\r\\nSilimax is a foliar silicon-based fertilizer that fortifies plant cell walls, making plants more resilient against environmental stress, pathogens, and fungal infections. By strengthening tissue structure, it helps plants resist common fungal issues that thrive in humid conditions.\\r\\n\\r\\n🔍 Uses: Effective in improving defense against diseases like powdery mildew, leaf mold, and Septoria leaf spot, which attack plant foliage. This enhanced resilience boosts overall plant health, reducing vulnerability to environmental stresses.\\r\\n\\r\\n🧴 Application: Dilute with water and apply as a foliar spray during early growth stages, ideally in the morning for better absorption. Reapply every 10-14 days to maintain consistent protection.\", \"final_price\": \"22.00\"}]'),
(11, 8, 5, 1, '2024-11-30 13:52:20', 'http://localhost:5000/uploads/4cca5f9c-569d-470e-8dd6-d3f241c98f92.JPG', '[{\"id\": 27, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-16oz\", \"image\": \"https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (16 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 Neem Bliss Pure Neem Oil is an organic solution that effectively combats a range of pests while promoting plant health.\\r\\n\\r\\n🔍 Uses: Helps manage pests such as spider mites, aphids, and whiteflies, while preventing diseases like powdery mildew and bacterial spot.\\r\\n\\r\\n🧴 Application: Dilute in water for foliar application or apply as a soil drench. Best used during active growth stages to ensure maximum protection and nutrient absorption.\", \"final_price\": \"29.00\"}, {\"id\": 28, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-8oz\", \"image\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 The 8 oz Neem Bliss Pure Neem Oil is designed for efficient pest control and enhancing plant health.\\r\\n\\r\\n🔍 Uses: Addresses issues with aphids, whiteflies, and thrips, while preventing viral diseases such as tomato yellow leaf curl virus.\\r\\n\\r\\n🧴 Application: Mix with water and spray on affected areas or apply directly to the soil. Recommended during active growth for optimal results.\", \"final_price\": \"29.00\"}, {\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}]'),
(12, 11, 2, 0.998771, '2024-11-30 13:53:12', 'http://localhost:5000/uploads/a6cbcefb-d851-4b52-942b-ad625796940b.jpg', '[{\"id\": 9, \"sku\": \"BA1513\", \"slug\": \"zorvec-encantia-330se\\r\\n\", \"image\": \"https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png\", \"price\": \"15.00\", \"stock\": 15, \"title\": \"Zorvec Encantia 330SE\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌾 Long-lasting Disease Prevention\\r\\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\\r\\n\\r\\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.\", \"final_price\": \"15.00\"}, {\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}]'),
(13, 11, 4, 0.996732, '2024-11-30 13:53:32', 'http://localhost:5000/uploads/fb7fe40a-67d5-4369-b284-2e5b707ab5ed.jpg', '[{\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}, {\"id\": 6, \"sku\": \"BA1130\", \"slug\": \"confidor-100sl\\r\\n\", \"image\": \"https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png\", \"price\": \"50.00\", \"stock\": 50, \"title\": \"Confidor 100SL\\r\\n\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🛡️ Effective Pest Control\\r\\nConfidor 100SL is a powerful insecticide targeting sap-sucking pests. It’s especially effective on crops like tomatoes, helping control pests that feed on plant sap.\\r\\n\\r\\n🔍 Uses: Ideal for managing pests such as aphids, whiteflies, and thrips on tomatoes and various vegetables.\\r\\n\\r\\n🧴 Application: Dilute with water as per label instructions and spray evenly over the plant foliage for optimal pest control.\", \"final_price\": \"50.00\"}]'),
(14, 11, 8, 0.999844, '2024-11-30 13:53:40', 'http://localhost:5000/uploads/e929c54c-995f-49e6-8e2d-dcd6923aa511.jpg', '[{\"id\": 28, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-8oz\", \"image\": \"https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (8 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 The 8 oz Neem Bliss Pure Neem Oil is designed for efficient pest control and enhancing plant health.\\r\\n\\r\\n🔍 Uses: Addresses issues with aphids, whiteflies, and thrips, while preventing viral diseases such as tomato yellow leaf curl virus.\\r\\n\\r\\n🧴 Application: Mix with water and spray on affected areas or apply directly to the soil. Recommended during active growth for optimal results.\", \"final_price\": \"29.00\"}, {\"id\": 27, \"sku\": \"EF1289\", \"slug\": \"neem-bliss-pure-neem-oil-16oz\", \"image\": \"https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png\", \"price\": \"29.00\", \"stock\": 10, \"title\": \"Neem Bliss Pure Neem Oil (16 oz)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 9, \"description\": \"🧪 Neem Bliss Pure Neem Oil is an organic solution that effectively combats a range of pests while promoting plant health.\\r\\n\\r\\n🔍 Uses: Helps manage pests such as spider mites, aphids, and whiteflies, while preventing diseases like powdery mildew and bacterial spot.\\r\\n\\r\\n🧴 Application: Dilute in water for foliar application or apply as a soil drench. Best used during active growth stages to ensure maximum protection and nutrient absorption.\", \"final_price\": \"29.00\"}, {\"id\": 19, \"sku\": \"EF1219\", \"slug\": \"ka-silic-box\\r\\n\", \"image\": \"https://i.ibb.co/3ffS33v/kalisilic.png\", \"price\": \"15.00\", \"stock\": 50, \"title\": \"Ka-Silic (Box)\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🌱 Nutrient-Rich Silicon and Potassium Fertilizer\\r\\nKa-Silic is designed to boost resilience by strengthening plant cell walls with a combination of silicon and potassium. This helps plants withstand environmental stress and minimizes the impact of nutrient deficiencies.\\r\\n\\r\\n🔍 Uses: Especially helpful in managing Septoria leaf spot, target spot, and early blight by fortifying plant tissues and improving nutrient uptake.\\r\\n\\r\\n🧴 Application: Dilute with water and apply as a foliar spray. Use during early growth stages and repeat every 14 days for optimal results.\", \"final_price\": \"15.00\"}]'),
(15, 11, 10, 0.417163, '2024-11-30 13:53:48', 'http://localhost:5000/uploads/13d2d226-66c4-497b-ae1d-8da4b177fe13.jpg', '[{\"id\": 8, \"sku\": \"BC1140\", \"slug\": \"ortiva-600sc\\r\\n\", \"image\": \"https://i.ibb.co/8dcwddx/Ortiva-600-SC.png\", \"price\": \"20.00\", \"stock\": 28, \"title\": \"Ortiva 600SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌿 Dual-purpose Fungicide and Pest Control\\r\\nOrtiva 600SC, with azoxystrobin, is primarily a fungicide but is also used in integrated pest management to combat diseases that pests can worsen.\\r\\n\\r\\n🔍 Uses: Effective against early blight, powdery mildew, and leaf mold on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water as instructed and spray on leaves and stems to maximize protective coverage.\", \"final_price\": \"20.00\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}, {\"id\": 3, \"sku\": \"CA1215\", \"slug\": \"ridomil-gold\\r\\n\", \"image\": \"https://i.ibb.co/Sy4fCnj/Ridomil-Gold-68-WG.png\", \"price\": \"30.00\", \"stock\": 28, \"title\": \"Ridomil Gold 68 WG\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 21, \"description\": \"🌱 Targeted disease control\\r\\nRidomil Gold 68 WG is a systemic fungicide known for its strong action against oomycete pathogens, like those causing late blight. It is absorbed into the plant tissue, offering internal protection and stopping disease spread from within.\\r\\n\\r\\n🔍 Uses: Primarily used to control late blight in tomatoes and other vegetables, it’s one of the most effective options for this devastating disease.\\r\\n\\r\\n🧴 Application: Mix with water according to label instructions and apply to the base of the plants to allow absorption through the roots. Repeat as recommended, especially during wet conditions.\", \"final_price\": \"9.00\"}]'),
(16, 8, 1, 0.999997, '2024-12-04 13:08:22', 'http://localhost:5000/uploads/8279c103-2440-4445-a774-4c228dd39cf6.JPG', '[{\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}, {\"id\": 5, \"sku\": \"DA1220\", \"slug\": \"score-250ec\\r\\n\", \"image\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": \"220.00\", \"stock\": 42, \"title\": \"Score 250EC\", \"brand_id\": 1, \"discount\": \"3.00\", \"category_id\": 20, \"description\": \"🌱 Broad-spectrum Fungicide\\r\\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\\r\\n\\r\\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\\r\\n\\r\\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.\", \"final_price\": \"213.40\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}]'),
(17, 8, 9, 1, '2024-12-04 14:00:43', 'http://localhost:5000/uploads/e092f228-a9e7-40cf-b0bc-3eb640d3c001.JPG', '[{\"id\": 5, \"sku\": \"DA1220\", \"slug\": \"score-250ec\\r\\n\", \"image\": \"https://i.ibb.co/55SNMyt/Score-250-EC.png\", \"price\": \"220.00\", \"stock\": 42, \"title\": \"Score 250EC\", \"brand_id\": 1, \"discount\": \"3.00\", \"category_id\": 20, \"description\": \"🌱 Broad-spectrum Fungicide\\r\\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\\r\\n\\r\\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\\r\\n\\r\\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.\", \"final_price\": \"213.40\"}, {\"id\": 22, \"sku\": \"EF1219\", \"slug\": \"silicapower-small\\r\\n\", \"image\": \"https://i.ibb.co/QDp5wfp/Silica-Power-small.png\", \"price\": \"10.00\", \"stock\": 20, \"title\": \"SilicaPower (Small)\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🌾 Silica Supplement for Stronger, Healthier Plants\\r\\nA smaller, convenient bottle of SilicaPower that delivers the same concentrated silica to boost plant health. It enhances cell wall strength, improves drought resistance, and supports overall plant vitality.\\r\\n\\r\\n🔍 Uses: Helps prevent common issues like bacterial spot and powdery mildew by promoting tougher plant tissues.\\r\\n\\r\\n🧴 Application: Shake well and mix with water for foliar application. Spray thoroughly on plant surfaces every 10 days for best results, especially during vulnerable growth stages.\", \"final_price\": \"10.00\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}]'),
(18, 11, 7, 0.410383, '2024-12-04 14:34:40', 'http://localhost:5000/uploads/eb7781e9-20c3-4705-9ba8-002bc5400eb3.jpg', '[{\"id\": 10, \"sku\": \"CA1514\", \"slug\": \"silimax\", \"image\": \"https://i.ibb.co/DYNrGWP/Silimax.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"Silimax\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🛡️ Enhanced Resilience and Disease Prevention\\r\\nSilimax is a foliar silicon-based fertilizer that fortifies plant cell walls, making plants more resilient against environmental stress, pathogens, and fungal infections. By strengthening tissue structure, it helps plants resist common fungal issues that thrive in humid conditions.\\r\\n\\r\\n🔍 Uses: Effective in improving defense against diseases like powdery mildew, leaf mold, and Septoria leaf spot, which attack plant foliage. This enhanced resilience boosts overall plant health, reducing vulnerability to environmental stresses.\\r\\n\\r\\n🧴 Application: Dilute with water and apply as a foliar spray during early growth stages, ideally in the morning for better absorption. Reapply every 10-14 days to maintain consistent protection.\", \"final_price\": \"22.00\"}, {\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 4, \"sku\": \"CA1216\", \"slug\": \"kasumin-2l\", \"image\": \"https://i.ibb.co/jrHmYjy/Kasumin-2-L.png\", \"price\": \"200.00\", \"stock\": 33, \"title\": \"Kasumin 2L\", \"brand_id\": 1, \"discount\": \"5.00\", \"category_id\": 21, \"description\": \"🛡️ Powerful Bacterial Control\\r\\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\\r\\n\\r\\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\\r\\n\\r\\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.\", \"final_price\": \"190.00\"}]'),
(19, 11, 10, 0.999949, '2024-12-04 14:35:13', 'http://localhost:5000/uploads/44fb2a94-c1c0-479d-8862-ed568b96ff39.jpg', '[{\"id\": 3, \"sku\": \"CA1215\", \"slug\": \"ridomil-gold\\r\\n\", \"image\": \"https://i.ibb.co/Sy4fCnj/Ridomil-Gold-68-WG.png\", \"price\": \"30.00\", \"stock\": 28, \"title\": \"Ridomil Gold 68 WG\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 21, \"description\": \"🌱 Targeted disease control\\r\\nRidomil Gold 68 WG is a systemic fungicide known for its strong action against oomycete pathogens, like those causing late blight. It is absorbed into the plant tissue, offering internal protection and stopping disease spread from within.\\r\\n\\r\\n🔍 Uses: Primarily used to control late blight in tomatoes and other vegetables, it’s one of the most effective options for this devastating disease.\\r\\n\\r\\n🧴 Application: Mix with water according to label instructions and apply to the base of the plants to allow absorption through the roots. Repeat as recommended, especially during wet conditions.\", \"final_price\": \"9.00\"}, {\"id\": 8, \"sku\": \"BC1140\", \"slug\": \"ortiva-600sc\\r\\n\", \"image\": \"https://i.ibb.co/8dcwddx/Ortiva-600-SC.png\", \"price\": \"20.00\", \"stock\": 28, \"title\": \"Ortiva 600SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌿 Dual-purpose Fungicide and Pest Control\\r\\nOrtiva 600SC, with azoxystrobin, is primarily a fungicide but is also used in integrated pest management to combat diseases that pests can worsen.\\r\\n\\r\\n🔍 Uses: Effective against early blight, powdery mildew, and leaf mold on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water as instructed and spray on leaves and stems to maximize protective coverage.\", \"final_price\": \"20.00\"}, {\"id\": 21, \"sku\": \"EF1219\", \"slug\": \"silicapower-large\\r\\n\", \"image\": \"https://i.ibb.co/bQGdnnh/Silica-Power-big.png\", \"price\": \"30.00\", \"stock\": 20, \"title\": \"SilicaPower (Large)\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🧪 Advanced Silica Biostimulant for All Crops\\r\\nSilicaPower is a high-concentration silica solution designed to increase plant resilience and growth. It supports root and stem strength, improves nutrient uptake, and helps plants handle stress better.\\r\\n\\r\\n🔍 Uses: Protects against powdery mildew, early blight, and leaf mold. Ideal for use as a preventative measure in stressed plants.\\r\\n\\r\\n🧴 Application: Shake well, dilute with water, and apply as a foliar spray. Recommended to use every 7-10 days during peak growth for consistent protection.\", \"final_price\": \"30.00\"}]');
INSERT INTO `prediction_history` (`id`, `user_id`, `disease_id`, `accuracy`, `predicted_time`, `image_url`, `suggested_products`) VALUES
(20, 8, 9, 0.994977, '2024-12-05 14:12:16', 'http://localhost:5000/uploads/e8a4d4db-7299-4477-8ceb-cfb2d9093bbe.JPG', '[{\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 22, \"sku\": \"EF1219\", \"slug\": \"silicapower-small\\r\\n\", \"image\": \"https://i.ibb.co/QDp5wfp/Silica-Power-small.png\", \"price\": \"10.00\", \"stock\": 20, \"title\": \"SilicaPower (Small)\\r\\n\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 6, \"description\": \"🌾 Silica Supplement for Stronger, Healthier Plants\\r\\nA smaller, convenient bottle of SilicaPower that delivers the same concentrated silica to boost plant health. It enhances cell wall strength, improves drought resistance, and supports overall plant vitality.\\r\\n\\r\\n🔍 Uses: Helps prevent common issues like bacterial spot and powdery mildew by promoting tougher plant tissues.\\r\\n\\r\\n🧴 Application: Shake well and mix with water for foliar application. Spray thoroughly on plant surfaces every 10 days for best results, especially during vulnerable growth stages.\", \"final_price\": \"10.00\"}, {\"id\": 11, \"sku\": \"DA1219\", \"slug\": \"yaraliva-nitrabor\", \"image\": \"https://i.ibb.co/7RDV6nQ/Yara-Liva-NITRABOR.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"YaraLiva NITRABOR\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🧪 Balanced Calcium and Boron Fertilizer for Healthy Roots and Fruits\\r\\nYaraLiva NITRABOR is specially formulated to support root strength and robust fruit set by supplying calcium and boron, both essential nutrients for tomatoes and other fruiting plants. It prevents disorders caused by calcium deficiencies, helping maintain fruit quality and plant structure.\\r\\n\\r\\n🔍 Uses: Prevents blossom end rot in tomatoes and enhances resistance against diseases like bacterial spot and fungal leaf spots, which are often exacerbated by nutrient imbalances.\\r\\n\\r\\n🧴 Application: Apply directly to soil or as a foliar spray. For best results, use at the start of flowering and continue during fruiting stages to ensure plants receive adequate calcium and boron.\", \"final_price\": \"22.00\"}]'),
(21, 8, 7, 1, '2024-12-05 14:39:52', 'http://localhost:5000/uploads/eceb879b-2440-4653-bff1-9e72d35a2bd7.JPG', '[{\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 1, \"sku\": \"\", \"slug\": \"copper-soap-concentrate\", \"image\": \"https://i.ibb.co/YZ9BwPq/Copper-Soap.png\", \"price\": \"50.00\", \"stock\": 46, \"title\": \"Copper Soap Fungicide (Concentrate)\", \"brand_id\": 1, \"discount\": \"2.00\", \"category_id\": 20, \"description\": \"🛡️ Broad-spectrum protection\\r\\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\\r\\n\\r\\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\\r\\n\\r\\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.\", \"final_price\": \"49.00\"}, {\"id\": 10, \"sku\": \"CA1514\", \"slug\": \"silimax\", \"image\": \"https://i.ibb.co/DYNrGWP/Silimax.png\", \"price\": \"22.00\", \"stock\": 9, \"title\": \"Silimax\", \"brand_id\": 1, \"discount\": \"0.00\", \"category_id\": 5, \"description\": \"🛡️ Enhanced Resilience and Disease Prevention\\r\\nSilimax is a foliar silicon-based fertilizer that fortifies plant cell walls, making plants more resilient against environmental stress, pathogens, and fungal infections. By strengthening tissue structure, it helps plants resist common fungal issues that thrive in humid conditions.\\r\\n\\r\\n🔍 Uses: Effective in improving defense against diseases like powdery mildew, leaf mold, and Septoria leaf spot, which attack plant foliage. This enhanced resilience boosts overall plant health, reducing vulnerability to environmental stresses.\\r\\n\\r\\n🧴 Application: Dilute with water and apply as a foliar spray during early growth stages, ideally in the morning for better absorption. Reapply every 10-14 days to maintain consistent protection.\", \"final_price\": \"22.00\"}]'),
(22, 8, 4, 0.996732, '2024-12-05 14:42:22', 'http://localhost:5000/uploads/0c0a41cd-4ec4-43f4-9df8-65bc3ca44362.jpg', '[{\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}, {\"id\": 9, \"sku\": \"BA1513\", \"slug\": \"zorvec-encantia-330se\\r\\n\", \"image\": \"https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png\", \"price\": \"15.00\", \"stock\": 15, \"title\": \"Zorvec Encantia 330SE\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌾 Long-lasting Disease Prevention\\r\\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\\r\\n\\r\\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.\", \"final_price\": \"15.00\"}, {\"id\": 6, \"sku\": \"BA1130\", \"slug\": \"confidor-100sl\\r\\n\", \"image\": \"https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png\", \"price\": \"50.00\", \"stock\": 50, \"title\": \"Confidor 100SL\\r\\n\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🛡️ Effective Pest Control\\r\\nConfidor 100SL is a powerful insecticide targeting sap-sucking pests. It’s especially effective on crops like tomatoes, helping control pests that feed on plant sap.\\r\\n\\r\\n🔍 Uses: Ideal for managing pests such as aphids, whiteflies, and thrips on tomatoes and various vegetables.\\r\\n\\r\\n🧴 Application: Dilute with water as per label instructions and spray evenly over the plant foliage for optimal pest control.\", \"final_price\": \"50.00\"}]'),
(23, 11, 4, 0.996732, '2024-12-05 14:51:24', 'http://localhost:5000/uploads/f840651d-ff11-474c-86bd-94c0b4c7da93.jpg', '[{\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 9, \"sku\": \"BA1513\", \"slug\": \"zorvec-encantia-330se\\r\\n\", \"image\": \"https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png\", \"price\": \"15.00\", \"stock\": 15, \"title\": \"Zorvec Encantia 330SE\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌾 Long-lasting Disease Prevention\\r\\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\\r\\n\\r\\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.\", \"final_price\": \"15.00\"}, {\"id\": 6, \"sku\": \"BA1130\", \"slug\": \"confidor-100sl\\r\\n\", \"image\": \"https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png\", \"price\": \"50.00\", \"stock\": 50, \"title\": \"Confidor 100SL\\r\\n\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🛡️ Effective Pest Control\\r\\nConfidor 100SL is a powerful insecticide targeting sap-sucking pests. It’s especially effective on crops like tomatoes, helping control pests that feed on plant sap.\\r\\n\\r\\n🔍 Uses: Ideal for managing pests such as aphids, whiteflies, and thrips on tomatoes and various vegetables.\\r\\n\\r\\n🧴 Application: Dilute with water as per label instructions and spray evenly over the plant foliage for optimal pest control.\", \"final_price\": \"50.00\"}]'),
(24, 8, 4, 0.996732, '2024-12-05 14:55:12', 'http://localhost:5000/uploads/68e1ef88-e22b-44bd-8fe9-cef89a0d9739.jpg', '[{\"id\": 26, \"sku\": \"EF1217\", \"slug\": \"yaramil-unik-16\", \"image\": \"https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png\", \"price\": \"29.00\", \"stock\": 100, \"title\": \" YaraMila UNIK 16\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 3, \"description\": \"🧪 Specialized NPK Fertilizer for Enhanced Plant Health\\r\\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\\r\\n\\r\\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\\r\\n\\r\\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\\r\\n\\r\\n\", \"final_price\": \"29.00\"}, {\"id\": 7, \"sku\": \"BC1132\", \"slug\": \"daconil-500Ssc\\r\\n\", \"image\": \"https://i.ibb.co/30bsbZN/Daconil-500-SC.png\", \"price\": \"80.00\", \"stock\": 28, \"title\": \"Daconil 500SC\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 22, \"description\": \"🪲 Multi-purpose Insecticide\\r\\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\\r\\n\\r\\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\\r\\n\\r\\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.\", \"final_price\": \"80.00\"}, {\"id\": 9, \"sku\": \"BA1513\", \"slug\": \"zorvec-encantia-330se\\r\\n\", \"image\": \"https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png\", \"price\": \"15.00\", \"stock\": 15, \"title\": \"Zorvec Encantia 330SE\", \"brand_id\": 2, \"discount\": \"0.00\", \"category_id\": 23, \"description\": \"🌾 Long-lasting Disease Prevention\\r\\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\\r\\n\\r\\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\\r\\n\\r\\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.\", \"final_price\": \"15.00\"}]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  `final_price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `sku` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `parent_category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `price`, `stock`, `image`, `discount`, `final_price`, `category_id`, `brand_id`, `sku`, `slug`, `parent_category_id`) VALUES
(1, 'Copper Soap Fungicide (Concentrate)', '🛡️ Broad-spectrum protection\r\nCopper Soap Fungicide offers effective protection against a wide range of fungal and bacterial diseases on tomatoes and other plants. Ideal for organic gardening, this concentrate works by releasing copper ions that prevent disease spread when applied before or at the first sign of infection.\r\n\r\n🔍 Uses: Protects tomatoes from diseases like Septoria leaf spot, powdery mildew, and bacterial spot. It is especially beneficial as a preventative measure rather than a cure.\r\n\r\n🧴 Application: Mix with water and spray on plant surfaces every 7-10 days for ongoing protection.', 50.00, 46, 'https://i.ibb.co/YZ9BwPq/Copper-Soap.png', 2.00, 49.00, 20, 1, '', 'copper-soap-concentrate', 10),
(2, 'Copper Soap Fungicide (Ready-to-Use Spray)', '✨ Convenience meets effectiveness\r\nThis ready-to-use version of Copper Soap Fungicide is perfect for small gardens or quick application needs. It provides the same copper-based defense against fungal diseases.\r\n\r\n🔍 Uses: Effective against early blight, Septoria leaf spot, and leaf mold. It can be applied directly to leaves and stems without mixing, making it user-friendly for immediate treatment.\r\n\r\n🧴 Application: Spray thoroughly on infected and surrounding areas. Reapply every 7-10 days or as needed.', 60.00, 34, 'https://i.ibb.co/jDSTfR5/Copper-Soap-32oz.png', 0.00, 60.00, 20, 1, 'AB32335', 'copper-soap-spray', 10),
(3, 'Ridomil Gold 68 WG\r\n', '🌱 Targeted disease control\r\nRidomil Gold 68 WG is a systemic fungicide known for its strong action against oomycete pathogens, like those causing late blight. It is absorbed into the plant tissue, offering internal protection and stopping disease spread from within.\r\n\r\n🔍 Uses: Primarily used to control late blight in tomatoes and other vegetables, it’s one of the most effective options for this devastating disease.\r\n\r\n🧴 Application: Mix with water according to label instructions and apply to the base of the plants to allow absorption through the roots. Repeat as recommended, especially during wet conditions.', 30.00, 28, 'https://i.ibb.co/Sy4fCnj/Ridomil-Gold-68-WG.png', 0.00, 9.00, 21, 1, 'CA1215', 'ridomil-gold\r\n', 10),
(4, 'Kasumin 2L', '🛡️ Powerful Bacterial Control\r\nKasumin 2L is a highly effective bacterial control solution for crops, particularly beneficial for tomatoes. This product contains Kasugamycin, an active ingredient that halts the spread of bacterial diseases.\r\n\r\n🔍 Uses: Ideal for controlling bacterial diseases like bacterial spot and bacterial leaf blight on tomatoes, helping plants grow stronger and reducing crop loss risks.\r\n\r\n🧴 Application: Dilute with water as directed on the label, then spray evenly on plants during cool parts of the day, such as morning or late afternoon. Apply regularly for maximum effectiveness.', 200.00, 33, 'https://i.ibb.co/jrHmYjy/Kasumin-2-L.png', 5.00, 190.00, 21, 1, 'CA1216', 'kasumin-2l', 10),
(5, 'Score 250EC', '🌱 Broad-spectrum Fungicide\r\nScore 250EC is a broad-spectrum fungicide that shields plants from a variety of fungal threats. With the active ingredient Difenoconazole, this product is easily absorbed, protecting the plant from within.\r\n\r\n🔍 Uses: Highly effective against diseases like late blight, powdery mildew, and leaf spot on tomatoes and various other crops.\r\n\r\n🧴 Application: Mix with water at the recommended ratio, then spray on the entire plant. Ensure thorough coverage on leaves and stems to maximize protection.', 220.00, 42, 'https://i.ibb.co/55SNMyt/Score-250-EC.png', 3.00, 213.40, 20, 1, 'DA1220', 'score-250ec\r\n', 10),
(6, 'Confidor 100SL\r\n', '🛡️ Effective Pest Control\r\nConfidor 100SL is a powerful insecticide targeting sap-sucking pests. It’s especially effective on crops like tomatoes, helping control pests that feed on plant sap.\r\n\r\n🔍 Uses: Ideal for managing pests such as aphids, whiteflies, and thrips on tomatoes and various vegetables.\r\n\r\n🧴 Application: Dilute with water as per label instructions and spray evenly over the plant foliage for optimal pest control.', 50.00, 50, 'https://i.ibb.co/Jj6d5m7/CONFIDOR-100-SL.png', 0.00, 50.00, 22, 2, 'BA1130', 'confidor-100sl\r\n', 14),
(7, 'Daconil 500SC', '🪲 Multi-purpose Insecticide\r\nReasgant 3.6EC contains Abamectin, effective against a range of pests, including both general insects and mites.\r\n\r\n🔍 Uses: Best suited for managing caterpillars, leaf miners, and other leaf-damaging pests on tomatoes.\r\n\r\n🧴 Application: Dilute with water per label instructions and apply thoroughly on plant surfaces.', 80.00, 28, 'https://i.ibb.co/30bsbZN/Daconil-500-SC.png', 0.00, 80.00, 22, 2, 'BC1132', 'daconil-500Ssc\r\n', 14),
(8, 'Ortiva 600SC', '🌿 Dual-purpose Fungicide and Pest Control\r\nOrtiva 600SC, with azoxystrobin, is primarily a fungicide but is also used in integrated pest management to combat diseases that pests can worsen.\r\n\r\n🔍 Uses: Effective against early blight, powdery mildew, and leaf mold on tomatoes.\r\n\r\n🧴 Application: Mix with water as instructed and spray on leaves and stems to maximize protective coverage.', 20.00, 28, 'https://i.ibb.co/8dcwddx/Ortiva-600-SC.png', 0.00, 20.00, 23, 2, 'BC1140', 'ortiva-600sc\r\n', 14),
(9, 'Zorvec Encantia 330SE', '🌾 Long-lasting Disease Prevention\r\nZorvec Encantia 330SE provides extended protection against fungal diseases, indirectly aiding in pest management by maintaining plant health.\r\n\r\n🔍 Uses: Ideal for preventing downy mildew and late blight on tomatoes.\r\n\r\n🧴 Application: Mix with water and spray evenly for long-lasting disease prevention.', 15.00, 15, 'https://i.ibb.co/0ZrTDVR/Zorvec-Encantia-330-SE-2.png', 0.00, 15.00, 23, 2, 'BA1513', 'zorvec-encantia-330se\r\n', 14),
(10, 'Silimax', '🛡️ Enhanced Resilience and Disease Prevention\r\nSilimax is a foliar silicon-based fertilizer that fortifies plant cell walls, making plants more resilient against environmental stress, pathogens, and fungal infections. By strengthening tissue structure, it helps plants resist common fungal issues that thrive in humid conditions.\r\n\r\n🔍 Uses: Effective in improving defense against diseases like powdery mildew, leaf mold, and Septoria leaf spot, which attack plant foliage. This enhanced resilience boosts overall plant health, reducing vulnerability to environmental stresses.\r\n\r\n🧴 Application: Dilute with water and apply as a foliar spray during early growth stages, ideally in the morning for better absorption. Reapply every 10-14 days to maintain consistent protection.', 22.00, 9, 'https://i.ibb.co/DYNrGWP/Silimax.png', 0.00, 22.00, 5, 1, 'CA1514', 'silimax', 4),
(11, 'YaraLiva NITRABOR', '🧪 Balanced Calcium and Boron Fertilizer for Healthy Roots and Fruits\r\nYaraLiva NITRABOR is specially formulated to support root strength and robust fruit set by supplying calcium and boron, both essential nutrients for tomatoes and other fruiting plants. It prevents disorders caused by calcium deficiencies, helping maintain fruit quality and plant structure.\r\n\r\n🔍 Uses: Prevents blossom end rot in tomatoes and enhances resistance against diseases like bacterial spot and fungal leaf spots, which are often exacerbated by nutrient imbalances.\r\n\r\n🧴 Application: Apply directly to soil or as a foliar spray. For best results, use at the start of flowering and continue during fruiting stages to ensure plants receive adequate calcium and boron.', 22.00, 9, 'https://i.ibb.co/7RDV6nQ/Yara-Liva-NITRABOR.png', 0.00, 22.00, 5, 1, 'DA1219', 'yaraliva-nitrabor', 4),
(13, 'YaraLiva TROPICOTE Pro', '🌱 Calcium-Rich Granular Fertilizer for Structural Integrity\r\nYaraLiva TROPICOTE Pro provides a steady supply of calcium, enhancing plant cell wall strength and improving overall growth. This reduces the likelihood of disease outbreaks by creating a physical barrier against pathogens.\r\n\r\n🔍 Uses: Effective in protecting against early blight and leaf mold, two common tomato diseases that thrive in weakened plant structures. Helps prevent disease spread by keeping plants structurally sound.\r\n\r\n🧴 Application: Spread granules around the plant base and water thoroughly to activate. Reapply periodically throughout the growing season, especially after heavy rainfall, to maintain consistent calcium levels in the soil.', 30.00, 20, 'https://i.ibb.co/RgPL46q/Yara-Liva-TROPICOTE-PRO.png', 0.00, 30.00, 5, 2, 'EF1219', 'yaraliva-tropicote-pro', 4),
(14, 'Canxi Kali Bo Zinc DN32\r\n', '🌾 Comprehensive Nutrient Solution for Flowering and Fruiting\r\nThis balanced blend of calcium, potassium, boron, and micronutrients boosts plant vigor, supporting flowering and fruit set. The addition of boron and potassium enhances fruit quality and increases disease resistance by improving nutrient flow within the plant.\r\n\r\n🔍 Uses: Reduces occurrences of bacterial and fungal leaf spots, like bacterial spot and target spot, by promoting overall plant health and resilience during peak growth phases.\r\n\r\n🧴 Application: Apply around the root zone or dissolve in water for foliar application. Best used during flowering and fruiting stages to maximize nutrient uptake and promote robust fruit development.', 30.00, 20, 'https://i.ibb.co/rddxsMp/Canxi-Kali-Bo-Kem-DN32.png', 0.00, 30.00, 18, 2, 'EF1219', 'canxi-kali-ko-zinc-dn32\r\n', 4),
(16, 'Fulvic 30', '🌱 High-Quality Humic and Fulvic Acid Fertilizer for Root Health\r\nFulvic 30 is a concentrated humic and fulvic acid blend that enhances root growth and nutrient absorption. It promotes better soil health and helps plants access nutrients more effectively, building stronger foliage and roots.\r\n\r\n🔍 Uses: Increases resistance to Septoria leaf spot, target spot, and pests like two-spotted spider mites. By supporting nutrient absorption, it helps plants build natural defenses against these threats.\r\n\r\n🧴 Application: Mix with water and apply as a foliar spray or soil drench. Regular applications during active growth stages optimize nutrient uptake and help prevent nutrient-related stress in plants.', 30.00, 20, 'https://i.ibb.co/jL99DjL/fulvic.png', 0.00, 30.00, 18, 2, 'EF1219', 'fulvic-30\r\n', 4),
(17, 'Siltron Cal Mag', '🌿 Calcium and Magnesium Supplement for Strong Foliage and Fruit\r\nSiltron Cal Mag provides essential calcium and magnesium, both critical for robust leaf and fruit development. Magnesium improves chlorophyll production, while calcium prevents leaf tip burn and improves overall leaf health.\r\n\r\n🔍 Uses: Reduces the risk of early blight, tomato yellow leaf curl virus, and two-spotted spider mites by promoting healthy, resilient foliage that can better withstand disease pressures.\r\n\r\n🧴 Application: Dilute with water and spray on leaves or apply to the root zone during early and mid-growth stages. Reapply as needed to ensure continued availability of these essential nutrients throughout the growing cycle.', 30.00, 20, 'https://i.ibb.co/rkDhP4B/Siltron-Cal-Mag.png', 0.00, 30.00, 18, 2, 'EF1219', 'siltron-cal-mag\r\n', 4),
(18, 'Potassium Sulphate (Ka-Silic)\r\n', '🛡️ Improved Plant Hardiness\r\nPotassium Sulphate (Ka-Silic) strengthens plant structure and aids in nutrient transport, helping plants manage stress and resist common diseases. This silicon-potassium blend is ideal for promoting healthy cell walls, enabling better defense against environmental stressors and disease.\r\n\r\n🔍 Uses: Effective against powdery mildew, leaf mold, and nutrient-deficiency diseases, supporting overall plant health and hardiness.\r\n\r\n🧴 Application: Dissolve in water and spray on leaves or apply directly to the root zone. Use throughout the growing season for consistent disease prevention.\r\n\r\n', 10.00, 35, 'https://i.ibb.co/jL5dtcj/kalisi.png', 0.00, 10.00, 6, 2, 'EF1219', 'potassium-sulphate-ka-silic\r\n', 4),
(19, 'Ka-Silic (Box)', '🌱 Nutrient-Rich Silicon and Potassium Fertilizer\r\nKa-Silic is designed to boost resilience by strengthening plant cell walls with a combination of silicon and potassium. This helps plants withstand environmental stress and minimizes the impact of nutrient deficiencies.\r\n\r\n🔍 Uses: Especially helpful in managing Septoria leaf spot, target spot, and early blight by fortifying plant tissues and improving nutrient uptake.\r\n\r\n🧴 Application: Dilute with water and apply as a foliar spray. Use during early growth stages and repeat every 14 days for optimal results.', 15.00, 50, 'https://i.ibb.co/3ffS33v/kalisilic.png', 0.00, 15.00, 6, 2, 'EF1219', 'ka-silic-box\r\n', 4),
(20, 'Ka-Silic (Packet)\r\n', '🌿 Silicon-Potassium Blend for Enhanced Growth\r\nThis silicon-enriched potassium fertilizer improves nutrient absorption and cell wall integrity, making plants more resistant to pathogens and stresses. It promotes better growth and helps prevent nutrient-related deficiencies.\r\n\r\n🔍 Uses: Provides protection against diseases like tomato mosaic virus and two-spotted spider mites by strengthening plant immunity.\r\n\r\n🧴 Application: Mix with water for foliar spray or apply to the soil around the root zone. Repeat applications every two weeks to maintain resilience.', 20.00, 20, 'https://i.ibb.co/ZWHVMxV/Ka-Silic.png', 0.00, 20.00, 6, 2, 'EF1219', 'ka-silic-packet\r\n', 4),
(21, 'SilicaPower (Large)\r\n', '🧪 Advanced Silica Biostimulant for All Crops\r\nSilicaPower is a high-concentration silica solution designed to increase plant resilience and growth. It supports root and stem strength, improves nutrient uptake, and helps plants handle stress better.\r\n\r\n🔍 Uses: Protects against powdery mildew, early blight, and leaf mold. Ideal for use as a preventative measure in stressed plants.\r\n\r\n🧴 Application: Shake well, dilute with water, and apply as a foliar spray. Recommended to use every 7-10 days during peak growth for consistent protection.', 30.00, 20, 'https://i.ibb.co/bQGdnnh/Silica-Power-big.png', 0.00, 30.00, 6, 1, 'EF1219', 'silicapower-large\r\n', 4),
(22, 'SilicaPower (Small)\r\n', '🌾 Silica Supplement for Stronger, Healthier Plants\r\nA smaller, convenient bottle of SilicaPower that delivers the same concentrated silica to boost plant health. It enhances cell wall strength, improves drought resistance, and supports overall plant vitality.\r\n\r\n🔍 Uses: Helps prevent common issues like bacterial spot and powdery mildew by promoting tougher plant tissues.\r\n\r\n🧴 Application: Shake well and mix with water for foliar application. Spray thoroughly on plant surfaces every 10 days for best results, especially during vulnerable growth stages.', 10.00, 20, 'https://i.ibb.co/QDp5wfp/Silica-Power-small.png', 0.00, 10.00, 6, 1, 'EF1219', 'silicapower-small\r\n', 4),
(23, 'Unikey Round-Granular NPK 13-30-18 + TE', '🧪 Balanced Nutritional Support for Fruiting Plants\r\nUnikey Round-Granular NPK 13-30-18 + TE is designed to optimize plant growth by providing essential nutrients during critical growth phases. Its formulation helps to enhance root strength and improve fruit set, making it ideal for tomatoes and other fruiting crops.\r\n\r\n🔍 Uses: Effective against early blight, late blight, and bacterial spot. It helps prevent disorders related to calcium deficiency and promotes robust plant health.\r\n\r\n🧴 Application: Apply directly to the soil or as a foliar spray. For best results, use during the flowering stage and continue through fruiting to ensure adequate nutrient supply.', 30.00, 20, 'https://i.ibb.co/4jDDZPR/CSV-Agrolife-NPK-13-30-18-TE.png', 0.00, 30.00, 2, 2, 'EF1219', 'unikey-round-granular-npk-13-30-18-te', 1),
(24, 'NPK 15-5-25 + TE', '🧪 Premium NPK Fertilizer for Optimal Growth\r\nNPK 15-5-25 + TE is a high-performance fertilizer formulated to support overall plant development. It provides a balanced mix of nutrients essential for vigorous growth, particularly in high-yielding crops.\r\n🔍 Uses: Prevents target spot and enhances disease resistance, aiding plants in overcoming challenges posed by environmental stressors and nutrient imbalances.\r\n\r\n🧴 Application: Mix with water and apply bi-weekly to enhance nutrient uptake during critical growth phases.', 25.00, 20, 'https://i.ibb.co/pJ03jVK/npk.png', 0.00, 25.00, 2, 2, 'EF1217', 'npk-15-5-25-te', 1),
(25, 'NPK 17-17-17', '🧪 Versatile NPK Fertilizer for All Crops\r\nNPK 17-17-17 is designed to deliver a well-rounded nutrient profile, ensuring balanced growth across various plant types. Its uniform composition promotes healthy foliage and fruitful yields.\r\n\r\n🔍 Uses: Supports resistance against leaf mold and powdery mildew while fostering robust growth during all stages of development.\r\n\r\n🧴 Application: Spread around the base of plants or dissolve in water for effective application. Best used during key growth stages.\r\n\r\n', 25.00, 20, 'https://i.ibb.co/BVmz2Sy/NPK-17-17-17-Baconco.png', 0.00, 25.00, 2, 2, 'EF1217', 'npk-17-17-17', 1),
(26, ' YaraMila UNIK 16', '🧪 Specialized NPK Fertilizer for Enhanced Plant Health\r\nYaraMila UNIK 16 provides a comprehensive nutrient supply that helps optimize plant performance, particularly under stress conditions. Its unique formulation promotes root development and enhances nutrient absorption.\r\n\r\n🔍 Uses: Helps combat viral diseases such as tomato yellow leaf curl virus and tomato mosaic virus, ensuring healthier plants.\r\n\r\n🧴 Application: Dissolve in water or apply granules directly to the soil. Recommended during early growth and flowering stages for maximum effect.\r\n\r\n', 29.00, 100, 'https://i.ibb.co/ygHL5yH/Yara-Mila-UNIK-16.png', 0.00, 29.00, 3, 2, 'EF1217', 'yaramil-unik-16', 1),
(27, 'Neem Bliss Pure Neem Oil (16 oz)', '🧪 Neem Bliss Pure Neem Oil is an organic solution that effectively combats a range of pests while promoting plant health.\r\n\r\n🔍 Uses: Helps manage pests such as spider mites, aphids, and whiteflies, while preventing diseases like powdery mildew and bacterial spot.\r\n\r\n🧴 Application: Dilute in water for foliar application or apply as a soil drench. Best used during active growth stages to ensure maximum protection and nutrient absorption.', 29.00, 10, 'https://i.ibb.co/4shXYcx/Neem-Bliss-Pure-Neem-Oil.png', 0.00, 29.00, 9, 2, 'EF1289', 'neem-bliss-pure-neem-oil-16oz', 7),
(28, 'Neem Bliss Pure Neem Oil (8 oz)', '🧪 The 8 oz Neem Bliss Pure Neem Oil is designed for efficient pest control and enhancing plant health.\r\n\r\n🔍 Uses: Addresses issues with aphids, whiteflies, and thrips, while preventing viral diseases such as tomato yellow leaf curl virus.\r\n\r\n🧴 Application: Mix with water and spray on affected areas or apply directly to the soil. Recommended during active growth for optimal results.', 29.00, 10, 'https://i.ibb.co/cyrzGK0/Neem-Bliss-Pure-Neem-Oil-small-size.png', 0.00, 29.00, 9, 2, 'EF1289', 'neem-bliss-pure-neem-oil-8oz', 7),
(29, 'AT Vaccino CAN', '🧪 AT Vaccino CAN is formulated to strengthen plant immunity against various diseases.\r\n\r\n🔍 Uses: Helps prevent late blight, tomato mosaic virus, and improves resilience against environmental stressors.\r\n\r\n🧴 Application: Apply as a foliar treatment during critical growth phases, especially when plants are vulnerable to diseases.', 29.00, 10, 'https://i.ibb.co/5RsbzfT/AT-Vaccino-CAN.png', 0.00, 29.00, 19, 2, 'EF12899', ' at-vaccino-can', 7),
(30, 'Reasgant 3.6EC', '🧪 Reasgant 3.6EC is a potent insecticide and fungicide that protects crops from pests and diseases.\r\n\r\n🔍 Uses: Targets pests like aphids and spider mites while preventing bacterial spot and powdery mildew.\r\n\r\n🧴 Application: Use as a foliar spray during high pest activity periods, particularly during flowering and fruiting stages.', 29.00, 10, 'https://i.ibb.co/K5L9mZ8/Reasgant-3-6-EC.png', 0.00, 29.00, 19, 2, 'EF12899', 'reasgant-3-6ec', 7),
(31, 'BIO CSV', '🧪 BIO-CSV acts as a bio-stimulant that enhances nutrient uptake and plant vigor.\r\n\r\n🔍 Uses: Prevents early blight, target spot, and enhances resistance against various pathogens.\r\n\r\n🧴 Application: Apply as a soil drench or foliar spray during active growth for optimal nutrient absorption and disease prevention.', 29.00, 10, 'https://i.ibb.co/7bPsHvp/BIO-CSV.png', 0.00, 29.00, 8, 2, 'EF12899', 'bio-csv', 7),
(32, 'BioHumic NP CSV', '🧪 BioHumic-NP-CSV enriches soil health and improves nutrient availability.\r\n\r\n🔍 Uses: Supports plant growth while preventing diseases like powdery mildew.\r\n\r\n🧴 Application: Mix with water for a soil drench or foliar application, especially during critical growth phases.', 29.00, 10, 'https://i.ibb.co/py72S7t/biohumic.png', 0.00, 29.00, 8, 2, 'EF12899', 'biohumic-np-csv', 7),
(33, 'Calcium Sulphate (Gypsum)', '🧪 Essential Soil Conditioner for Healthy Plant Growth\r\nCalcium Sulphate enhances soil structure and helps in nutrient absorption, promoting healthier root development. It adds vital calcium to the soil, which is essential for strong plant growth and resilience against various diseases.\r\n\r\n🔍 Uses: Effective against early blight, late blight, bacterial spot, and other nutrient-related disorders.\r\n\r\n🧴 Application: Mix with soil or use as a foliar spray to boost calcium levels. Ideal for use during planting and early growth stages.\r\n\r\n', 29.00, 10, 'https://i.ibb.co/1qTj9HT/Calcium-Sulphate-Gypsum-100g.png', 0.00, 29.00, 13, 2, 'EF15688', 'calcium-sulphate-gypsum', 11),
(34, 'Hyper Amino Turkey', '🧪 Advanced Amino Acid Fertilizer for Optimal Growth\r\nHyper Amino Turkey provides a concentrated blend of amino acids that support plant metabolism and enhance nutrient uptake. This product is designed to improve plant resilience and overall health.\r\n\r\n🔍 Uses: Helps combat diseases such as target spot, powdery mildew, and others related to nutrient deficiencies.\r\n\r\n🧴 Application: Dilute with water and apply as a foliar spray or soil drench. Best used during stress periods or when plants are establishing roots.', 29.00, 10, 'https://i.ibb.co/VH75x8v/Hyper-Amino-Turkey.png', 0.00, 29.00, 13, 2, 'EF12890', 'hyper-amino-turkey', 11),
(35, 'Amino Root', '🧪 Root Stimulator for Enhanced Plant Development\r\nAmino Root is specially formulated to stimulate root growth and improve nutrient absorption. Its unique blend of organic compounds supports robust plant development and health.\r\n\r\n🔍 Uses: Assists in preventing diseases like two-spotted spider mites and enhances resistance against environmental stress.\r\n\r\n🧴 Application: Dilute in water and apply directly to the soil or as a foliar spray. Use during planting and throughout the growth cycle for optimal results.', 29.00, 10, 'https://i.ibb.co/BP9drpm/root-amino.png', 0.00, 29.00, 13, 2, 'EF12892', 'amino-root', 11),
(36, 'Amino Root Liquid', '🧪 Liquid Fertilizer for Enhanced Root Growth\r\nAmino Root Liquid delivers essential nutrients directly to the root zone, promoting vigorous root development and plant resilience.\r\n\r\n🔍 Uses: Effective against root rot and enhances resistance to common plant diseases.\r\n\r\n🧴 Application: Mix with water and apply as a soil drench. Use during early growth stages and throughout the growing season for best results.', 49.00, 10, 'https://i.ibb.co/HFbf1HW/root-amino-bottle.png', 0.00, 49.00, 13, 2, 'EF12893', 'amino-root-liquid', 11),
(37, 'Potassium Sulphate\r\n', '🧪 High-Performance Potassium Source for Plant Health\r\nPotassium Sulphate is an essential nutrient source that enhances flowering and fruiting in crops. It improves plant resistance to drought and disease by strengthening cell walls.\r\n\r\n🔍 Uses: Supports treatment against diseases like tomato yellow leaf curl virus and enhances overall plant vigor.\r\n\r\n🧴 Application: Dissolve in water for irrigation or apply granules directly to the soil. Recommended during the flowering and fruiting stages.', 39.00, 15, 'https://i.ibb.co/HTRDL4k/Potassium-Sulphate-2.png', 0.00, 39.00, 12, 2, 'EF8237', 'potassium-sulphate', 11),
(38, 'Potassium Sulphate Soluble', '🧪 Premium Soluble Fertilizer for Nutrient Delivery\r\nPotassium Sulphate Soluble is designed for efficient nutrient delivery in irrigation systems, promoting healthy plant growth and fruit quality.\r\n\r\n🔍 Uses: Helps combat diseases like powdery mildew and promotes stronger, healthier plants.\r\n\r\n🧴 Application: Dissolve in water and use in fertigation systems or as a soil treatment. Best applied during critical growth phases.', 49.00, 992, 'https://i.ibb.co/SVWTsms/Potassium-Sulphate.png', 0.00, 49.00, 12, 1, 'EF8239', 'potassium-sulphate-soluble', 11);

--
-- Bẫy `product`
--
DELIMITER $$
CREATE TRIGGER `before_product_insert` BEFORE INSERT ON `product` FOR EACH ROW BEGIN
    SET NEW.final_price = NEW.price - (NEW.price * NEW.discount / 100);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ratings`
--

CREATE TABLE `ratings` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `review` text,
  `rating_date` date NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `ratings`
--

INSERT INTO `ratings` (`id`, `product_id`, `rating`, `review`, `rating_date`, `user_id`) VALUES
(1, 1, 4, 'Good product', '2024-07-01', 1),
(2, 1, 5, 'Excellent product', '2024-07-02', 1),
(3, 2, 3, 'Average product', '2024-07-01', 1),
(4, 3, 5, 'Great product', '2024-07-03', 1),
(5, 4, 2, 'Not satisfied', '2024-07-04', 1),
(6, 1, 4, 'Very good product', '2024-07-05', 1),
(7, 2, 4, 'Good value for money', '2024-07-05', 1),
(10, 2, 5, 'Nice', '2024-09-04', 5),
(11, 1, 5, 'Very Good', '2024-11-03', 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sales`
--

CREATE TABLE `sales` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `sale_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sales`
--

INSERT INTO `sales` (`id`, `product_id`, `quantity`, `sale_date`) VALUES
(1, 1, 10, '2024-07-01'),
(2, 1, 5, '2024-07-02'),
(3, 2, 8, '2024-07-01'),
(4, 3, 15, '2024-07-03'),
(5, 4, 3, '2024-07-04'),
(6, 1, 2, '2024-07-05'),
(7, 2, 6, '2024-07-05');

--
-- Bẫy `sales`
--
DELIMITER $$
CREATE TRIGGER `after_sales_insert` AFTER INSERT ON `sales` FOR EACH ROW BEGIN
    UPDATE product
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `phone`, `address`, `bio`) VALUES
(1, 'Naim', 'naim.themepure@gmail.com', '$2b$10$8pVu7JCPl7X0TwfkTEvrlOwQrixO2HySHbdtQCyXM0zX0CnyX1LtW', 'user', '2024-08-26 05:40:59', '0168999222', 'New York', 'Hi, my name is Naim. I am from New York.'),
(5, 'Naim Ahmed', 'na2359034@gmail.com', '$2b$10$hkHqNK6RqwaMO6tg/25Xw.4lp4gZKNLE4BbGlxPM6W/lvYfDlq98u', 'user', '2024-08-26 09:31:31', '01627815507', '3304 Randall Drive', 'Hi there, this is my bio...'),
(6, 'naim', 'naim.themepure2@gmail.com', '$2b$10$988u/GdU9nnIC65eLmJqDuuf52gI0N1J8j40AxjPiqzo9/pPiXHTa', 'user', '2024-08-26 10:24:06', NULL, NULL, NULL),
(7, 'Naim', 'naim.themepure3@gmail.com', '$2b$10$NcSCsAfLiE7I0Tum5TLQx.lyCQo0hQHb2SWCfkAUZvuOWVfN7aBGu', 'user', '2024-08-27 09:21:21', '0988555231', '', ''),
(8, 'Admin', 'admin@gmail.com', '$2b$10$p357wmZWRxiXXAYD.3qtjeJuLivBlQIHf0tjwS/6RrpMz/fEOQERC', 'admin', '2024-09-10 08:57:19', '0396299092', '', ''),
(9, 'Test', 'test@gmail.com', '$2b$10$7oXJUDW2hMwALb28B35pYu7nf3wa/XgmM/McR38nh2RGXSZr5e22y', 'user', '2024-10-15 06:11:10', '0986820933', '', ''),
(11, 'user1', 'user1@gmail.com', '$2b$10$f5muXY/x7UeOpm3ojzj89e0qmMfuOGmn9kDcycIjqsaBLPMB/d9KG', 'user', '2024-11-04 14:57:27', NULL, NULL, NULL),
(12, 'Linh', 'linh@gmail.com', '$2b$10$28Vi6hBPjqP8vaQDq5nMMuoGhe5N5QIBQ36jwjUCVyNmbOqzYnEeC', 'user', '2024-11-06 06:13:55', '0912822249', 'Ba Dinh, Ha Noi', 'Hello, my name is Linh Nguyen.'),
(13, 'Minh Duong', 'minhduong@gmail.com', '$2b$10$N.nmEmileNxFP/4OuJU8gecNNoDRYR79nOclWrhDmVT4XbiWO6wgC', 'user', '2024-11-18 07:45:39', NULL, NULL, NULL),
(14, 'Khanh Vy', 'khanhvy@gmail.com', '$2b$10$yHdQe1xvS/5/NwRFhmqKtuBbWnYOTpKP9vPBCdWaA5wnn9VPrkDCG', 'user', '2024-11-18 07:46:14', NULL, NULL, NULL),
(15, 'Linh Đan', 'linhdan@gmail.com', '$2b$10$isWfk9CXroUy7uxo02hRium6nR47nTPcqzUnhszi21tAlznBLk3UC', 'user', '2024-11-18 07:46:52', NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `parentId` (`parentId`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `disease_products`
--
ALTER TABLE `disease_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disease_id` (`disease_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `prediction_history`
--
ALTER TABLE `prediction_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `disease_id` (`disease_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `fk_parent_category` (`parent_category_id`);

--
-- Chỉ mục cho bảng `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `disease_products`
--
ALTER TABLE `disease_products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `prediction_history`
--
ALTER TABLE `prediction_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `disease_products`
--
ALTER TABLE `disease_products`
  ADD CONSTRAINT `disease_products_ibfk_1` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `disease_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `prediction_history`
--
ALTER TABLE `prediction_history`
  ADD CONSTRAINT `prediction_history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `prediction_history_ibfk_3` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_parent_category` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

--
-- Các ràng buộc cho bảng `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
