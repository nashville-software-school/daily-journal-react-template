import React from "react";

export const Entry = ({ entry, mood, onEditButtonClick, onDeleteButtonClick }) => {

  return (

    <section className="entry">
      <div className="entry__concept">{entry.concept}</div>
      <div className="entry__entry">{entry.entry}</div>
      <div className="entry__date">{entry.date}</div>
      <div className="entry__mood">{mood?.label}</div>

      <button onClick={
        () => {
          onDeleteButtonClick(entry.id)
        }
      }>Delete</button>
      <button onClick={
        () => {
          onEditButtonClick(entry.id)
        }
      }>Edit</button>
    </section>
  )
};
