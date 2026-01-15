import Sidebar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import React from "react";

export default async function AddProductPage() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar currentPath="/add-product" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Add Product</h1>
              <p className="text-gray-500 text-sm">
                Add a new product to your inventory.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">

            <form action={createProduct} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter Product Name"
                />
              </div>

              <div className="grid-cols-1 md:grid-cols-2 gap-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="quantity"
                >
                  Quantity *
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="0"
                />
              </div>

               <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="price"
                >
                  Price *
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="sku"
                >
                SKU (optional)
                </label>
                <input
                  id="sku"
                  name="sku"
                  type="text"
               
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter SKU"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="lowStockAt"
                >
                LowStockAt (optional)
                </label>
                <input
                  id="lowStockAt"
                  name="lowStockAt"
                  type="text"
                  min="0"
               
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter low stock threshold"
                />
              </div>
{/* <div className="flex gap-5">
<button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ">Add Product</button>
<Link href="/inventory">Cancel</Link>
</div> */}

<div className="flex items-center gap-5">
  <button
    type="submit"
    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 "
  >
    Add Product
  </button>

  <Link
    href="/inventory"
    className="px-6 py-3  bg-gray-200 text-gray-800 rounded-lg  hover:bg-gray-300 "
  >
    Cancel
  </Link>
</div>


            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
