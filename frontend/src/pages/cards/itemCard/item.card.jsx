import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Rates_table from "../../../components/tables/rates_table";
import PurchaseRateCalculator from "../../../components/calculators/purchase.cal";
import { fetchRatesApi, fetchRatesByID } from "../../../api/rates.api";
import "./item.card.css";
import Loader from "../../../components/loader/loader";
import Item_sale_table from "../../../components/tables/item_sale_table";
import { past_item_sale_data_api } from "../../../api/sale.api";

const ItemCard = () => {
  const [searchParams] = useSearchParams();
  const history = useNavigate();

  const id = searchParams.get("id");

  const [item, setItem] = useState({});
  const [saleData, setSaleData] = useState([]);
  const [visible, setVisibility] = useState(false);
  const [sale_data_visibility, set_sale_data_visibility] = useState(false);

  useEffect(() => {
    if (!id) {
      history("/items");
    } else {
      fetchItemRates();
      fetchSaleData();
    }
  }, []);

  console.log(visible);
  const fetchItemRates = async () => {
    try {
      const res = await fetchRatesByID({ productID: id });
      if (res.data) {
        setVisibility(true);
      }
      setItem(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSaleData = async () => {
    try {
      const { data } = await past_item_sale_data_api({ itemID: id });

      if (data) {
        setSaleData(data);
        set_sale_data_visibility(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(item);

  return visible ? (
    <div className="item-card-container">
      <Rates_table product={item} />
      <div className="item-card-rate-table" style={{ width: "fit-content" }}>
        <PurchaseRateCalculator product={item} />
      </div>
      <div className="item-card-rate-table" style={{ width: "fit-content" }}>
        {sale_data_visibility ? <Item_sale_table data={saleData} /> : <Loader />}
      </div>
    </div>
  ) : (
    <div style={{ height: "100vh" }}>
      <Loader />
    </div>
  );
};

export default ItemCard;
