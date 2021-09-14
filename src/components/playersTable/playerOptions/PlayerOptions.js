import classes from "./PlayerOptions.module.css";
export const PlayerOptions = (props) => {
    return (
        <div className={classes.player__options}>
            <button onClick={()=>props.setPopup({open: true, data: props.data})}>Показать профиль</button>
            <button onClick={()=>props.addExcludedPlayer(props.data.id)}>Скрыть игрока</button>
        </div>
    )
}