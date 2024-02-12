import ItemContainer from "./ItemContainer";
import { getSaves } from "../../../hooks/useSaves";
import ClearAll from "./ClearAll";

const SavedItems = () => {
  const { data, isLoading } = getSaves();

  return (
    <div className="max-w-[1024px] mx-auto px-2 sm:px-4 my-5 sm:my-10 min-h-[500px]">
      <div className="flex justify-end">
        {data?.saves?.length >= 2 && <ClearAll />}
      </div>

      <div className="my-2 flex flex-col gap-6">
        {data?.saves?.map((saved, index) => (
          <ItemContainer
            name={saved?.title}
            location={saved?.location}
            specifications={[saved?.ad_condition]}
            price={saved?.price}
            images={saved?.images}
            ads_id={saved?.ads_id}
            key={index * 3}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedItems;

// name, location, specifications, price, images

// saved items data format
/* 
	[
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
	]
*/
