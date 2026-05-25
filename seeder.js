const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const adminUser = '69f1edae23af6851be13252d'; // User 'sasa'

const categoryData = {
  electronics: [
    { name: 'Aura Pro Headphones', price: 299, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { name: 'Quantum Smart Watch', price: 449, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
    { name: 'Prism 4K Camera', price: 899, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32' },
    { name: 'Vortex BT Speaker', price: 159, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d' },
    { name: 'NovaPad Pro Tablet', price: 649, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0' },
    { name: 'Zenith Wireless Buds', price: 129, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
    { name: 'KeyMech RGB Keyboard', price: 149, img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae' },
    { name: 'UltraWide Curved Monitor', price: 499, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf' },
    { name: 'Smart Home Hub', price: 79, img: 'https://images.unsplash.com/photo-1558002038-1055907df827' },
    { name: 'AeroStand Laptop Mount', price: 59, img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c' },
    { name: 'Vision VR Headset', price: 399, img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac' },
    { name: 'Nano Drone X', price: 199, img: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9' },
    { name: 'Core i9 Gaming PC', price: 2499, img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b' },
    { name: 'Thunderbolt Dock', price: 129, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704' },
    { name: 'ErgoMouse Pro', price: 89, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46' }
  ],
  fashion: [
    { name: 'Luxe Trench Coat', price: 349, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b' },
    { name: 'Silk Evening Dress', price: 229, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8' },
    { name: 'Classic Oxford Shirt', price: 89, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c' },
    { name: 'Slim Fit Chinos', price: 119, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a' },
    { name: 'Cashmere Knit Sweater', price: 189, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105' },
    { name: 'Premium Leather Belt', price: 69, img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad' },
    { name: 'Floral Summer Maxi', price: 79, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1' },
    { name: 'Vintage Denim Jacket', price: 129, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d' },
    { name: 'Chelsea Suede Boots', price: 159, img: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76' },
    { name: 'Urban Explorer Pack', price: 89, img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { name: 'Retro Aviator Shades', price: 59, img: 'https://images.unsplash.com/photo-1577803645773-f96470509666' },
    { name: 'Soft Wool Scarf', price: 44, img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9' },
    { name: 'Minimalist Wristwatch', price: 199, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314' },
    { name: 'Velvet Blazer', price: 279, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35' },
    { name: 'Tailored Trouser', price: 149, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1' }
  ],
  kitchen: [
    { name: 'Zenith Espresso Maker', price: 899, img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6' },
    { name: 'Cast Iron Dutch Oven', price: 249, img: 'https://images.unsplash.com/photo-1585515320310-259814833e62' },
    { name: 'Marble Cutting Board', price: 79, img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d' },
    { name: 'Professional Knife Set', price: 349, img: 'https://images.unsplash.com/photo-1593618998160-e34014e67546' },
    { name: 'Smart Air Fryer XL', price: 199, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7' },
    { name: 'Herb Garden Planter', price: 49, img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f' },
    { name: 'Non-Stick Frying Pan', price: 59, img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a' },
    { name: 'Digital Kitchen Scale', price: 34, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3' },
    { name: 'French Press Coffee', price: 44, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' },
    { name: 'Silicone Utensil Set', price: 39, img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c' },
    { name: 'Steel Magnetic Strip', price: 29, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2' },
    { name: 'Glass Electric Kettle', price: 49, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3' },
    { name: 'Copper Core Pot', price: 179, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7' },
    { name: 'Bamboo Steamer', price: 45, img: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8' },
    { name: 'Slow Cooker Elite', price: 129, img: 'https://images.unsplash.com/photo-1551028150-64b9f398f678' }
  ],
  beauty: [
    { name: 'Glow Serum 30ml', price: 89, img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc' },
    { name: 'Rose Gold Palette', price: 64, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796' },
    { name: 'Hyaluronic Moisturiser', price: 54, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883' },
    { name: 'Velvet Matte Lipstick', price: 29, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348' },
    { name: 'Jade Face Roller', price: 39, img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
    { name: 'Luxury Perfume Set', price: 149, img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f' },
    { name: 'Vitamin C Face Oil', price: 49, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
    { name: 'Detox Clay Mask', price: 34, img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273' },
    { name: 'Radiant Foundation', price: 44, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e' },
    { name: 'Daily Sun Protect', price: 39, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883' },
    { name: 'Elite Makeup Brushes', price: 79, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e' },
    { name: 'Silk Sleep Mask', price: 24, img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15' },
    { name: 'Lavender Bath Salts', price: 29, img: 'https://images.unsplash.com/photo-1531300185372-b7cbe2eddf0b' },
    { name: 'Charcoal Face Scrub', price: 19, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883' },
    { name: 'Organic Body Butter', price: 34, img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc' }
  ],
  health: [
    { name: 'Adjustable Dumbbells', price: 299, img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5' },
    { name: 'Yoga Pro Mat', price: 89, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
    { name: 'Smart Fitness Band', price: 149, img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6' },
    { name: 'Whey Protein Blend', price: 69, img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d' },
    { name: 'Foam Roller Set', price: 44, img: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e' },
    { name: 'Meditation Cushion', price: 59, img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773' },
    { name: 'Resistance Band Kit', price: 39, img: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c' },
    { name: 'Spiky Massage Ball', price: 19, img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a' },
    { name: 'Protein Shaker Pro', price: 24, img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d' },
    { name: 'Body Analyst Scale', price: 89, img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155' },
    { name: 'Pro Massage Gun', price: 199, img: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9' },
    { name: 'Ergo Back Support', price: 54, img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd' },
    { name: 'Multivitamin Elite', price: 45, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843' },
    { name: 'Therapeutic Heat Pad', price: 39, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843' },
    { name: 'Jump Rope Digital', price: 29, img: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b' }
  ],
  sports: [
    { name: 'Pro Running Shoes', price: 189, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { name: 'Carbon Fibre Bike', price: 2499, img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e' },
    { name: 'Official Match Ball', price: 79, img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d' },
    { name: 'Swim Goggles Pro', price: 49, img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635' },
    { name: 'Gym Gloves Flex', price: 34, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2' },
    { name: 'Sports Water Bottle', price: 39, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8' },
    { name: 'Elite Tennis Racket', price: 149, img: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64' },
    { name: 'Compact Yoga Block', price: 19, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
    { name: 'Pro Swim Cap', price: 14, img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206' },
    { name: 'Trek Carbon Poles', price: 89, img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b' },
    { name: 'Elite Duffel Bag', price: 69, img: 'https://images.unsplash.com/photo-1510017803434-a899398421b3' },
    { name: 'Pro Cycle Helmet', price: 129, img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b' },
    { name: 'Ski Pro Goggles', price: 159, img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206' },
    { name: 'Basketball Pro Hoop', price: 299, img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf' },
    { name: 'Grip Tape Premium', price: 12, img: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030' }
  ],
  grocery: [
    { name: 'Organic Honey 500g', price: 14, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38' },
    { name: 'Premium Arabica Coffee', price: 19, img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e' },
    { name: 'Extra Virgin Olive Oil', price: 24, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5' },
    { name: 'Artisan Sourdough', price: 6, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
    { name: 'Himalayan Pink Salt', price: 8, img: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da' },
    { name: 'Organic Green Tea', price: 12, img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12' },
    { name: 'Fresh Avocado Pack', price: 9, img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578' },
    { name: 'Red Quinoa 1kg', price: 15, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c' },
    { name: 'Dark Chocolate 85%', price: 5, img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919' },
    { name: 'Pure Maple Syrup', price: 18, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38' },
    { name: 'Roasted Almonds 200g', price: 7, img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12' },
    { name: 'Cold Pressed Juice', price: 4, img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b' },
    { name: 'Organic Chia Seeds', price: 9, img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12' },
    { name: 'Premium Greek Yogurt', price: 5, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777' },
    { name: 'Wild Berries Mix', price: 8, img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2' }
  ],
  decor: [
    { name: 'Minimalist Floor Lamp', price: 189, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15' },
    { name: 'Abstract Canvas Art', price: 299, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5' },
    { name: 'Ceramic Vase Set', price: 79, img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427' },
    { name: 'Velvet Throw Pillow', price: 49, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2' },
    { name: 'Handwoven Jute Rug', price: 249, img: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311' },
    { name: 'Scented Soy Candle', price: 29, img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59' },
    { name: 'Geometric Wall Shelf', price: 89, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c' },
    { name: 'Vintage Wall Clock', price: 119, img: 'https://images.unsplash.com/photo-1509130298739-651801c76e96' },
    { name: 'Indoor Olive Tree', price: 159, img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a' },
    { name: 'Brass Mirror Frame', price: 199, img: 'https://images.unsplash.com/photo-1618220179428-22790b461013' },
    { name: 'Knitted Cotton Pouf', price: 129, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
    { name: 'Agate Bookends', price: 69, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
    { name: 'Industrial Desk Lamp', price: 89, img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c' },
    { name: 'Macrame Wall Hanging', price: 55, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5' },
    { name: 'Terrarium Glass Kit', price: 45, img: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14' }
  ],
  pets: [
    { name: 'Orthopedic Dog Bed', price: 129, img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a' },
    { name: 'Interactive Cat Toy', price: 34, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' },
    { name: 'Grain-Free Dog Food', price: 59, img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c' },
    { name: 'Modern Cat Tower', price: 189, img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f' },
    { name: 'Automatic Pet Feeder', price: 149, img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a' },
    { name: 'Gentle Grooming Kit', price: 44, img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7' },
    { name: 'Leather Dog Leash', price: 39, img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a' },
    { name: 'Plush Squeaky Toy', price: 14, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97' },
    { name: 'Slow Feeder Bowl', price: 19, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e' },
    { name: 'Portable Water Bottle', price: 24, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee' },
    { name: 'CBD Pet Treats', price: 49, img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1' },
    { name: 'Washable Pet Mat', price: 34, img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a' },
    { name: 'Pet Carrier Elite', price: 89, img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7' },
    { name: 'Dog Raincoat X', price: 29, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee' },
    { name: 'Catnip Mist Spray', price: 15, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' }
  ]
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    const productsToInsert = [];

    for (const category in categoryData) {
      categoryData[category].forEach((p, index) => {
        productsToInsert.push({
          user: adminUser,
          name: p.name,
          image: `${p.img}?auto=format&fit=crop&w=800&q=80`,
          brand: 'Premium',
          category: category,
          description: `Experience the best of ${category} with our ${p.name}. High quality and premium design.`,
          price: p.price,
          countInStock: Math.floor(Math.random() * 20) + 1,
          rating: 4 + Math.random(),
          numReviews: Math.floor(Math.random() * 500) + 50,
        });
      });
    }

    await Product.insertMany(productsToInsert);

    console.log(`Data Imported! Total products: ${productsToInsert.length}`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
