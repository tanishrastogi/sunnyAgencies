import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Rates_table from "../../../components/tables/rates_table";
import PurchaseRateCalculator from "../../../components/calculators/purchase.cal";
import { fetchRatesApi, fetchRatesByID } from "../../../api/rates.api";
import "./item.card.css";
import Loader from "../../../components/loader/loader";
import Item_sale_table from "../../../components/tables/item_sale_table";
import { past_item_sale_data_api } from "../../../api/sale.api";
import { Pagination } from "@mui/material";

const ItemCard = () => {
  const [searchParams] = useSearchParams();
  const history = useNavigate();

  const id = searchParams.get("id");

  const [item, setItem] = useState({});

  const [saleDataPage, setSaleDataPage] = useState(1);

  const [saleData, setSaleData] = useState([]);
  const [visible, setVisibility] = useState(false);
  const [sale_data_visibility, set_sale_data_visibility] = useState(false);
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(()=>{
    setWidth(window.innerWidth);
  }, [window.innerWidth])

  useEffect(() => {
    if (!id) {
      history("/items");
    } else {
      fetchItemRates();
      fetchSaleData();
    }
  }, []);

  useEffect(() => {
    fetchSaleData();
  }, [saleDataPage]);

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
      const { data } = await past_item_sale_data_api({
        itemID: id,
        page: saleDataPage,
      });

      if (data) {
        setSaleData({
          data: data[0]["data"],
          totalCount: data[0]["totalCount"],
        });
        set_sale_data_visibility(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log((saleData?.totalCount[0]['count']))

  return visible ? (
    <div className="item-card-container" style={{maxWidth:`${width}px`}}>
        <Rates_table product={item} />
        <PurchaseRateCalculator product={item} />
      <div style={{ width: "100%" }}>
        {sale_data_visibility ? (
          <div>
            <Item_sale_table data={saleData} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <Pagination
                count={Math.ceil(saleData?.totalCount[0]['count'] / 10)}
                page={saleDataPage}
                onChange={(e, value) => {
                  setSaleDataPage(value);
                }}
                color="success"
              />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  ) : (
    <div style={{ height: "100vh" }}>
      <Loader />
    </div>
  );
};

export default ItemCard;
