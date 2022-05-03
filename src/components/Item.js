import React from 'react';

export default function Item(props) {
    const { item } = props;
    return (
        <div className="border grid place-items-center rounded-md p-4">
            <img height="100px" width="100px" src={item.image_url} alt=""/>
            <br/>
            {item.name}                                
            <br/>
            {item.description}
            <br/>
        </div>
    )
}
