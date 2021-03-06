import React from "react";
export default function show(props) {

  return (
    <main className="appointment__card appointment__card--show">

      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular" >{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="Appointment__card-right">
        <section className="Appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}