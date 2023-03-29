import React from "react";
import Shelf from "./shelf";
const Shelve = (shelves) => {
    return (
        <section className="shelve">
            {shelves.map(shelve =>(
                <Shelf shelve={shelve} key={shelve.id}/>
            ))}
        </section>
    )
}