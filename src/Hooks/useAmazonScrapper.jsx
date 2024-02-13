import { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

function useAmazonScraper(productName, setError) {
  const [productData, setProductData] = useState([]);
  function getRating(r) {
    // get the rating from the string 3.2 out of 5 stars
    const re = /\d+\.\d+/;
    const rating = +r.match(re)[0];
    // console.log(rating);
    return rating;
  }
  useEffect(() => {
    setError((current) => [0, current[1], current[2]]);
    setProductData([]);
    async function fetchData() {
      try {
        const encodedProductName = encodeURIComponent(productName);
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.amazon.in/s?k=${encodedProductName}`
        );

        // Extract information from the response
        const $ = cheerio.load(response.data);
        const items = $(".s-result-item");

        const results = items
          .map((index, item) => {
            const r = $(item)
              .find(".a-icon-star-small")
              .text()
              .slice(0, 3)
              .trim();
            const data = {
              title: $(item).find(".a-size-base-plus").text().trim(),
              price: +$(item).find(".a-price-whole").text().trim(),
              rating: r ? getRating(r) : null,
              thumbnail: $(item).find(".s-image").attr("src"),
              link:
                "https://www.amazon.in" +
                $(item).find(".a-link-normal").attr("href"),
              source: "Amazon",
            };
            return data;
          })
          .get()
          .filter(
            (item) =>
              item.title &&
              item.price < Number.MAX_SAFE_INTEGER &&
              item.rating &&
              item.thumbnail &&
              item.link
          );

        setProductData(results);
        setError((current) => [1, current[1], current[2]]);
      } catch (error) {
        console.error("Error:", error);
        setError((current) => [-1, current[1], current[2]]);
      }
    }

    fetchData();
  }, [productName]);

  return productData;
}

export default useAmazonScraper;
