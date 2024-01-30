import { DashboardHeader } from "../../../components";
import ActivitiesCharts from "./PerformanceCharts";
import Header from "./Header";
import ProductStats from "./ProductStats";
import LoadingScreen from "./LoadingScreen";
import { useUserAds } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { setRedirectLink } from "../../../utils";
import { Approutes } from "../../../constants";

const Performance = () => {
  const { data, isLoading, isError, error } = useUserAds();
  const navigate = useNavigate();

  if (error?.response?.status === 401) {
    navigate(Approutes.auth, { replace: true });
  }

  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <LoadingScreen />;
      </>
    );
  }

  return (
    <div>
      <DashboardHeader />
      <Header />
      <ProductStats adsData={data} />
      <ActivitiesCharts adsData={data} />
    </div>
  );
};

export default Performance;

/*
{
	shop_visitors: 34,
	total_chats: 45,
	total_sales: 2,
	total_products: 4,
	active_products: 2,
	expired_products: 1,
	sold_products: 1,
	products: [
		{
			name: "product1",
			views: 1023,
			chats: 20,
			grabs: 18,
		},
		{
			name: "product2",
			views: 1023,
			chats: 20,
			grabs: 18,
		},
		{
			name: "product3",
			views: 1023,
			chats: 20,
			grabs: 18,
		},
		{
			name: "product4",
			views: 1023,
			chats: 20,
			grabs: 18,
		},
	]
}
*/
