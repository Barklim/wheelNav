export type TIntervalItem = {
    start: number,
    end: number
}

export type TInterval = {
    [key: number]: TIntervalItem;
};

export type IntervalProps = {
    intervals: TInterval;
    activeItem: number;
    duration: number;
    radius: number;
};