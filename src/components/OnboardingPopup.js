import React, { useState } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from "../graphql/mutations/updateProfile";

export default function OnboardingPopup({onClose}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    const [updateProfile, { loading, error, data }] = useMutation(UPDATE_PROFILE);

    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile({
            variables: { 
                updateUserInput: {
                    address: location.label,
                    bio: bio,
                    first_name: firstName,
                    last_name: lastName,
                    is_onboarded: true,
                    user_uuid: localStorage.getItem("user_uuid")
                }
            },
        });
        onClose();
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