import Poster from "./../Poster/Poster";
import Products from "./../Products/Products";
import Categories from "./../Categories/Categories";
import Banner from "./../Banner/Banner";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { filteredByPrice } from "../../features/products/productsSlice";

const Home = () => {
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!list.length) return;
    dispatch(filteredByPrice(400));
  }, [dispatch, list.length]);
  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less then 400$" />
    </>
  );
};
export default Home;
