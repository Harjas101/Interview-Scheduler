export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
  let appointmentIds = [];

  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      appointmentIds = stateDay.appointments;
    }
  }
  console.log("+++++++++", appointmentIds);
  for (const appointmentId of appointmentIds) {
    console.log("---", appointmentId);

    appointmentArray.push(state.appointments[appointmentId]);
  }
  console.log("this is appointment array", appointmentArray);
  return appointmentArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar,
      },
    };
  }
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filterDay = days.find((item) => day === item.name);
  if (days.length < 1 || filterDay === undefined) {
    return [];
  }
  const interviewDay = filterDay.interviewers.map(
    (interview) => interviewers[interview]
  );
  return interviewDay;
}
