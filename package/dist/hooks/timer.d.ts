declare type Props = {
    callback?: () => (boolean | void);
    interval?: number;
};
declare const useTimer: (initProps?: Props) => {
    start: (props?: Props) => void;
    stop: () => void;
};
export default useTimer;
