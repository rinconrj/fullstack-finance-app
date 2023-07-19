import { GetServerSideProps, NextPage } from "next";
import { protectRoute } from "~/components/Auth";
import Dashboard from "~/components/Dashboard"

const DashboardPage: NextPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return protectRoute(context);
};

export default DashboardPage;