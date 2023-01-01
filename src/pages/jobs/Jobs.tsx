import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { debounce } from "lodash";

import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
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
} from "components/Table/Tables.styles";
import Select from "components/Table/Select";
import Checkbox from "components/Table/Checkbox";
import { IJob } from "types";
import { useDeleteJobMutation, useGetAllJobsQuery } from "redux/services/jobs";
// import { toast } from "react-toastify";

const Jobs = () => {
  const [search, setSearch] = useState<string>("");
  const { data: getAllJobs, error, isLoading } = useGetAllJobsQuery([]);
  const { paginatedData, data, pagesCount, setPage, setData, page } =
    usePagination<IJob>();

  useEffect(() => {
    if (getAllJobs) {
      setData(Object.values(getAllJobs));
    }
  }, [getAllJobs]);

  const [deleteJob] = useDeleteJobMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    setData(
      (Object.values(getAllJobs) as IJob[]).filter((offer: IJob) =>
        offer.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  // const debouncedResults = useMemo(() => {
  //   return debounce(setData, 300);
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     debouncedResults.cancel();
  //   };
  // });

  const tableHeads = ["Role", "Date", "Actions"];
  const options = ["Actions:", "Delete"];

  if (paginatedData.length) {
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
            type="search"
            value={search}
            id="search"
            placeholder="Search role"
            onChange={handleSearch}
          />
        </STableInputs>

        <STable>
          <STHead>
            <STHeadTR>
              <STH>
                <Checkbox value="all" type="checkbox" />
              </STH>
              {tableHeads.map((title, index) => (
                <STH key={index}>{title}</STH>
              ))}
            </STHeadTR>
          </STHead>
          <STBody>
            {paginatedData.map((job: IJob) => (
              <STBodyTR key={job.id}>
                <STD key={job.id}>
                  {" "}
                  <Checkbox value={job.id} type="checkbox" />
                </STD>
                <STD>{job.title} </STD>
                <STD>{job.date}</STD>
                <STD>
                  {" "}
                  <SActionButton>
                    <Link to={`/jobs/preview/${job.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </SActionButton>
                  <SActionButton
                    type="button"
                    key={job.id}
                    onClick={() => deleteJob(job.id)}
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
            onChange={(page) => setPage(page)}
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

export default Jobs;
