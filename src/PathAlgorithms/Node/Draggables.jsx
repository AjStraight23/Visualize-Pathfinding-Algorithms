import React from "react";

 function Draggables(props) {
    const drop = e => {
        e.preventDefault();
        const node_id = e.DataTransfer.getData('node_id');
        const node = document.getElementById(node_id);
        e.target.appendChild(node);

    }

    const dragOver = e => {
        e.preventDefault();

    }

    return (
        <div id={props.id} className={props.className}
        onDrop={drop} onDragOver={dragOver}>
            {props.children}
            

        </div>
    )
}

