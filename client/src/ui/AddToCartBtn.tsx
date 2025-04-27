import { twMerge } from "tailwind-merge";
import { ProductProps } from "../../type";
import { store } from "../lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import PriceTag from "./PriceTag";

const AddToCartBtn = ({
  className,

  product,
  showPrice = false,
}: {
  className?: string;
  title?: string;
  product?: ProductProps;
  showPrice?: boolean;
}) => {
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(null);
  const { addToCart, cartProduct, decreaseQuantity, removeFromCart } = store();

  useEffect(() => {
    const availableItem = cartProduct.find((item) => item?._id === product?._id);
    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Product is undefined!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        decreaseQuantity(String(existingProduct?._id));
        toast.success(`${product?.name.substring(0, 10)} decreased successfully`);
      } else {
        removeFromCart(String(existingProduct?._id));
        toast.success(`${product?.name.substring(0, 10)} removed from cart`);
      }
    }
  };

  const newClassName = twMerge(
    "bg-primary/10 text-primary hover:bg-primary hover:text-white p-1.5 rounded-full duration-200",
    className
  );

  const getRegularPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.regularPrice * existingProduct?.quantity;
      }
    } else {
      return product?.regularPrice;
    }
  };

  const getDiscountedPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.discountedPrice * product?.quantity;
      }
    } else {
      return product?.discountedPrice;
    }
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}
      {existingProduct ? (
        <div className="flex items-center gap-1">
          <button
            onClick={handleDeleteProduct}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-1.5 rounded-full duration-200"
          >
            <FaMinus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center text-sm font-medium">
            {existingProduct?.quantity}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-1.5 rounded-full duration-200"
          >
            <FaPlus className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          <FiShoppingCart className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
