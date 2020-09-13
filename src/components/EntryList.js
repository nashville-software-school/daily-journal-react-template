import React, { useContext, useEffect, useState } from "react";
import { EntryContext } from "./EntryProvider";
import { Entry } from "./Entry";
import { MoodContext } from "./mood/MoodProvider";

export const EntryList = () => {
  const { entries, getEntries, searchEntries } = useContext(EntryContext);
  const { moods, getMoods } = useContext(MoodContext);
  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    getEntries()
      .then(getMoods)
  }, []);

  useEffect(() => {
    setEntries(entries)
  }, [entries])

  useEffect(() => {
    searchEntries(searchedTerm)
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
            <input type="radio" value={mood.id} name="moodId" checked={moodSelected === mood.id}
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
          return <Entry key={entry.id} entry={entry} moods={moods} />;
        })}
      </div>

    </>
  );
};
