import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers"),
  ])
    .then((all) => {
      const [one, two, three] = all;
      setState((prev) => ({
        ...prev,
        days: one.data,
        appointments: two.data,
        interviewers: three.data,
      }));
    })
    .catch((err) => console.log(err));
}, []);

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios
    .put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(() => {
      setState({
        ...state,
        appointments,
      });
    });
}
function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null ,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios
    .delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments,
      });
    });
}
const setDay = (day) => setState({ ...state, day });
return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}

export default useApplicationData