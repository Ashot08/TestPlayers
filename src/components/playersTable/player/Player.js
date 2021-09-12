import classes from "./Player.module.css";
export const Player = (props) => {
    return (
        <div className={classes.player}>
            <div>{props.id}</div>
            <div>{props.name}</div>
            <div>{props.level}</div>
            <div>{props.online}</div>
        </div>
    )
}