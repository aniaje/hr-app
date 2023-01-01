import {
  PagiContainer,
  Page,
  PagArrow,
} from "components/Table/Pagination.styles";

interface PaginationProps {
  onChange: (page: number) => void;
  pagesCount: number;
  page: number;
}

const Pagination = ({ onChange, pagesCount, page }: PaginationProps) => {
  return (
    <PagiContainer>
      {page !== 1 ? (
        <PagArrow onClick={() => onChange(page - 1)}>&#8249;</PagArrow>
      ) : null}
      {Array(pagesCount)
        .fill(null)
        .map((_, index) => (
          <Page
            style={{
              backgroundColor: page === index + 1 ? "papayawhip" : "white",
            }}
            onClick={() => onChange(index + 1)}
            key={index}
          >
            {index + 1}
          </Page>
        ))}
      {page !== pagesCount ? (
        <PagArrow onClick={() => onChange(page + 1)}>&#8250; </PagArrow>
      ) : null}
    </PagiContainer>
  );
};

export default Pagination;
