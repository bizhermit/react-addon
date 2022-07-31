export type _HookSetter<P> = {
  _set: (dispatcher: P) => void;
} & P;