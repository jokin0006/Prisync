// Ract hook to scrape ebay for products details for a given product-name

import { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

const useEbayScrapper = (query, setError) => {
  const [data, setData] = useState([]);

  function getRating(r) {
    let re = /\d*.\d*%/;
    const match = parseFloat(r.match(re)[0].trim());
    // console.log(match);
    const rating = ((match * 5) / 100).toFixed(1);
    return rating;
  }

  useEffect(() => {
    setError((current) => [current[0], current[1], 0]);
    setData([]);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `https://cors-anywhere.herokuapp.com/https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${query}&_sacat=0`
        );

        // Use cheerio to parse the response

        const $ = cheerio.load(response.data);
        const items = $(".s-item__wrapper");

        const results = items
          .map((index, element) => {
            const r = $(element).find(".s-item__seller-info-text").text();
            const data = {
              title: $(element).find(".s-item__title").text(),
              price:
                +$(element).find(".s-item__price").text().match(/\d+/)[0] *
                82.25,
              rating: r ? getRating(r) : null,
              thumbnail: $(element).find("img").attr("src"),
              link: $(element).find(".s-item__link").attr("href"),
              source: "Ebay",
            };

            return data;
          })
          .get()
          .filter(
            (item) =>
              item.title &&
              item.price &&
              item.rating &&
              item.thumbnail &&
              item.link &&
              item.source
          );
        // console.log(results);
        setData(results);
        setError((current) => [current[0], current[1], 1]);
      } catch (error) {
        console.error("Error :", error);
        setError((current) => [current[0], current[1], -1]);
      }
    };
    fetchData();
  }, [query]);

  return data;
};

export default useEbayScrapper;
