import axios from "axios";

export const callService = async (url: string, method = "GET", data?: any) => {
  try {
    const res = await axios({ url, method, data });
    return res.data;
  } catch (err: any) {
    throw new Error(`Service call failed: ${err.message}`);
  }
};
