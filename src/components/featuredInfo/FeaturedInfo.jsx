import "./featuredInfo.css";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  const productsCount = useSelector((state) => state?.product?.products?.count);
  const categoriesCount = useSelector((state) => state?.category?.categories?.count);
  const countiesCount = useSelector((state) => state?.county?.counties?.count);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Products</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{productsCount}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Categories</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{categoriesCount}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Counties</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{countiesCount}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
