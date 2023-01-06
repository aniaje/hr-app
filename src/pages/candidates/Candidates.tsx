import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "redux/services/candidates";
import { debounce } from "lodash";
import { ICandidate } from "types";

import {
  Table,
  TableInput,
  TableInputs,
  TBody,
  TBodyTR,
  TD,
  TH,
  THead,
  THeadTR,
  ActionButton,
} from "../../components/Table/Tables.styles";

import Select from "../../components/Table/Select";
import Checkbox from "../../components/Table/Checkbox";

const Candidates = () => {
  const [search, setSearch] = useState<string>("");
  const { data: candidates, error, isLoading } = useGetAllCandidatesQuery([]);

  const { paginatedData, pagesCount, setPage, setData, page } =
    usePagination<ICandidate>();

  useEffect(() => {
    if (candidates) {
      setData(Object.values(candidates));
    }
  }, [candidates]);

  const [deleteCandidate] = useDeleteCandidateMutation();

  const filterData = useCallback(
    debounce((searchQuery: string) => {
      setData(
        (Object.values(candidates) as ICandidate[]).filter(
          (candidate: ICandidate) =>
            candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 300),
    [candidates]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    filterData(e?.target?.value);
  };

  const tableHeads = ["User", "Email", "Position", "Actions"];
  const options = ["Actions:", "Delete"];

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>oops, an error occured</p>}

      <TableInputs>
        <Select
          label="Actions:"
          values={options}
          onChange={() => console.log()}
        />
        <TableInput
          id="search"
          type="search"
          value={search}
          placeholder="Search candidate"
          onChange={handleSearch}
        />
      </TableInputs>

      <Table>
        <THead>
          <THeadTR>
            <TH>
              <Checkbox value="all" type="checkbox" />
            </TH>
            {tableHeads.map((title, index) => (
              <TH key={index}>{title}</TH>
            ))}
          </THeadTR>
        </THead>
        <TBody>
          {paginatedData.map((item) => (
            <TBodyTR key={item.id}>
              <TD key={item.id}>
                <Checkbox type="checkbox" />
              </TD>
              <TD>{item.name} </TD>
              <TD>{item.email}</TD>
              <TD>{item.position}</TD>
              <TD>
                <ActionButton>
                  <Link to={`/candidates/preview/${item.id}`}>
                    <AiOutlineEye />
                  </Link>
                </ActionButton>
                <ActionButton
                  type="button"
                  key={item.id}
                  onClick={() => deleteCandidate(item.id)}
                >
                  <HiOutlineTrash />
                </ActionButton>
              </TD>
            </TBodyTR>
          ))}
        </TBody>
      </Table>
      {pagesCount && pagesCount !== 1 && (
        <Pagination
          onChange={(pageNo) => setPage(page)}
          pagesCount={pagesCount}
          page={page}
        />
      )}
    </>
  );
};

export default Candidates;
