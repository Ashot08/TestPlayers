import classes from "./PlayersTable.module.css";
import { Scrollbar } from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
import {SortingButton} from "./sortingButton/sortingButton";
export const PlayersTable = (props) => {

    const [players, setPlayers] = useState([]);
    const [sortType, setSortType] = useState({sortBy: 'id', order: 'ASC', isActive: false});

    useEffect(()=>{
        setPlayers(getPlayers());
    }, []);
    useEffect(()=>{
        if(sortType.isActive){
            const sortedPlayers = players.sort((a,b) =>{
                if(typeof a[sortType.sortBy] === 'number'){
                    return a[sortType.sortBy] > b[sortType.sortBy] ? 1 : -1
                }
                return a[sortType.sortBy].toString().toLowerCase() > b[sortType.sortBy].toString().toLowerCase() ? 1 : -1
            });
            console.log(sortType.order)
            setPlayers([...sortedPlayers]);
        }
    }, [sortType]);
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>

                </div>
                <div className={classes.table__head}>
                    <div className={classes.table__head_item}>
                        ID
                        <SortingButton title={'id'} clickHandler={setSortType} />
                    </div>
                    <div className={classes.table__head_item}>
                        Имя
                        <SortingButton title={'name'} clickHandler={setSortType} />
                    </div>
                    <div className={classes.table__head_item}>
                        Уровень
                        <SortingButton title={'level'} clickHandler={setSortType} />
                    </div>
                    <div className={classes.table__head_item}>
                        Онлайн
                        <SortingButton title={'online'} clickHandler={setSortType} />
                    </div>
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