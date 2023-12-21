export const manipulateCategory = (category) => {
    const categories = Object.groupBy(category, ({category_id}) => category_id);
    console.log(categories)
    return categories
}

export const randomString = () => {
  //define a variable consisting alphabets in small and capital letter
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";

  //specify the length for the new string
  var lenString = 35;
  var randString = "";

  //loop to select a new character in each iteration
  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randString += characters.substring(rnum, rnum + 1);
  }
  return randString;
};

export const encodeProductId = (ad_id) => {
  const encodedId = window.btoa(ad_id);
  return encodedId + randomString();
};

export const decodeProductId = (encodedId) => {
  const ad_id = window.atob(encodedId.slice(0, 4));
  return ad_id;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};