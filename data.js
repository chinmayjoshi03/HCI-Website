const PRODUCTS = [
    {
        id: 1,
        name: "Organic Strawberries",
        category: "Fruits",
        description: "Sweet and juicy organic strawberries, freshly picked from local farms. Perfect for desserts or snacking.",
        price: 4.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1591286788224-dd9b325b3e21?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1591286788224-dd9b325b3e21?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1613325431303-de18cc59d0e9?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Green Valley Farm",
        rating: 5
    },
    {
        id: 2,
        name: "Free-Range Eggs",
        category: "Dairy & Eggs",
        description: "Farm-fresh eggs from free-range chickens. Rich in flavor and nutrients.",
        price: 6.00,
        unit: "dozen",
        image: "https://images.unsplash.com/photo-1598965675045-45c5b991ad35?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1598965675045-45c5b991ad35?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587486937410-77b17d4c0636?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Happy Hens Farm",
        rating: 5
    },
    {
        id: 3,
        name: "Artisan Bread",
        category: "Baked Goods",
        description: "Handcrafted sourdough bread, baked fresh daily with organic flour.",
        price: 5.50,
        unit: "loaf",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Artisan Bakery",
        rating: 5
    },
    {
        id: 4,
        name: "Fresh Milk",
        category: "Dairy & Eggs",
        description: "Creamy whole milk from grass-fed cows. Delivered fresh daily.",
        price: 3.50,
        unit: "gallon",
        image: "https://images.unsplash.com/photo-1620189507195-68309c04c4d5?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1620189507195-68309c04c4d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Meadow Dairy",
        rating: 5
    },
    {
        id: 5,
        name: "Heirloom Tomatoes",
        category: "Vegetables",
        description: "These heirloom tomatoes are known for their rich flavor and unique shapes. Grown with care and without pesticides.",
        price: 5.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1561155708-935d88891439?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1561155708-935d88891439?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594895244399-52a7879b69b5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1607305387299-a8d0be429a1c?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Green Acres Farm",
        rating: 5
    },
    {
        id: 6,
        name: "Organic Cucumbers",
        category: "Vegetables",
        description: "Crisp and refreshing organic cucumbers. Perfect for salads and snacking.",
        price: 2.49,
        unit: "each",
        image: "https://images.unsplash.com/photo-1449339132029-7e4c30663158?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1449339332196-59c10163579e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Fresh Fields Farm",
        rating: 4
    },
    {
        id: 7,
        name: "Fresh Basil",
        category: "Herbs & Spices",
        description: "Aromatic and flavorful fresh basil. Ideal for Italian dishes and pesto.",
        price: 3.00,
        unit: "bunch",
        image: "https://images.unsplash.com/photo-1629156228399-c8847553b490?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1629156228399-c8847553b490?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Herb Haven",
        rating: 5
    },
    {
        id: 8,
        name: "Organic Blueberries",
        category: "Fruits",
        description: "Plump and sweet organic blueberries packed with antioxidants.",
        price: 6.99,
        unit: "pint",
        image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Berry Best Farm",
        rating: 5
    },
    {
        id: 9,
        name: "Grass-Fed Beef",
        category: "Meat & Poultry",
        description: "Premium grass-fed beef, raised humanely without hormones or antibiotics.",
        price: 12.99,
        unit: "lb",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Prairie Pastures Ranch",
        rating: 5
    },
    {
        id: 10,
        name: "Honey Jar",
        category: "Honey & Preserves",
        description: "Pure raw honey from local bees. Unfiltered and unpasteurized.",
        price: 8.99,
        unit: "jar",
        image: "https://images.unsplash.com/photo-1558642158-43f155254420?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558642158-43f155254420?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587049352846-4a222e784538?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Golden Hive Apiary",
        rating: 5
    },
    {
        id: 11,
        name: "Fresh Spinach",
        category: "Vegetables",
        description: "Tender baby spinach leaves, perfect for salads or cooking.",
        price: 3.99,
        unit: "bunch",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "Leafy Greens Co.",
        rating: 4
    },
    {
        id: 12,
        name: "Sourdough Croissants",
        category: "Baked Goods",
        description: "Buttery, flaky croissants made with sourdough starter.",
        price: 4.50,
        unit: "pack of 4",
        image: "https://images.unsplash.com/photo-1584323214461-98565a448450?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1584323214461-98565a448450?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=800&auto=format&fit=crop"
        ],
        farmer: "French Corner Bakery",
        rating: 5
    }
];

const CATEGORIES = [
    {
        name: "Fruits",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Vegetables",
        image: "https://images.unsplash.com/photo-1597362925123-518d3d5895aa?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Dairy & Eggs",
        image: "https://images.unsplash.com/photo-1628088062854-35f19013ce84?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Meat & Poultry",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Baked Goods",
        image: "https://images.unsplash.com/photo-1584323214461-98565a448450?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Honey & Preserves",
        image: "https://images.unsplash.com/photo-1558642158-43f155254420?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Herbs & Spices",
        image: "https://images.unsplash.com/photo-1599527932313-290d293d19a2?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Beverages",
        image: "https://images.unsplash.com/photo-1621610260393-780c62a880e3?q=80&w=800&auto=format&fit=crop"
    }
];
