import express from "express";
const router = express.Router();
import Razorpay from "razorpay";

router.post("/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_vs55RW4qfRA2ST",
      key_secret: "LiQWHDUJVBd9MJC1saAHWdae",
    });

    let { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "Receipt_abc",
    };

    const order = await instance.orders.create(options);
    res.json({
      error: false,
      message: "Order created successfully!",
      response: order,
    });
  } catch (error) {
    res.json({
      error: true,
      message: `${error}`,
    });
  }
});

export { router as paymentRouter };
