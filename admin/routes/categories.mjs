import { Router } from "express";
import { categories, products } from "../constants/index.mjs";

const router = Router();

router.get("/categories", (req, res) => {
  res.send(categories);
});

router.get("/categories/:id", (req, res) => {
  const id = req.params.id?.toLowerCase().trim();
  const matchedProducts = products?.filter((item) => {
    const base = (item?._base || "").toLowerCase().trim();
    const category = (item?.category || "").toLowerCase().replace(/\s|&/g, "");
    return base === id || category === id;
  });

  if (!matchedProducts || matchedProducts.length === 0) {
    return res
      .status(404)
      .json({ message: "No products matched with this category" });
  }
  res.json(matchedProducts);
});

export default router;
