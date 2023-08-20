import { getUser, getToken, encodeProductId } from "."
import axios from "axios";
import { backendLink } from "./basicInfo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const GenerateGrabUrl = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [viewGrab, setViewGrab] = useState(false);
  const [saved, setSaved] = useState(false);
  const [share, setShare] = useState(false);
  const [grabLink, setGrabLink] = useState(null);
 const grabber = getUser(); 
  const getUrl = async (grabDetail, product) => {
    setSaved(true)
    // setIsLoading(true);
   
    const token = getToken();
    let source = axios.CancelToken.source();;
    let config = {
      cancelToken: source.token,
      headers: {
        Authorization: token,
      },
    };
    const grabbedProduct = {...product, ...grabDetail, ...grabber, grabbed: true }
    //console.log(grabbedProduct);
    await axios
        .post(backendLink +"/grab/grabProduct", grabbedProduct, config).then(({data}) => {
          //console.log(data)
          if (data.success === true) {
            setShare(true)
            setError(false);
            setMessage(data.message);
          }
          setIsLoading(false);
          // reset the error field, so the error field in create grab can go away
          setTimeout(() => {
            setError(null)
            setShare(true);
            setGrabLink(`/product/grab/${encodeProductId(data.itemId)}`);
          }, 4000)
          //console.log(data);
        }).catch((err) => {
          setSaved(false)
          setError(true);
          setMessage(err.message);
          setIsLoading(false);
          // reset the error field, so the error field in create grab can go away
          setTimeout(() => {
            setError(null)
          }, 4000)
          //console.log(err);
        });
  }

  return {grabber, error, message, isLoading,setIsLoading, getUrl, viewGrab, setViewGrab, saved, setSaved, share, setShare, grabLink}
   
   
}