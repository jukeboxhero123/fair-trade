import React, { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function OnboardingPopup({onClose}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onClose();
        // Make request to update yongo
    }

    return (
        <div>
            <h1>Profile Setup</h1>
            <form onSubmit={onSubmit}>
                <label> First Name: </label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
                <label> Last Name: </label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
                <label> Bio: </label>
                <input value={bio} onChange={(e) => setBio(e.target.value)} required></input>
                <label> Location: </label>
                <GooglePlacesAutocomplete 
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY} 
                    selectProps={{
                        location,
                        onChange: setLocation,
                    }}
                />
                <button type="submit">Complete Profile</button>
            </form>
        </div>
    )
}