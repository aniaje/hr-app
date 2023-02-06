import { format, getDay, addHours, parse, startOfWeek } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Title } from "pages/Preview.styles";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Form,
  FormControl,
  Input,
  Error,
  DatePickerWrapperStyles,
} from "./forms/Form.styles";
import { Button } from "./Modal/Modal.styles";

const Wrapper = styled.div`
  text-align: center;
  width: 300px;
  display: flex;
  flex-direction: column;

  margin-right: auto;
  margin-left: auto;
`;

const locales = {
  "en-gb": require("date-fns/locale/en-GB"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface Meeting {
  title: string | null;
  start: Date | null;
  end: Date | null;
}

const meetings = [
  {
    title: "1st interview John Trav",
    start: new Date(2023, 1, 0),
    end: addHours(new Date(), 2),
  },
  {
    title: "1st interview Candidate 34",
    start: new Date(2023, 2, 0),
    end: new Date(2023, 2, 0),
  },
  {
    title: "2st interview Candiate 12",
    start: new Date(2023, 2, 0),
    end: new Date(2023, 2, 0),
  },
];

export const CalendarHR = () => {
  const [newMeeting, setNewMeeting] = useState<Meeting>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const defaultData = {
    title: "",
    start: new Date(),
    end: new Date(),
  };

  const createMeetingValidation = yup.object().shape({
    title: yup.string().required("meeting subject is required"),
    start: yup.string().required("start time is required"),
    end: yup.string().required("end time is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
  } = useForm<Meeting>({
    mode: "onBlur",
    defaultValues: defaultData,
    resolver: yupResolver(createMeetingValidation),
  });

  const [allMeetings, setAllMeetings] = useState<Meeting[]>(meetings);

  const addMeeting = (data: Meeting) => {
    setAllMeetings([...allMeetings, data]);

    localStorage.setItem("meetings", JSON.stringify([...allMeetings, data]));
  };

  const formats = {
    timeGutterFormat: "HH:mm",
  };

  return (
    <>
      <Wrapper>
        <Form>
          <p>{"Meeting's details"}</p>
          <FormControl>
            <Input
              {...register("title")}
              name="title"
              type="text"
              placeholder="Subject"
            />
          </FormControl>
          <Error>{errors.title?.message}</Error>
          <Controller
            control={control}
            name="start"
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <>
                <DatePicker
                  wrapperClassName="date_picker full-width"
                  placeholderText="Start Date"
                  selected={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  dateFormat="dd/MM/yyyy hh:mm p"
                  showTimeSelect
                />
                <DatePickerWrapperStyles />
              </>
            )}
          />
          <Error>{errors.start?.message}</Error>

          <Controller
            control={control}
            name="end"
            render={({ field: { onChange, value, ref } }) => (
              <>
                {" "}
                <DatePicker
                  wrapperClassName="date_picker full-width"
                  placeholderText="End Date"
                  selected={value}
                  onChange={onChange}
                  dateFormat="dd/MM/yyyy hh:mm p"
                  showTimeSelect
                />
                <DatePickerWrapperStyles />
              </>
            )}
          />
          <Error>{errors.end?.message}</Error>
          <Button
            disabled={!isValid && !isDirty}
            type="submit"
            onClick={handleSubmit(addMeeting)}
          >
            Add to Calendar
          </Button>
          {isSubmitSuccessful && (
            <div style={{ color: "green", padding: "5px" }}>
              New Meeting Added!
            </div>
          )}
        </Form>
      </Wrapper>
      <Calendar
        localizer={localizer}
        events={allMeetings}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 16, 0, 0)}
        step={60}
        formats={formats}
        defaultView="agenda"
        selectable
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
};
