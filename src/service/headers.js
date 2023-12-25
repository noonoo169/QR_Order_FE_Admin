// headers.js
const getHeaders = () => {
    const accessToken = localStorage.getItem("accessToken");
    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  };
  
  export default getHeaders;
  