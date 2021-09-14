import classes from "./PlayersTable.module.css";
import {Scrollbar} from "react-scrollbars-custom";
import {Player} from "./player/Player";
import {getPlayers} from "../../api/api";
import {useEffect, useState} from "react";
import {TableHead} from "./tableHead/TableHead";
import {Popup} from "./popup/Popup";

export const PlayersTable = (props) => {
    const [players, setPlayers] = useState([]);
    const [sortType, setSortType] = useState({sortBy: 'id', order: 'ASC'});
    const [filter, setFilter] = useState({searchField: '', isOnline: false, excludedPlayers: []});
    const [popup, setPopup] = useState({open: false, data: {}});
    const addExcludedPlayer = (id) => {
        setFilter({
            ...filter,
            excludedPlayers: [...filter.excludedPlayers, id]
        })
    }
    useEffect(() => {
        const sortedPlayers = getPlayers().sort((a, b) => {
            return compare(a[sortType.sortBy], b[sortType.sortBy], sortType.order);
        });
        setPlayers(filterPlayers([...sortedPlayers], filter));

    }, [sortType, filter]);

    return (
        <>
            {popup.open && <Popup data={popup.data} setPopup={setPopup}/>}
            <div className={classes.table}>
                <div className={classes.header}>
                    <div>
                        <form onReset={(e) => setFilter({searchField: '', isOnline: false, excludedPlayers: []})}
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
                            {players.length ? players.map(p =>
                                <Player
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    level={p.level}
                                    online={p.online}
                                    setPopup={setPopup}
                                    addExcludedPlayer={addExcludedPlayer}
                                />) : 'not found'}
                        </div>
                    </Scrollbar>
                </div>
            </div>
        </>

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
    players = players.filter(p => !args.excludedPlayers.includes(p.id));
    if (args.isOnline) {
        return players.filter(p => (
            p.online === args.isOnline && p.name.toLowerCase().includes(args.searchField.toLowerCase())
        ))
    }
    return players.filter(p => (
        p.name.toLowerCase().includes(args.searchField.toLowerCase())
    ))
}

export function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}