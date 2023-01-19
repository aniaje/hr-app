import { useEffect, useState, useCallback, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useFavorites, FavouriteType } from "hooks";
import { IJob } from "types";
import { AiOutlineEye } from "react-icons/ai";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { debounce } from "lodash";
import { notifyError } from "utils/toast/toastNotify";
import { Button, Container } from "components/Modal/Modal.styles";
import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
import { Modal } from "components/Modal/Modal";
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

import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useAddJobMutation,
} from "redux/services/jobs";
import {
  Form,
  FormControl,
  Input,
  InputTextarea,
  Error,
} from "components/forms/Form.styles";

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

  const defaultData = {
    title: "",
    shortDescription: "",
    longDescription: "",
    logo: "",
    companyName: "",
  };

  const createJobValidation = yup.object().shape({
    title: yup.string().required("Please Enter Job Title"),
    shortDescription: yup.string().required("Please Enter Short Description"),
    longDescription: yup.string().required("Please Enter Short Description"),
    logo: yup.string().required("Please Enter Logo URL"),
    companyName: yup.string().required("Please Enter Company Name"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IJob>({
    mode: "onBlur",
    defaultValues: defaultData,
    resolver: yupResolver(createJobValidation),
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
          placeholder="Search"
          onChange={handleSearch}
        />{" "}
        <Button onClick={toggleModal}>Add</Button>
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
            <Error>{errors.title?.message}</Error>

            <FormControl>
              <Input
                {...register("logo")}
                placeholder="Logo"
                name="logo"
                type="logo"
              />
            </FormControl>
            <Error>{errors.logo?.message}</Error>
            <FormControl>
              <Input
                {...register("companyName")}
                placeholder="Company Name"
                name="companyName"
                type="text"
              />
            </FormControl>
            <Error>{errors.companyName?.message}</Error>
            <FormControl>
              <Input
                {...register("shortDescription")}
                placeholder="Short Description"
                name="shortDescription"
                type="text"
              />
            </FormControl>
            <Error>{errors.shortDescription?.message}</Error>
            <FormControl>
              <InputTextarea
                {...register("longDescription")}
                placeholder="Long Description"
                name="longDescription"
              />
            </FormControl>
            <Error>{errors.longDescription?.message}</Error>
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
