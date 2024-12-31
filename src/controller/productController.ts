import { NextFunction, Request, Response } from "express";
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

    res.status(products ? 200 : 400).json({
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
      where: { product_id: productId },
    });

    res.status(product ? 200 : 400).json({
      message: product ? "Product fetched successfully" : "Product not found",
      result: product ? product : null,
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
        product_id: crypto.randomUUID(),
        name,
        price,
        description,
        User: {
          connect: { user_id: req.params.user_id },
        },
      },
    });

    res.status(newProduct ? 201 : 300).json({
      message: newProduct
        ? "Product created successfully"
        : "Failed to create product",
      result: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.delete({
      where: { product_id: productId },
    });

    res.status(product ? 200 : 500).json({
      message: product
        ? "Product deleted successfully"
        : "Failed to delete product",
      result: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const { name, price, description } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { product_id: productId },
      data: {
        name,
        price,
        description,
      },
    });

    res.status(updatedProduct ? 200 : 500).json({
      message: updatedProduct
        ? "Product updated successfully"
        : "Failed to update product",
      result: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
