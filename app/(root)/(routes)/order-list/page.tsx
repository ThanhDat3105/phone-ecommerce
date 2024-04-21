"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/moment";
import { OrderList } from "@/interface/order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrderAction } from "@/redux/features/phoneSlice";
import { formatPrice } from "@/utils/price";
import MainLayout from "../../MainLayout";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DataTableDemo() {
  const phoneReducer = useSelector((state: RootState) => state.phoneReducer);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const handleFetchApi = () => {
    dispatch(fetchOrderAction());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("USER_INFO_KEY");
      if (user) {
        handleFetchApi();
      } else {
        toast.success("Login to continue");
        router.push(`/sign_in?urlBack=/order-list`);
      }
    }
  }, []);

  const viewDetail = async (id: number) => {
    setAnimation(true);
    setOpen(true);
  };

  const close = () => {
    setAnimation(false);
    setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const data: OrderList[] = phoneReducer?.orderList;

  const columns: ColumnDef<OrderList>[] = [
    {
      accessorKey: "id_order",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id_order")}</div>
      ),
    },
    {
      accessorKey: "created_date",
      header: "Created",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatDate(row.getValue("created_date"))}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <div>{formatPrice(row.getValue("total"))}đ</div>,
    },
    {
      accessorKey: "delivery_by",
      header: "Payment Method",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("delivery_by")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => viewDetail(payment.id_order)}
              >
                <HiMagnifyingGlass className="mr-2" /> View order details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      {phoneReducer.isLoading && <Loading />}
      {phoneReducer.isLoading ? (
        <div className="min-h-[600px]"></div>
      ) : (
        <MainLayout>
          <div className="container_order px-[32px] h-screen bg-white">
            <div className="w-full pt-[110px]">
              <div className="title xl:text-2xl text-lg font-bold mb-5">
                Order list
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {open ? (
            <>
              <div
                onClick={() => close()}
                className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm  ${
                  animation ? "animate-in fade-in-0" : "animate-out fade-out-0"
                }`}
              />
              <div
                className={`item_order fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full ${
                  animation
                    ? "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]"
                    : "animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]"
                }`}
              >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                  <h2
                    id="radix-:r1j:"
                    className="text-lg font-semibold leading-none tracking-tight"
                  >
                    Order of Hung
                  </h2>
                  <p id="radix-:r1k:" className="text-sm text-muted-foreground">
                    This is the order detail
                  </p>
                </div>
                <div>
                  <div className="p-3 space-y-8">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Order Information
                      </h2>
                      <div className="flex  items-start justify-between">
                        <div>
                          <p className="text-gray-600">Order ID: 1</p>
                          <p className="text-gray-600">
                            Order Date: 31/12/2023
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment Method: Momo</p>
                          <p className="text-gray-600">
                            Delivery: Shopee Express
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold mb-2">
                        Customer Information
                      </h2>
                      <p className="text-gray-600">Name: Hung</p>
                      <p className="text-gray-600">Phone: 0797720574</p>
                      <p className="text-gray-600">
                        Address: Quận 1, Tp. Hồ Chí Minh
                      </p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold mb-2">Products</h2>
                      <ul>
                        <li className="text-gray-600 py-4 ">
                          <div className="flex items-center justify-between">
                            <p>Iphone 15 pro max</p> <p>32.990.000&nbsp;₫ </p>
                          </div>
                          <div className="flex items-center justify-between text-gray-400 text-sm font-light">
                            <p> Storage: 256GB </p>
                            <span>|</span>
                            <p> Color: Black </p>
                            <span>|</span>
                            <p> Quantity: 1</p>
                          </div>
                        </li>
                        <li className="text-gray-600 py-4 ">
                          <div className="flex items-center justify-between">
                            <p>Iphone 15 pro max</p> <p>32.990.000&nbsp;₫ </p>
                          </div>
                          <div className="flex items-center justify-between text-gray-400 text-sm font-light">
                            <p> Storage: 512GB </p>
                            <span>|</span>
                            <p> Color: Pink </p>
                            <span>|</span>
                            <p> Quantity: 1</p>
                          </div>
                        </li>
                      </ul>
                      <p className="text-gray-800 pt-5 border-t-2">
                        Total Amount: 65.980.000&nbsp;₫
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => close()}
                  type="button"
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </MainLayout>
      )}
    </>
  );
}
