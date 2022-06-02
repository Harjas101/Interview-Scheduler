import React from "react";
import DayList from "./dayList";
import "components/Application.scss";
import { useState } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
//import { useVisualMode } from "./hooks/useVisualMode"

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const appointment = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
         interview={interview}
         interviewers={interviewers}
      />
    );
  });

  // const setDays = (days) => {
  //   setState((prev) => ({ ...prev, days }));
  // };
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        console.log("this is my all", all);
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

  const setDay = (day) => setState({ ...state, day });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <DayList days={state.days} value={state.day} onChange={setDay} />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key='last' time="5pm" /> 
        </section>
    </main>
  );
}
