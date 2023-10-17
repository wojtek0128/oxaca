import React from "react";

/**
 * Creates a templated layout for items inserted with current formatting.
 *
 * @param props All elements added into the Container.
 */
function Container(props: any) {
    return (
        <div
            className={`container p-8 mx-auto xl:px-0 ${
                props.className ? props.className : ""
            }`}>
            {props.children}
        </div>
    );
}

export default Container;