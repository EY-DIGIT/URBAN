import React, { useEffect, useRef } from "react";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { ArrowBack, ArrowForward, ArrowToFirst, ArrowToLast, SortDown, SortUp } from "./svgindex";

const noop = () => {};

const Table = ({
  className = "table",
  t,
  data,
  columns,
  getCellProps,
  currentPage = 0,
  pageSizeLimit = 10,
  disableSort = true,
  autoSort = false,
  initSortId = "",
  onSearch = false,
  manualPagination = true,
  totalRecords,
  onNextPage,
  onPrevPage,
  globalSearch,
  onSort = noop,
  onPageSizeChange,
  onLastPage,
  onFirstPage,
  isPaginationRequired = true,
  sortParams = [],
  showAutoSerialNo=false,
  customTableWrapperClassName="",
  styles={},
  tableTopComponent,
  tableRef,
  isReportTable=false,
  inboxStyles,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, sortBy, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage, pageSize: pageSizeLimit, sortBy: autoSort ? [{ id: initSortId, desc: false }] : sortParams },
      pageCount: totalRecords > 0 ? Math.ceil(totalRecords / pageSizeLimit) : -1,
      manualPagination: manualPagination,
      disableMultiSort: false,
      disableSortBy: disableSort,
      manualSortBy: autoSort ? false : true,
      autoResetPage: false,
      autoResetSortBy: false,
      disableSortRemove: true,
      disableGlobalFilter: onSearch === false ? true : false,
      globalFilter: globalSearch || "text",
      useControlledState: (state) => {
        return React.useMemo(() => ({
          ...state,
          pageIndex: manualPagination ? currentPage : state.pageIndex,
        }));
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    onSort(sortBy);
  }, [onSort, sortBy]);

  useEffect(() => setGlobalFilter(onSearch), [onSearch, setGlobalFilter]);

  const tref = useRef();
  
  return (
    <React.Fragment>
    <div ref={tref} style={tref.current && tref.current.offsetWidth < tref.current.scrollWidth ? {...inboxStyles}: {}}>
    <span className={customTableWrapperClassName}>
    {tableTopComponent ? tableTopComponent:null}
      <table className={className} {...getTableProps()} style={styles} ref={tableRef}>
         
        <thead style={{backgroundColor: "#F3F4F6", color: "#374151", fontSize: "16px", fontWeight: "600", textAlign: "left", verticalAlign: "top"}}>  
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px"}}>
             {showAutoSerialNo&& <th style={{ background:"#4729A34D",padding:"10px",fontSize:"14px", }}>
              {showAutoSerialNo&& typeof showAutoSerialNo =="string"?t(showAutoSerialNo):t("TB_SNO")}
              </th>}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ background:"#4729A34D",padding:"10px",fontSize:"14px" }}>
                  {column.render("Header")}
                  <span>{column.isSorted ? column.isSortedDesc ? <SortDown /> : <SortUp /> : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            // rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
              {showAutoSerialNo&&  <td >
              {i+1}
              </td>}
                {row.cells.map((cell) => {
                  return (
                    <td
                       style={{ padding: "10px", fontSize: "14px" }}
                      {...cell.getCellProps([
                        // {
                        //   className: cell.column.className,
                        //   style: cell.column.style,
                        // },
                        // getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.attachment_link ? (
                        <a style={{ color: "#141B29" }} href={cell.attachment_link}>
                          {cell.render("Cell")} gfdgfd
                        </a>
                      ) : (
                        <React.Fragment> {cell.render("Cell")} </React.Fragment>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </span>
      </div>
      {isPaginationRequired && (
        <div className="pagination dss-white-pre" >
          {`${t("CS_COMMON_ROWS_PER_PAGE")} :`}
          <select
            className="cp"
            value={pageSize}
            style={{ marginRight: "15px" }}
            onChange={manualPagination ? onPageSizeChange : (e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>
            <span>
              {pageIndex * pageSize + 1}
              {"-"}
              {manualPagination
                ? (currentPage + 1) * pageSizeLimit > totalRecords
                  ? totalRecords
                  : (currentPage + 1) * pageSizeLimit
                : (pageIndex * pageSize + page?.length)}{" "}
              {/* {(pageIndex + 1) * pageSizeLimit > rows.length ? rows.length : (pageIndex + 1) * pageSizeLimit}{" "} */}
              {totalRecords ? `of ${manualPagination ? totalRecords : rows.length}` : ""}
            </span>{" "}
          </span>
          {/* to go to first and last page we need to do a manual pagination , it can be updated later*/}
          {!manualPagination&& pageIndex!=0 &&<ArrowToFirst onClick={() => gotoPage(0)} className={"cp"} />}
          {canPreviousPage && manualPagination && onFirstPage && <ArrowToFirst onClick={() => manualPagination && onFirstPage()} className={"cp"} />}
          {canPreviousPage && <ArrowBack onClick={() => (manualPagination ? onPrevPage() : previousPage())} className={"cp"} />}
          {canNextPage && <ArrowForward onClick={() => (manualPagination ? onNextPage() : nextPage())} className={"cp"} />}
          {!manualPagination&& pageIndex != pageCount-1 && <ArrowToLast onClick={() => gotoPage(pageCount-1 )} className={"cp"} />}
          {rows.length == pageSizeLimit && canNextPage && manualPagination && onLastPage && (
            <ArrowToLast onClick={() => manualPagination && onLastPage()} className={"cp"} />
          )}
          {/* to go to first and last page we need to do a manual pagination , it can be updated later*/}
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
