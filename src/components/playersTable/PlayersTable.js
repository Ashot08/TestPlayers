import classes from "./PlayersTable.module.css";
import { Scrollbar } from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
export const PlayersTable = (props) => {
    const sortPlayers = (sortType) => {
        console.log(sortType);
    }
    const [players, setPlayers] = useState(0);
    const [filterType, setFilterType] = useState(0);
    useEffect(()=>{
        setPlayers(getPlayers());
    }, []);

    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>

                </div>
                <div className={classes.table__head}>
                    <div className={classes.table__head_item} onClick={(e) => sortPlayers('id')}>ID</div>
                    <div className={classes.table__head_item} onClick={(e) => sortPlayers('name')}>Имя</div>
                    <div className={classes.table__head_item} onClick={(e) => sortPlayers('level')}>Уровень</div>
                    <div className={classes.table__head_item} onClick={(e) => sortPlayers('online')}>Онлайн</div>
                </div>
                <Scrollbar style={{ height: 520 }} >
                    <div className={classes.table__body}>
                        {players ? players.map(p=><Player key={p.id} id={p.id} name={p.name} level={p.level} online={p.online ? 'yes' : 'no'} />) : 'not found' }
                    </div>
                </Scrollbar>
            </div>

        </div>
    )
}