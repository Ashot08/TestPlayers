import classes from "./PlayersTable.module.css";
import { Scrollbar } from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
export const PlayersTable = (props) => {

    const [players, setPlayers] = useState(0);
    const [sortType, setSortType] = useState(0);
    const [sortOrder, setSortOrder] = useState('ASC');
    useEffect(()=>{
        setPlayers(getPlayers());
    }, []);
    useEffect(()=>{
        if(sortType){
            const sortedPlayers = (sortOrder === 'ASC') ? players.slice().sort((a,b) => a[sortType] > b[sortType] ? 1 : -1) :
                players.slice().sort((a,b) => a[sortType] < b[sortType] ? 1 : -1);
            setPlayers(sortedPlayers);
        }
    }, [sortType, sortOrder]);
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>

                </div>
                <div className={classes.table__head}>
                    <div className={classes.table__head_item} onClick={(e) => {
                        setSortType('id');
                        setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
                    }}>ID</div>
                    <div className={classes.table__head_item} onClick={(e) => setSortType('name')}>Имя</div>
                    <div className={classes.table__head_item} onClick={(e) => setSortType('level')}>Уровень</div>
                    <div className={classes.table__head_item} onClick={(e) => setSortType('online')}>Онлайн</div>
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