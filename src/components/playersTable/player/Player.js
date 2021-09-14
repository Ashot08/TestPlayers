import classes from "./Player.module.css";
import {PlayerOptions} from "../playerOptions/PlayerOptions";
import {useRef, useState} from "react";
import {useOnClickOutside} from "../PlayersTable";
export const Player = (props) => {
    const [modalOpen, setOpenModal] = useState(false);
    const player = useRef();
    useOnClickOutside(player, () => setOpenModal(false));
    return (
        <div ref={player} onClick={()=>setOpenModal(prev => !prev)} className={classes.player}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.level}</div>
            <div>{props.online && '.'}</div>
            {modalOpen && <PlayerOptions data={{id: props.id, name: props.name, level: props.level, online: props.online}}
                                         setPopup={props.setPopup}
                                         addExcludedPlayer={props.addExcludedPlayer} />
            }
        </div>
    )
}

