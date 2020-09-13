import React, { useContext, useState, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { MoodContext } from "./mood/MoodProvider"


export const EntryForm = (props) => {
    const { addEntry, updateEntry, entry, setEntry } = useContext(EntryContext)
    const { moods, getMoods } = useContext(MoodContext)

    const [editMode, editModeChanged] = useState(false)

    useEffect(() => {
        getMoods()
    }, [])

    useEffect(() => {
        if ('id' in entry) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        newEntry[event.target.name] = event.target.value
        setEntry(newEntry)
    }



    const constructNewEntry = () => {

        if (editMode) {
            updateEntry({
                id: entry.id,
                concept: entry.concept,
                entry: entry.entry,
                date: entry.date,
                moodId: parseInt(entry.moodId)
            })
        } else {
            addEntry({
                concept: entry.concept,
                entry: entry.entry,
                date: Date.now(),
                moodId: parseInt(entry.moodId)
            })
        }
        setEntry({ concept: "", entry: "", moodId: 0 })
    }

    return (
        <form className="EntryForm">
            <h2 className="EntryForm__title">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="concept">Concept: </label>
                    <input type="text" name="concept" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Concept"
                        value={entry.concept}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry">Entry: </label>
                    <input type="text" name="entry" required className="form-control"
                        proptype="varchar"
                        placeholder="Entry"
                        value={entry.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="moodId">Mood: </label>
                    <select name="moodId" className="form-control"
                        proptype="int"
                        value={entry.moodId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a mood</option>
                        {moods.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEntry()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
        </form>
    )
}