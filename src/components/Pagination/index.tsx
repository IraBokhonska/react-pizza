import React from "react";
import ReactPaginate from "react-paginate";

import "./pagination.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => (
  <div className="pagination">
    <ReactPaginate
      className="pagination__list"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  </div>
);

export default Pagination;
