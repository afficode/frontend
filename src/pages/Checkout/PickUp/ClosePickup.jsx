import { es } from "date-fns/locale";
import { useParams } from "react-router-dom"

const ClosePickup = () => {
   const { escrow_id } = useParams();

   return (
      <section className="container">
         <div></div>
      </section>
   )
}

export default ClosePickup