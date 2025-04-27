const cat = {
  oralCare: "oralCare",
  babyCare: "babyCare",
  beverages: "beverages",
  cleaningDisinfectant: "cleaning & disinfectant",
  hairCare: "hairCare",
  homeCare: "homeCare",
  kitchen: "kitchen",
  personalCare: "personalCare",
  skinCare: "skinCare",
  stationary: "stationary",
};
export const categories = [
  {
    _id: 1001,
    name: "Oral Care",
    image: "https://i.ibb.co/kM0FR2h/cat-Tv-Audio.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "oralCare",
  },
  {
    _id: 1002,
    name: "Baby Care",
    image: "https://i.ibb.co/71hR65V/catTvBox.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "babyCare",
  },
  {
    _id: 1003,
    name: "Beverages",
    image: "https://i.ibb.co/0V0g6Gz/cat-Powertool.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "beverages",
  },
  {
    _id: 1004,
    name: "Cleaning & Disinfectant",
    image: "https://i.ibb.co/zST2Xdp/cat-Headphone.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "cleaningDisinfectant",
  },
  {
    _id: 1005,
    name: "Hair Care",
    image: "https://i.ibb.co/jgk59BL/catPhone.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "hairCare",
  },
  {
    _id: 1006,
    name: "Home Care",
    image: "https://i.ibb.co/B4NKfBZ/cat-Smart-Watch.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "homeCare",
  },

  {
    _id: 1008,
    name: "Personal Care",
    image: "https://i.ibb.co/xjpdQrr/cat-Robot-Clean.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "personalCare",
  },
  {
    _id: 1009,
    name: "Skin Care",
    image: "https://i.ibb.co/HdNVLzh/cat-Sport-Watch.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "skinCare",
  },
  {
    _id: 1010,
    name: "Stationary",
    image: "https://i.ibb.co/qCzTx4F/cat-Tablet.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "stationary",
  },

  {
    _id: 1013,
    name: "Kitchen & Food",
    image: "https://i.ibb.co/Kj8wXMz/food-category.jpg",
    description: "Delicious food items including fried rice, noodles, and various meat dishes.",
    _base: "kitchen",
    isKitchenPage: true,
  },
];

export const highlightsProducts = [
  {
    _id: 3001,
    name: "Pet Supplies",
    title: "food, treats, toys, and more",
    buttonTitle: "Shop now",
    image: "./assets/petbanner.webp",
    _base: "/product",
    color: "#000000",
  },
  {
    _id: 3002,
    name: "Baby Care",
    title: "Get baby care essentials in minutes",
    buttonTitle: "Shop now",
    image: "https://i.ibb.co/bLRNKGq/highlights-Two.webp",
    _base: "/category/cellPhones",
    color: "#000000",
  },
  {
    _id: 3003,
    name: "Pharmacy at your doorstep",
    title: "cough syrup, pain relief sprays, and more",
    buttonTitle: "Shop Now",
    image: "https://i.ibb.co/svWYstT/highlights-Three.webp",
    _base: "/product",
    color: "#000000",
  },
];

export const blogsData = [
  // {
  //   _id: 4001,
  //   image: "https://i.ibb.co/XbQf5HS/blogOne.webp",
  //   title: "iPhone 15 rear camera design will be available",
  //   _base: "Technology",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  // },
  // {
  //   _id: 4002,
  //   image: "https://i.ibb.co/wzNpcwp/blogTwo.webp",
  //   title: "Setup your surround sound speaker",
  //   _base: "Samrt thing",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  // },
  // {
  //   _id: 4003,
  //   image: "https://i.ibb.co/prdZ3s8/blog-Three.webp",
  //   title: "Hook up a receiver for your home theater",
  //   _base: "Life style",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  // },
];

export const products = [
  {
    _id: 2026,
    name: "Pork Fried Rice",
    images: [
      "https://i.ibb.co/PsQbvfyY/Pork-Fried-Rice.jpg",
      
    ],
    description: "Delicious pork fried rice made with fresh ingredients and authentic spices.",
    regularPrice: 190,
    discountedPrice: 190,
    quantity: 1,
    rating: 4.5,
    reviews: 50,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Fried Rice",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2027,
    name: "Chicken Fried Rice",
    images: [
      "https://i.ibb.co/NgZY3hw6/Chicken-Fried-Rice.png"
    ],
    description: "Classic chicken fried rice prepared with tender chicken pieces and fresh vegetables.",
    regularPrice: 180,
    discountedPrice: 180,
    quantity: 1,
    rating: 4.5,
    reviews: 45,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Fried Rice",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2028,
    name: "Mix Fried Rice",
    images: [
      "https://i.ibb.co/1kMwc0G/Mix-Fried-Rice.webp"
    ],
    description: "Special mix fried rice with a combination of different meats and vegetables.",
    regularPrice: 210,
    discountedPrice: 210,
    quantity: 1,
    rating: 4.6,
    reviews: 55,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Fried Rice",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2029,
    name: "Veg Fried Rice",
    images: [
      "https://i.ibb.co/B5TBwmnH/Veg-Fried-Rice.jpg"
    ],
    description: "Healthy vegetarian fried rice loaded with fresh vegetables and aromatic spices.",
    regularPrice: 170,
    discountedPrice: 170,
    quantity: 1,
    rating: 4.4,
    reviews: 40,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Fried Rice",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2030,
    name: "Pork Chow",
    images: [
      "https://i.ibb.co/rKD1BVJR/Pork-Chow.jpg"
    ],
    description: "Savory pork chow noodles with tender meat and fresh vegetables.",
    regularPrice: 190,
    discountedPrice: 190,
    quantity: 1,
    rating: 4.5,
    reviews: 48,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Noodles",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2031,
    name: "Chicken Chow",
    images: [
      "https://i.ibb.co/7d92XCHY/Chicken-Chow.jpg"
    ],
    description: "Classic chicken chow noodles with succulent chicken pieces.",
    regularPrice: 180,
    discountedPrice: 180,
    quantity: 1,
    rating: 4.5,
    reviews: 42,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Noodles",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2032,
    name: "Mix Chow",
    images: [
      "https://i.ibb.co/zhmpWVHp/Mix-Chow.jpg"
    ],
    description: "Special mix chow noodles with assorted meats and vegetables.",
    regularPrice: 210,
    discountedPrice: 210,
    quantity: 1,
    rating: 4.6,
    reviews: 52,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Noodles",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2033,
    name: "Veg Chow",
    images: [
      "https://i.ibb.co/yL84y5s/Veg-Chow.jpg"
    ],
    description: "Healthy vegetarian chow noodles with fresh vegetables.",
    regularPrice: 170,
    discountedPrice: 170,
    quantity: 1,
    rating: 4.4,
    reviews: 38,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Noodles",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2034,
    name: "Pork Chilli",
    images: [
      "https://i.ibb.co/gLhsLMtf/Pork-Chilli.jpg"
    ],
    description: "Spicy pork chilly prepared with tender meat and special sauce.",
    regularPrice: 260,
    discountedPrice: 260,
    quantity: 1,
    rating: 4.7,
    reviews: 58,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Pork Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2035,
    name: "Pork Bhujia",
    images: [
      "https://i.ibb.co/SXtCWq3T/Pork-Bhujia.jpg"
    ],
    description: "Traditional pork bhujia cooked with authentic spices.",
    regularPrice: 200,
    discountedPrice: 200,
    quantity: 1,
    rating: 4.5,
    reviews: 45,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Pork Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2036,
    name: "Pork Ribs",
    images: [
      "https://i.ibb.co/wrFj30bf/Pork-Ribs.jpg"
    ],
    description: "Succulent pork ribs grilled to perfection with special marinade.",
    regularPrice: 420,
    discountedPrice: 420,
    quantity: 1,
    rating: 4.8,
    reviews: 65,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Pork Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2037,
    name: "Crispy Pork Belly",
    images: [
      "https://i.ibb.co/NnFbzx7h/Pork-Belly-Recipe-sq.jpg"
    ],
    description: "Perfectly crispy pork belly with tender meat inside.",
    regularPrice: 400,
    discountedPrice: 400,
    quantity: 1,
    rating: 4.8,
    reviews: 70,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Pork Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2038,
    name: "Chicken Chilli",
    images: [
      "https://i.ibb.co/60YQMn2x/Chicken-Chilli.jpg"
    ],
    description: "Spicy chicken chilly made with tender chicken pieces and special sauce.",
    regularPrice: 210,
    discountedPrice: 210,
    quantity: 1,
    rating: 4.6,
    reviews: 55,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Chicken Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2039,
    name: "Chicken Wings Hot/Spicy",
    images: [
      "https://i.ibb.co/4RP2zgNs/Chicken-Wings.jpg"
      
    ],
    description: "Crispy and spicy chicken wings with special hot sauce.",
    regularPrice: 220,
    discountedPrice: 220,
    quantity: 1,
    rating: 4.7,
    reviews: 62,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Chicken Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  {
    _id: 2040,
    name: "Chicken Gizzard Dry/Fry/Gravy",
    images: [
      "https://i.ibb.co/s9s1BnLx/Chicken-Gizzard.jpg"
    ],
    description: "Flavorful chicken gizzard prepared in your choice of style - dry, fried, or with gravy.",
    options: ["Dry", "Fry", "Gravy"],
    regularPrice: 250,
    discountedPrice: 250,
    quantity: 1,
    rating: 4.5,
    reviews: 48,
    category: "Kitchen & Food",
    brand: "Kitchen Specials",
    isStock: true,
    overView: "Chicken Dishes",
    isNew: true,
    _base: cat?.kitchen,
    isKitchenOnly: true,
    pageType: "kitchen"
  },
  
];
