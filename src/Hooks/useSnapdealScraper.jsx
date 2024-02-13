import { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

function useSnapdealScraper(productName, setError) {
  const [productData, setProductData] = useState([]);

  function getRating(r) {
    const rating = +((r.match(/\d+/)[0] * 5) / 100);
    // console.log(rating);
    return rating;
  }

  useEffect(() => {
    setError((current) => [current[0], 0, current[2]]);
    setProductData([]);
    async function fetchData() {
      try {
        const encodedProductName = encodeURIComponent(productName);
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.snapdeal.com/search?keyword=${encodedProductName}`
        );

        // Extract information from the response
        const $ = cheerio.load(response.data);
        const items = $(".product-tuple-listing");
        const results = items
          .map((index, element) => {
            const r = $(element).find(".filled-stars").attr("style");
            const data = {
              title: $(element).find(".product-title").text().trim(),
              price: +$(element)
                .find(".product-price")
                .text()
                .trim()
                .replace("Rs. ", ""),
              rating: r ? getRating(r) : null,
              thumbnail: $(element).find("source").attr("srcset"),
              link: $(element).find("a.dp-widget-link").attr("href"),
              source: "Snapdeal",
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

        setProductData(results);
        setError((current) => [current[0], 1, current[2]]);
      } catch (error) {
        console.error("Error:", error);
        setError((current) => [current[0], -1, current[2]]);
      }
    }
    
    fetchData();
  }, [productName]);
  
  return productData;
}

export default useSnapdealScraper;
