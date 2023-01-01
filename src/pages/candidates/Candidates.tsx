import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
} from "redux/services/candidates";
import { ICandidate } from "types";
import { toast } from "react-toastify";
import {
  STable,
  STableInput,
  STableInputs,
  STBody,
  STBodyTR,
  STD,
  STH,
  STHead,
  STHeadTR,
  SActionButton,
} from "../../components/Table/Tables.styles";

import Select from "../../components/Table/Select";
import Checkbox from "../../components/Table/Checkbox";

const Candidates = () => {
  const [search, setSearch] = useState<string>("");
  const {
    data: getAllCandidates,
    error,
    isLoading,
  } = useGetAllCandidatesQuery([]);

  const { paginatedData, data, pagesCount, setPage, setData, page } =
    usePagination<ICandidate>();

  useEffect(() => {
    if (getAllCandidates) {
      setData(Object.values(getAllCandidates));
    }
  }, [getAllCandidates]);

  // setData(candidatesArr);

  // useEffect(() => {
  //   getCandidates();
  // }, []);
  const [deleteCandidate] = useDeleteCandidateMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    setData(
      (Object.values(getAllCandidates) as ICandidate[]).filter(
        (candidate: ICandidate) =>
          candidate.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const tableHeads = ["User", "Email", "Position", "Actions"];
  const options = ["Actions:", "Delete"];

  if (paginatedData) {
    return (
      <>
        {isLoading && <p>Loading...</p>}
        {error && <p>oops, an error occured</p>}

        <STableInputs>
          <Select
            label="Actions:"
            values={options}
            onChange={() => console.log()}
          />
          <STableInput
            id="search"
            type="search"
            value={search}
            placeholder="Search candidate"
            onChange={handleSearch}
          />
        </STableInputs>
        <STable>
          <STHead>
            <STHeadTR>
              <Checkbox type="checkbox" />
              {tableHeads.map((title, index) => (
                <STH key={index}>{title}</STH>
              ))}
            </STHeadTR>
          </STHead>
          <STBody>
            {paginatedData.map((item) => (
              <STBodyTR key={item.id}>
                <STD key={item.id}>
                  <Checkbox type="checkbox" />
                </STD>
                <STD>{item.name} </STD>
                <STD>email</STD>
                <STD>{item.position}</STD>
                <STD>
                  <SActionButton>
                    <Link to={`/candidates/preview/${item.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </SActionButton>
                  <SActionButton
                    type="button"
                    key={item.id}
                    onClick={() => deleteCandidate(item.id)}
                  >
                    <HiOutlineTrash />
                  </SActionButton>
                </STD>
              </STBodyTR>
            ))}
          </STBody>
        </STable>
        {pagesCount > 1 ? (
          <Pagination
            onChange={(pageNo) => setPage(page)}
            pagesCount={pagesCount}
            page={page}
          />
        ) : null}
      </>
    );
  } else {
    return <h2>nothing to display</h2>;
  }
};

export default Candidates;
