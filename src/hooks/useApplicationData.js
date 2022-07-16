
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
    return (axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const spotUpdate = updateSpots(state.days, appointments);
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      }));
  }
  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const spotUpdate = updateSpots(state.days, appointments);
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      }));
  };
  const spotUpdate = (day, appointments) => {
    let freeSpots = 0;
    for (const appointmentID of day.appointments) {
      const appointment = appointments[appointmentID];
      if (appointment.interview === null) {
        freeSpots += 1;
      }
    }
    return freeSpots;

  };

  const updateSpots = (days, appointments) => {

    const updatedStateDayArray = days.map(day => {
      return {
        ...day,
        spots: spotUpdate(day, appointments)
      };
    });
    return updatedStateDayArray;

  };
  const setDay = (day) => setState({ ...state, day });
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;