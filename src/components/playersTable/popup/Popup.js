import classes from "./Popup.module.css";
import {useRef} from "react";
import {useOnClickOutside} from "../PlayersTable";

export const Popup = (props) => {
    const popupBody = useRef();
    useOnClickOutside(popupBody, ()=>props.setPopup({open: false, data: {}}))
    return <div className={classes.popup__background}>
        <div ref={popupBody} className={classes.popup__body}>
            <div>{props.data.online}</div>
            <div>
                <div><h2>{props.data.name}</h2></div>
                <div>{props.data.level}</div>
            </div>
            <div><button onClick={()=>props.setPopup({open: false, data: {}})}>Закрыть</button></div>
        </div>
    </div>

}