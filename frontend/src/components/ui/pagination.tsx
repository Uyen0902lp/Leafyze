import ReactPaginate from "react-paginate";
import { PaginationNext, PaginationPrev } from "../svg";

// prop type
type IProps = {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
};

export default function Pagination({ handlePageClick, pageCount }: IProps) {
  return (
    <nav>
      <ReactPaginate
        breakLabel="..."
        activeClassName="current"
        nextLabel={<PaginationNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PaginationPrev />}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
}
