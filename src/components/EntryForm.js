import React, { useState, useEffect } from "react"
import { addEntry, updateEntry } from './EntryManager'

export const EntryForm = ({ entry, moods, onFormSubmit }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        newEntry[event.target.name] = event.target.value
        setUpdatedEntry(newEntry)
    }



    const constructNewEntry = () => {
        onFormSubmit(updatedEntry)
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
                        value={updatedEntry.concept}
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
                        value={updatedEntry.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="moodId">Mood: </label>
                    <select name="moodId" className="form-control"
                        proptype="int"
                            value={updatedEntry.moodId}
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