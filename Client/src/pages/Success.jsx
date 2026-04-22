import React from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Success = () => {
  const { getToken } = useAuth();

  React.useEffect(() => {
    const updatePlan = async () => {
      try {
        const token = await getToken();

        await axios.post(
          "/api/update-plan",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Plan updated ✅");

        // reload to update UI
        window.location.href = "/ai";
      } catch (err) {
        console.error(err);
      }
    };

    updatePlan();
  }, []);

  return <h1>Payment Successful 🎉</h1>;
};

export default Success;