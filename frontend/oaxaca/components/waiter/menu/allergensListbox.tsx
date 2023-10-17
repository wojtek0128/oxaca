import React, { useState, Component } from "react";
import Select from "react-select";
import { allergenOptions } from "../../../data/allergens";

function AllergensListbox() {

    return (
        <Select
            isMulti
            name="allergens"
            options={allergenOptions}
            className="basic-multi-select w-[27.5rem]"
            classNamePrefix="select"
            />
    );
}

export default AllergensListbox;