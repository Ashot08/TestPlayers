import classes from "./Player.module.css";
import {PlayerOptions} from "../playerOptions/PlayerOptions";
import {useRef, useState} from "react";
export const Player = (props) => {
    const [modalOpen, setOpenModal] = useState(false);
    const player = useRef();
    props.useOnClickOutside(player, () => setOpenModal(false));
    return (
        <div ref={player} onClick={()=>setOpenModal(!modalOpen)} className={classes.player}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.level}</div>
            <div>{props.online && '.'}</div>
            {modalOpen && <PlayerOptions />}
        </div>
    )
}

