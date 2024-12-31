import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prisma";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit } = req.query;
    let products = await prisma.product.findMany();

    if (limit) {
      products = products.slice(0, parseInt(limit as string));
    }

    const message =
      products.length === 0
        ? "No products found"
        : "All products fetched successfully";

    res.status(200).json({
      message,
      result: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      result: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        id: crypto.randomUUID(),
        name,
        price,
        description,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      result: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
