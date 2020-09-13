import React from "react";
import { EntryProvider } from "./components/EntryProvider";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { MoodProvider } from "./components/mood/MoodProvider";

export const DailyJournal = () => {
  return (
    <div className="DailyJournal">
      <EntryProvider>
        <MoodProvider >
          <EntryForm />
          <EntryList />
        </MoodProvider>
      </EntryProvider>
    </div>
  );
};
