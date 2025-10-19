"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table";

import { Input } from "./input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Columns } from "../attendance-table/attendance-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    children?: React.ReactNode;
    tableClassName?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
    children,
    tableClassName,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalSearch, setGlobalSearch] = useState("");

    // Filter data client-side: match email_address OR department
    const filteredData = useMemo(() => {
        const q = globalSearch.trim().toLowerCase();
        if (!q) return data;
        return data.filter((row) => {
            const email = String(
                (row as Columns).email_address ?? ""
            ).toLowerCase();
            const dept = String((row as Columns).section ?? "").toLowerCase();
            return email.includes(q) || dept.includes(q);
        });
    }, [data, globalSearch]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div className={`overflow-hidden ${className}`}>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search by email or department..."
                    value={globalSearch}
                    onChange={(event) => setGlobalSearch(event.target.value)}
                    className="max-w-sm"
                />
                {children}
            </div>
            <div className={twMerge(`h-full w-full overflow-x-auto`, tableClassName)}>
                <Table className="min-w-max">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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
        </div>
    );
}
