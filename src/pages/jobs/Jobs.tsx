import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { debounce } from "lodash";

import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
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
} from "components/Table/Tables.styles";
import Select from "components/Table/Select";
import Checkbox from "components/Table/Checkbox";
import { IJob } from "types";
import { useDeleteJobMutation, useGetAllJobsQuery } from "redux/services/jobs";

const Jobs = () => {
  const [search, setSearch] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);

  const { data: jobs, error, isLoading } = useGetAllJobsQuery([]);
  const { paginatedData, data, pagesCount, setPage, setData, page } =
    usePagination<IJob>();

  useEffect(() => {
    if (jobs) {
      setData(Object.values(jobs));
    }
  }, [jobs]);

  // const isCheckAll = checked.length === Object.values(jobs).length

  const [deleteJob] = useDeleteJobMutation();

  const filterData = useCallback(
    debounce((searchQuery: string) => {
      setData(
        (Object.values(jobs) as IJob[]).filter((offer: IJob) =>
          offer.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 300),
    [jobs]
  );

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setChecked([...checked, e.target.value]);
    }
    setChecked(checked.filter((item) => item !== e.target.value));
  };

  console.log(checked);

  const allChecked = useMemo(() => {
    return (
      Boolean(paginatedData.length) &&
      paginatedData.every((item) => checked.includes(item.id.toString()))
    );
  }, [checked, paginatedData]);

  console.log(allChecked);

  const handleAllChecked = () => {
    if (allChecked) {
      setChecked([]);
    } else setChecked(paginatedData.map((item) => String(item.id)));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    filterData(e?.target?.value);
  };

  const tableHeads = ["Role", "Date", "Actions"];
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
          type="search"
          value={search}
          id="search"
          placeholder="Search role"
          onChange={handleSearch}
        />
      </TableInputs>

      <Table>
        <THead>
          <THeadTR>
            <TH>
              <Checkbox
                readOnly
                type="checkbox"
                name="selectAll"
                id="selectAll"
                checked={allChecked}
                onChange={handleAllChecked}
              />
            </TH>
            {tableHeads.map((title, index) => (
              <TH key={index}>{title}</TH>
            ))}
          </THeadTR>
        </THead>
        <TBody>
          {paginatedData.map((job: IJob) => (
            <TBodyTR key={job.id}>
              <TD key={job.id}>
                {" "}
                <Checkbox
                  value={job.id}
                  type="checkbox"
                  checked={checked.includes(job.id.toString())}
                  onChange={handleCheck}
                />
              </TD>
              <TD>{job.title} </TD>
              <TD>{job.date}</TD>
              <TD>
                {" "}
                <ActionButton>
                  <Link to={`/jobs/preview/${job.id}`}>
                    <AiOutlineEye />
                  </Link>
                </ActionButton>
                <ActionButton
                  type="button"
                  key={job.id}
                  onClick={() => deleteJob(job.id)}
                >
                  <HiOutlineTrash />
                </ActionButton>
              </TD>
            </TBodyTR>
          ))}
        </TBody>
      </Table>

      {pagesCount && (
        <Pagination
          onChange={(currentPage) => setPage(currentPage)}
          pagesCount={pagesCount}
          page={page}
        />
      )}
    </>
  );
};

export default Jobs;
