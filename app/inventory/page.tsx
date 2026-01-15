import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: { q?: string,page?:string };
}) {
  const user = await getCurrentUser();
  const userId = user?.id;
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const totalProducts = await prisma.product.findMany({ where });
const pageSize =10;
const page= Math.max(1,Number(params.page ?? 1))

  const [totalCount,items] = await Promise.all([prisma.product.count({ where }),
    prisma.product.findMany({where,
      orderBy:{createdAt:"desc"},
      skip:(page-1) *pageSize,
      take:pageSize

    }),
  ]);

  
  const totalPages = Math.max(1,Math.ceil(totalCount / pageSize));
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Inventory Management</h1>
              <p className="text-gray-500 text-sm">
                Manage your products and track inventory levels.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white  rounded-lg border border-gray-200 p-6">
            <form action="/inventory" className="flex gap-2" method="GET">
              <input
                type="text"
                name="q"
                placeholder="Search products..."
                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
              />
              <button className=" text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* products table */}
        <div className="bg-white  rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Low Stock At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((product, key) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    {product.sku || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    {product.lowStock || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm  text-gray-500 ">
                    <form
                      action={async (formData: FormData) => {
                        "use server";
                        await deleteProduct(formData);
                      }}
                    >
                      <input type="hidden" name="id" value={product.id} />
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </form>
                  </td>

                  {/* <button className="text-red-600 hover:text-indigo-900 mr-4">Edit</button>
                   */}
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
{totalPages > 1 && (
   <div className="bg-white rounded-lg border border-gray-200 p-6">
 <Pagination currentPage={page} totalPages={19} baseUrl="/inventory" 
 searchParams={{q,pageSize:String(pageSize)}}
 />
   </div>
)}
      </main>
    </div>
  );
}
