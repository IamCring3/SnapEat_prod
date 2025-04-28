import { ProductProps } from "../../type";
import { useNavigate } from "react-router-dom";
import FormattedPrice from "./FormattedPrice";
import AddToCartBtn from "./AddToCartBtn";

interface Props {
  item: ProductProps;
  setSearchText?: any;
}

const ProductCard = ({ item, setSearchText }: Props) => {
  const navigation = useNavigate();

  const handleProduct = () => {
    navigation(`/product/${item?._id}`);
    setSearchText && setSearchText("");
  };

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-md duration-200 border border-gray-100">

      {/* Product Image */}
      <div className="relative group mb-3">
        <div className="w-full aspect-square overflow-hidden">
          <img
            onClick={handleProduct}
            src={item?.images[0]}
            alt={item?.name}
            className="w-full h-full object-contain group-hover:scale-105 duration-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <h2 className="text-base font-medium line-clamp-2 cursor-pointer" onClick={handleProduct}>
          {item?.name}
        </h2>
        <p className="text-sm text-gray-500">{item?.quantity || "1 ltr"}</p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-semibold">
            <FormattedPrice amount={item?.discountedPrice} />
          </span>
          <AddToCartBtn product={item} className="px-4 py-1" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
