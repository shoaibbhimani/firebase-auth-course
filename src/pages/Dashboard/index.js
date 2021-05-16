import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../components/Authentication/AuthProvider";

const Dashboard = () => {
  const {  logout } = useContext(AuthContext);
  

   return (
    <div>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard
