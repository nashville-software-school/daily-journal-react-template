import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { searchEntries } from "./EntryManager";

export const EntryList = ({ moods, entries, onEditButtonClick, onDeleteButtonClick }) => {

  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    setEntries(entries)
  }, [entries])

  useEffect(() => {
    if (searchedTerm !== "") {
      searchEntries(searchedTerm).then(entriesData => setEntries(entriesData))
    } else {
      setEntries(entries)
    }
  }, [searchedTerm])


  const filterAllEntries = (event) => {
    const filteredEntriesByMood = entries.filter(entry => entry.moodId === parseInt(event.target.value))
    setEntries(filteredEntriesByMood)
    setMoodSelected(parseInt(event.target.value))
  }


  return (
    <>
      <h1>Filter Entries</h1>

      {
        moods.map(mood => {
          return <>
            <input type="radio" key={mood.id} value={mood.id} name="moodId" checked={moodSelected === mood.id}
              onClick={filterAllEntries}
            /> {mood.label}
          </>
        })
      }

      <div >
        <button onClick={() => {
          setEntries(entries)
          setMoodSelected("")
        }}>Clear Filter</button>
      </div>

      <div>

        <input type="text" placeholder="Search" onKeyUp={
          (event) => {
            const searchTerm = event.target.value
            setTerm(searchTerm)
          }
        } />

      </div>

      <h1>Entries</h1>

      {/*
            Pseudo Code
            .filter(happyEntries => happyEntries.mood.label === "Happy")
        */}

      <div className="entries">
        {filteredEntries.map(entry => {
          return <Entry 
            key={entry.id}
            entry={entry}
            mood={moods.find(m => m.id === entry.moodId)}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />;
        })}
      </div>

    </>
  );
};
