export const getUser = () => {
  if (localStorage.getItem("user") !== null) {
    const data = JSON.parse(localStorage.getItem("user"));
    return data.user;
  }
  return null;
};

export const getToken = () => {
  if (localStorage.getItem("user") !== null) {
    const data = JSON.parse(localStorage.getItem("user"));
    return data.token;
  }
  return null;
};

export const getProduct = () => {
  if (localStorage.getItem("producttograb") !== undefined) {
    const productToGrab = JSON.parse(localStorage.getItem("producttograb"));
    return productToGrab;
  } else {
    return null;
  }
};

export function dateManiputator(date) {
  const dateParts = date.split("-");
  const jsDate = new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2].substr(0, 2)
  );
  return jsDate;
}

export const randomString = () => {
  //define a variable consisting alphabets in small and capital letter
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";

  //specify the length for the new string
  var lenString = 35;
  var randomstring = "";

  //loop to select a new character in each iteration
  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }

  return randomstring;
};

export const encodeProductId = (productDetailsId) => {
  const encodedId = window.btoa(productDetailsId);
  return encodedId + randomString();
};

export const decodeProductId = (encodedId) => {
  const productDetailId = window.atob(encodedId.slice(0, 4));
  return productDetailId;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const makeGrabberId = (id) => {
    const len = id.toString().length;
    switch(len) {
        case 1: 
            return "IS000"+id;
        case 2:
            return "IS00"+id;
        case 3:
            return "IS0"+id;
        default:
            return "IS"+id;
    }
}

export const getGrabberId = (id) => {
    const regex = /IS/i;
    const grabberId = id.replace(regex, "");
    return parseInt(grabberId);
}
export const grabCondition = ({productClass,  condition}) => {
  if (productClass === "vehicle") {
    switch(condition) {
      case "1":
        return "Foreign Used";
      case "2":
        return "New";
      default:
        return "Nigerian Used";
    }
  } 
  if (productClass === "property") {
    switch(condition) {
      case "1":
        return "Old Property";
      case "2":
        return "Refurbished Property";
      default:
        return "Brand New Property";
    }
  }
}