import classes from "./PlayersTable.module.css";
import {Scrollbar} from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
import {TableHead} from "./tableHead/TableHead";

export const PlayersTable = (props) => {

    const [players, setPlayers] = useState([]);
    const [sortType, setSortType] = useState({sortBy: 'id', order: 'ASC', isActive: false});
    const [filter, setFilter] = useState({searchField: '', isOnline: false});

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
    useEffect(() => {
        setPlayers(filterPlayers(getPlayers(), filter));
        setSortType({...sortType});
    }, [filter]);
    return (
        <div className={classes.table}>
            <div className={classes.header}>
                <div>
                    <form onReset ={(e) => setFilter({searchField: '', isOnline: false})}

                          onInput={(e) =>
                              setFilter({
                                  ...filter,
                                  [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                              })
                          }>
                        <label>
                            Имя
                            <input name={'searchField'} type={'text'}/>
                        </label>
                        <label>
                            Онлайн
                            <input name={'isOnline'} type={'checkbox'}/>
                        </label>
                        <button name={'reset'} type={'reset'}>Показать всех</button>
                    </form>
                </div>

                <TableHead setSortType={setSortType}/>

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


function compare(a, b, order) {
    if (typeof a === 'string') {
        a = a.toLowerCase();
        b = b.toLowerCase();
    }
    if (order === 'DESC') {
        return a < b ? 1 : -1
    } else {
        return a > b ? 1 : -1
    }
}

function filterPlayers(players, args) {
    if (args.isOnline) {
        return players.filter(p => (
            p.online === args.isOnline && p.name.toLowerCase().includes(args.searchField.toLowerCase())
        ))
    }
    return players.filter(p => (
        p.name.toLowerCase().includes(args.searchField.toLowerCase())
    ))
}