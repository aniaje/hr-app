import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { usePagination } from "components/Table/usePagination";
import Pagination from "components/Table/Pagination";
import { Modal } from "components/Modal/Modal";
import {
  useGetAllCandidatesQuery,
  useDeleteCandidateMutation,
  useAddCandidateMutation,
} from "redux/services/candidates";
import { debounce } from "lodash";
import { ICandidate } from "types";
import { notifyError } from "utils/toast/toastNotify";
import {
  Form,
  FormControl,
  Input,
  InputTextarea,
  Error,
} from "components/forms/Form.styles";
import { Button, Container } from "components/Modal/Modal.styles";
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
} from "../../components/Table/Tables.styles";
import Checkbox from "../../components/Table/Checkbox";

const Candidates = () => {
  const [search, setSearch] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { data: candidates, error, isLoading } = useGetAllCandidatesQuery([]);

  const { paginatedData, pagesCount, setPage, setData, page } =
    usePagination<ICandidate>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const [addCandidate] = useAddCandidateMutation();

  const defaultData = {
    name: "",
    position: "",
    email: "",
    shortDescription: "",
    longDescription: "",
    logo: "",
    companyName: "",
  };
  const createCandidateValidation = yup.object().shape({
    name: yup.string().required("Please Enter Candidate Name"),
    position: yup.string().required("Please Enter Candidate Position"),
    shortDescription: yup.string().required("Please Enter Short Description"),
    longDescription: yup.string().required("Please Enter Short Description"),
    logo: yup.string().required("Please Enter Logo URL"),
    email: yup.string().email().required("Please Enter E-mail"),
    companyName: yup.string().required("Please Enter Company Name"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ICandidate>({
    defaultValues: defaultData,
    resolver: yupResolver(createCandidateValidation),
    mode: "onBlur",
  });

  const createCandidate = async (data: ICandidate) => {
    try {
      console.log(data);
      const result = await addCandidate(data).unwrap();
      setShowModal(false);
      console.log(result);
    } catch (err) {
      if (errors) {
        console.error("error", err);
      }
      notifyError();
    }
  };

  useEffect(() => {
    if (candidates) {
      setData(Object.values(candidates));
    }
  }, [candidates]);

  const [deleteCandidate] = useDeleteCandidateMutation();

  const handleDeleteCandidates = () => {
    checked.map((item) => deleteCandidate(Number(item)));
  };

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
      return setFavorites([...favorites, id]);
    }
    return setFavorites(favorites.filter((item) => item !== id));
  };

  const tableHeads = ["User", "Email", "Position", "Actions", "Fav"];

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>oops, an error occured</p>}

      <TableInputs>
        <button type="button" onClick={handleDeleteCandidates}>
          <HiOutlineTrash />
        </button>
        <TableInput
          id="search"
          type="search"
          value={search}
          placeholder="Search"
          onChange={handleSearch}
        />
        <Button onClick={toggleModal}>Add</Button>
      </TableInputs>
      <Container>
        <Modal showModal={showModal} handleCloseModal={toggleModal}>
          <Form onSubmit={handleSubmit(createCandidate)}>
            <FormControl>
              <Input
                {...register("name")}
                name="name"
                type="text"
                placeholder="Name"
              />
            </FormControl>
            <Error>{errors.name?.message}</Error>
            <FormControl>
              <Input
                {...register("position")}
                name="position"
                type="text"
                placeholder="Position"
              />
            </FormControl>
            <Error>{errors.position?.message}</Error>
            <FormControl>
              <Input
                {...register("email")}
                placeholder="E-mail"
                name="email"
                type="text"
              />
            </FormControl>
            <Error>{errors.email?.message}</Error>
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
                placeholder="shortDescription"
                name="shortDescription"
                type="text"
              />
            </FormControl>
            <Error>{errors.shortDescription?.message}</Error>
            <FormControl>
              <Input
                {...register("logo")}
                placeholder="logo"
                name="logo"
                type="logo"
              />
            </FormControl>
            <Error>{errors.logo?.message}</Error>
            <FormControl>
              <InputTextarea
                {...register("longDescription")}
                placeholder="longDescription"
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
          {paginatedData.map((item) => (
            <TBodyTR key={item.id}>
              <TD key={item.id}>
                <Checkbox
                  value={item.id}
                  type="checkbox"
                  checked={checked.includes(item.id.toString())}
                  onChange={handleCheck}
                />
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
              <TD>
                <ActionButtonFav
                  key={item.id}
                  onClick={() => handleFav(item.id)}
                >
                  {favorites.includes(item.id) ? (
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
