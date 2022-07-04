import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"

export default function WidgetLg() {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const getproducts = async () => {
  //     try {
  //       const res = await userRequest.get("product/all");
  //       setProducts(res.data.products);
  //     } catch {}
  //   };
  //   getproducts();
  // }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Products</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Title</th>
          <th className="widgetLgTh">Description</th>
          <th className="widgetLgTh">ID</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {products.map((product) => (
          <tr className="widgetLgTr" key={product._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{product.title}</span>
            </td>
            <td className="widgetLgAmount">{product.description}</td>
            <td className="widgetLgAmount">{product._id}</td>
            <td className="widgetLgStatus">
              <Button type={product.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
