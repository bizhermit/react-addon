import { FC, HTMLAttributes, ReactNode } from "react";
import { RowAttributes } from "./row";
declare const Header: FC<HTMLAttributes<HTMLElement> & Omit<RowAttributes, "$fill"> & {
    children?: ReactNode;
}>;
export default Header;
