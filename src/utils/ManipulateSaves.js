import { useState} from "react";
import axiosWithToken from "./Axios";
import { AxiosError } from "axios";

export const SaveAction = (productId, userId) => {
  const [saveId, setSaveId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
    const saveProduct = async () => {
    await axiosWithToken(
      `/api/saveProduct?userId=${userId}&productId=${productId}`
    )
      .then(({ data }) => {
        setSaved(true);
        setError(false);
        setSaveId(data.saveId);
        setMessage(data.message);
        setTimeout(() => setError(null), 6000);
      })
      .catch((err) => {
        //console.log(err);
        setError(true);
        setSaved(false);
        setMessage("Error saving product!");
        setTimeout(() => setError(null), 6000);
      });
  };

  const unSaveProduct = async () => {
    await axiosWithToken(
      `/api/unSaveProduct?userId=${userId}&productId=${productId}`
    )
      .then(({ data }) => {
        // device has been unsaved and we have to display the save icon
        setSaved(false);
        setError(false);
        setMessage(data.message);
        setTimeout(() => setError(null), 6000);
      })
      .catch((err) => {
        ////console.log(err);
        if (typeof err === AxiosError) {
          setMessage("Something went wrong");
        } else {
          setMessage("Error unsaving product");
        }
        //console.log(err);
        // we have an error
        setError(true);
        // THis will make sure the save icon don't come up
        setSaved(true);
        setTimeout(() => setError(null), 6000);
      });
  };

  return { saveId, setSaveId, saved, setSaved, error, setError, message, setMessage, saveProduct, unSaveProduct}

}