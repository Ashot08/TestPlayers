import classes from "./PlayersTable.module.css";
import {Scrollbar} from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
import {SortingButton} from "./sortingButton/sortingButton";
import {TableHead} from "./tableHead/TableHead";

function compare(a, b, order) {
    if(typeof a === 'string'){
        a = a.toLowerCase();
        b = b.toLowerCase();
    }
    if (order === 'DESC') {
        return a < b ? 1 : -1
    } else {
        return a > b ? 1 : -1
    }
}

export const PlayersTable = (props) => {

    const [players, setPlayers] = useState([]);
    const [sortType, setSortType] = useState({sortBy: 'id', order: 'ASC', isActive: false});

    useEffect(() => {
        setPlayers(getPlayers());
    }, []);
    useEffect(() => {
        if (sortType.isActive) {
            const sortedPlayers = players.sort((a, b) => {
                return compare(a[sortType.sortBy], b[sortType.sortBy], sortType.order);
            });
            setPlayers([...sortedPlayers]);
        }
    }, [sortType]);
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>

                </div>

                <TableHead setSortType={setSortType} />

                <Scrollbar style={{height: 520}}>
                    <div className={classes.table__body}>
                        {players.length ? players.map(p => <Player key={p.id} id={p.id} name={p.name} level={p.level}
                                                            online={p.online ? 'yes' : 'no'}/>) : 'not found'}
                    </div>
                </Scrollbar>
            </div>
        </div>
    )
}