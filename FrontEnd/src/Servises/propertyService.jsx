import axios from "axios";

const propertyService = {
  getAllProperty: async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/property/getAllProperty"
      );
      console.log(
        "response.data of allProperties",
        response.data.allProperties
      );
      return response.data.allProperties;
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },
  getOneProperty: async (prop_id) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/property/getOneProperty/${prop_id}`
      );
      console.log("response.data of Property Detail", response.data.Property);
      return response.data.Property;
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },
  filterProperty: async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/property/filterProperty`,
        {
          params: { type },
        }
      );
      console.log(
        "response.data of filteredProperty Detail services",
        response.data.filteredProperty
      );
      return response.data.filteredProperty;
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },
  CountOfProperty: async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/property/CountOfProperty`
      );
      console.log(
        "CountOfProperties from PropertyServices",
        response.data.ProductCount.TotalProperty
      );
      return response.data.ProductCount.TotalProperty;
    } catch (error) {
      console.log(" Failed to get Data", error);
      throw error;
    }
  },

  filterPropertyByStatus: async (status) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        `http://localhost:7000/property/filterPropertyByStatus`,
        {
          params: { status },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "response.data of filterPropertyByStatus Detail services",
        response.data.filteredProperty
      );
      return response.data.filteredProperty;
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },
};

export default propertyService;
