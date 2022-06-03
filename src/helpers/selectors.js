export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysAppointment = filteredDay.appointments.map(id => appointments[id]);
  return daysAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysInterviewers = filteredDay.interviewers.map(
    interview => interviewers[interview]
  );
  return daysInterviewers;
}