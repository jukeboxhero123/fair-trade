import React, { useState, useContext } from "react";
import { GET_S3_PRESIGNED_URL } from "../graphql/queries/getS3PresignedUrl";
import { CREATE_ITEM } from "../graphql/mutations/createItem";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AccountContext } from '../contexts/AccountContext';
import { GlobalContext } from '../contexts/GlobalContext';

export default function ItemInputPopup({onClose}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [looking_for, setLookingFor] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const [getS3PresignedUrlQuery] = useLazyQuery(GET_S3_PRESIGNED_URL);
    const [createItemMutation] = useMutation(CREATE_ITEM);

    const { user: { user_uuid } } = useContext(AccountContext);
    const { isLoading, categories } = useContext(GlobalContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        // Get Secure S3 URL 
        const { data: { getS3PresignedUrl: url } } = await getS3PresignedUrlQuery();
        // Put image to S3 URL
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: selectedImage
        })

        const image_url = url.split('?')[0]
        await createItemMutation({
            variables: {
                createItemInput: {
                    image_url,
                    description,
                    category,
                    looking_for,
                    name,
                    user_uuid
                }
            }
        })
        // Create Image
        onClose();
    }

    if (isLoading) return "LOADING...";

    return (
        <div>
            <h1>Item Creator</h1>
            <form onSubmit={onSubmit}>
                {
                    selectedImage && (
                        <div>
                            <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={()=>setSelectedImage(null)}>Remove</button>
                        </div>
                    )
                }
                <input 
                    type="file" 
                    onChange={
                        (event) => {
                            setSelectedImage(event.target.files[0]);
                        }
                    }
                />
                <label> Name: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} required></input>
                <label> Description: </label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} required></input>
                <label> Category: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value=""></option>
                    {
                        categories.map((option) => {
                            return <option value={option}>{option}</option>
                        })
                    }
                </select>
                <label> Looking For: </label>
                <input value={looking_for} onChange={(e) => setLookingFor(e.target.value)}></input>
                <button onClick={onClose}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}