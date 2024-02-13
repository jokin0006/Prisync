import { useState, useEffect } from "react";

function ErrorBox({ errorInfo }) {
  const [alertInfo, setalertInfo] = useState(
    <p className="text-orange-300">Getting Data...</p>
  );
  useEffect(() => {
    let brands = "";
    errorInfo.forEach((item, index) => {
      if (item === -1) {
        if (index === 0) {
          brands += "Amazon ";
        } else if (index === 1) {
          brands += "Snapdeal ";
        } else if (index === 2) {
          brands += "Ebay ";
        }
      }
    });
    if (errorInfo[0] === 1 && errorInfo[1] === 1 && errorInfo[2] === 1)
      setalertInfo(<p className="text-green-500">Success!!</p>);
    else if (errorInfo[0] === -1 || errorInfo[1] === -1 || errorInfo[2] === -1)
      setalertInfo(<p className="text-red-500">{brands} Failed</p>);
  }, [errorInfo]);
  return alertInfo;
}
export default ErrorBox;
