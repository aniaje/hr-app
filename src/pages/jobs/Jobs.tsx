import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { debounce } from "lodash";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Button, Container } from "components/Modal/Modal.styles";
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
  ActionButtonFav,
} from "components/Table/Tables.styles";
import Checkbox from "components/Table/Checkbox";
import { IJob } from "types";
import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useAddJobMutation,
} from "redux/services/jobs";
import { useFavorites, FavouriteType } from "hooks";
import {
  Form,
  FormControl,
  Input,
  InputTextarea,
} from "components/forms/Form.styles";
import { notifyError } from "utils/toast/toastNotify";
import { Modal } from "components/Modal/Modal";

const Jobs = () => {
  const [search, setSearch] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);

  const { update, get } = useFavorites(FavouriteType.JOBS);
  const [favorites, setFavorites] = useState<number[]>(get());

  const { data: jobs, error, isLoading } = useGetAllJobsQuery([]);
  const { paginatedData, pagesCount, setPage, setData, page } =
    usePagination<IJob>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (jobs) {
      setData(Object.values(jobs));
    }
  }, [jobs]);

  const [deleteJob] = useDeleteJobMutation();
  const [addJob] = useAddJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IJob>({
    mode: "onBlur",
  });

  const createJob = async (data: IJob) => {
    try {
      console.log(data);
      const result = await addJob(data).unwrap();
      setShowModal(false);
      console.log(result);
    } catch (err) {
      if (errors) {
        console.error("error", err);
      }
      notifyError();
    }
  };

  const handleDeleteJobs = () => {
    checked.map((item) => deleteJob(Number(item)));
  };

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
    return setChecked(checked.filter((item) => item !== e.target.value));
  };

  const allChecked = useMemo(
    () =>
      Boolean(paginatedData.length) &&
      paginatedData.every((item) => checked.includes(item.id.toString())),
    [checked, paginatedData]
  );

  const handleAllChecked = () => {
    if (allChecked) {
      setChecked([]);
    } else setChecked(paginatedData.map((item) => String(item.id)));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    filterData(e?.target?.value);
  };

  const handleFav = (id: number) => {
    if (!favorites.includes(id)) {
      update([...favorites, id]);

      setFavorites([...favorites, id]);

      return;
    }

    setFavorites(favorites.filter((item) => item !== id));
    update(favorites.filter((item) => item !== id));
  };

  const tableHeads = ["Role", "Date", "Actions", "Fav"];

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>oops, an error occured</p>}

      <TableInputs>
        <button type="button" onClick={handleDeleteJobs}>
          <HiOutlineTrash />
        </button>
        <TableInput
          type="search"
          value={search}
          id="search"
          placeholder="Search role"
          onChange={handleSearch}
        />{" "}
        <Button onClick={toggleModal}>Add Job</Button>
      </TableInputs>
      <Container>
        <Modal showModal={showModal} handleCloseModal={toggleModal}>
          <Form onSubmit={handleSubmit(createJob)}>
            <FormControl>
              <Input
                {...register("title")}
                name="title"
                type="text"
                placeholder="Job Title"
              />
            </FormControl>
            <FormControl>
              <Input
                {...register("shortDescription")}
                placeholder="shortDescription"
                name="shortDescription"
                type="text"
              />
            </FormControl>
            <FormControl>
              <InputTextarea
                {...register("longDescription")}
                placeholder="longDescription"
                name="longDescription"
              />
            </FormControl>

            <FormControl>
              <Input
                {...register("logo")}
                placeholder="logo"
                name="logo"
                type="logo"
              />
            </FormControl>
            <FormControl>
              <Input
                {...register("companyName")}
                placeholder="Company Name"
                name="companyName"
                type="text"
              />
            </FormControl>

            <button disabled={!isValid && !isDirty} type="submit">
              add
            </button>
          </Form>
        </Modal>
      </Container>
      <Table>
        <THead>
          <THeadTR>
            <TH>
              <Checkbox
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
              <TD>
                <ActionButtonFav key={job.id} onClick={() => handleFav(job.id)}>
                  {favorites.includes(job.id) ? (
                    <BsSuitHeartFill />
                  ) : (
                    <BsSuitHeart />
                  )}
                </ActionButtonFav>
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
