import {fromEvent, timer, merge} from 'rxjs'
import {switchMapTo, take, takeUntil} from "rxjs/operators";


const actionSource = fromEvent(document, 'click');

const note = document.getElementById("note");

actionSource.subscribe(() => {
    console.log('is clicking', Date.now())
});

const noActionIdle = timer(5000).pipe(takeUntil(actionSource))

const idleEvent = merge(
    noActionIdle,
    actionSource.pipe(
        switchMapTo(timer(5000).pipe(takeUntil(actionSource)))
    )
);

idleEvent.subscribe(() => {
    note.innerText = 'is idle'
});

idleEvent.pipe(
    switchMapTo(actionSource.pipe(take(1))))
    .subscribe(() => {
        note.innerText = 'is active';
    })