import { useMemo, useState } from "react";
import classnames from "classnames";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import Loader from "../components/Loader";
import "./index.css";

const Table = (props) => {
  const { rowsData, columns, loading = false, onRowClick } = props;
  const data = useMemo(() => rowsData ?? [], [rowsData]);


  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return loading ? (
    <div className="mt-5">
      <Loader />
    </div>
  ) : (
    //   tableInstance.getRowModel().rows.length ? (
    <>
      <div className="gap-3 mb-3 d-flex flex-column justify-content-between">
        <div className="gap-3 d-flex justify-content-end">
          {/* rows per page */}
          {/* <div>
            <select
              value={tableInstance.options.state.pagination.pageSize}
              onChange={(e) => tableInstance.setPageSize(e.target.value)}
              className="px-4 py-2 pr-8 bg-white border border-gray-300 rounded d-block"
            >
              {rowsPerPage.map((item) => (
                <option key={item} value={item}>
                  {item} Rows
                </option>
              ))}
            </select>
          </div> */}

          {/* export */}
          {/* <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onExportClick}
            >
              Export
            </button>
          </div> */}
        </div>
      </div>

      {/* table */}
      <div className="scrollable-table-container">
        <table className="bg-white border scrollable-table">
          <thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="top-0 p-2 position-sticky text-start fw-bold bg-secondary-subtle bg-secondary-50 hover:bg-secondary-100"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* isPlaceholder check is done for removing unwanted headers while grouping headers */}
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        &nbsp;
                        <span className="fs-6">
                          {header.column.getIsSorted() === "asc" && (
                            <span className="h-100">
                              <ArrowUpOutlined />
                            </span>
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <span className="h-100">
                              <ArrowDownOutlined />
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="font-semibold text-gray-600">
            {tableInstance.getRowModel().rows?.length ? (
              tableInstance.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={classnames("border-bottom hover:bg-accent-50", {
                    "cursor-pointer": onRowClick,
                  })}
                  onClick={onRowClick ? () => onRowClick(row?.original) : null}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={classnames("p-3", {
                        "cursor-pointer": onRowClick,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-28">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {/* <div className="gap-4 mt-4 d-flex justify-content-between">
        <div>
          Pages: {tableInstance.options.state.pagination.pageIndex + 1} /{" "}
          {tableInstance.getPageCount()}
        </div>
        <div>
          <button
            type="button"
            disabled={!tableInstance.getCanPreviousPage()}
            onClick={() => tableInstance.setPageIndex(0)}
            title="First Page"
            className="btn pagination-btn"
          >
            {"<<"}
          </button>
          <button
            type="button"
            disabled={!tableInstance.getCanPreviousPage()}
            onClick={() => tableInstance.previousPage()}
            title="Previous Page"
            className="btn pagination-btn"
          >
            {"<"}
          </button>
          <button
            type="button"
            disabled={!tableInstance.getCanNextPage()}
            onClick={() => tableInstance.nextPage()}
            title="Next Page"
            className="btn pagination-btn"
          >
            {">"}
          </button>
          <button
            type="button"
            disabled={!tableInstance.getCanNextPage()}
            onClick={() =>
              tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
            }
            title="Last Page"
            className="btn pagination-btn"
          >
            {">>"}
          </button>
        </div>
      </div> */}
    </>
  );
  //   ) : (
  //     <div className="mt-4">
  //       {/* <ReportNotFound
  //         text="No data found"
  //         iconStyles={{ height: 60, width: 60 }}
  //       /> */}
  //       No Data Found
  //     </div>
  //   );
};

export default Table;
