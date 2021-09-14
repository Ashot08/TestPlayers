import classes from "./PlayerOptions.module.css";
export const PlayerOptions = (props) => {

    return (
        <div className={classes.player__options}>
            <button>Показать профиль</button>
            <button>Скрыть игрока</button>
        </div>
    )
}