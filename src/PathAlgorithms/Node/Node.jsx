import React, {Component} from "react";




import './Node.css';

export default class Node extends Component {
    render () {
        const {
            col,
            row,
            isStart,
            isFinish,
            isWall,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
           

        } = this.props;

        const extra = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : ' ';

        const dragStart = e => {
            const target = e.target;
            e.dataTransfer.setData('node_id', target.id);

        
        }

        const dragOver = e => {
            e.stopPropagation();
        }
        

        

       

        return (
        
            <div
        id={`node-${row}-${col}`}
        className={`node ${extra}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        draggable={isStart || isFinish ? true: false}
        onDragStart={dragStart}
        onDragOver={dragOver}>
            {this.props.children}
        
        
        
            
        </div>
        

        

            
        
        
        );

        function Draggables(props) {
            const draggable = {
                isStart: true,
                isFinish: true,
            }
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

        
    }

}