import LayoutProvider from "../../react-addon/dist/styles/layout-provider";
import { AppContext, AppProps } from "next/app";
import { LayoutColor, LayoutDesign } from "../../react-addon/dist/styles/css-var";
import RootContainer from "../components/root-container";
import electronAccessor from "../core/modules/electron-accessor";
import "../core/styles/base.css";
import { MessageProvider } from "../../react-addon/dist/message/message-provider";
import { MaskProvider } from "../../react-addon/dist/popups/mask";

type AppRootInitProps = {
  layout: {
    color: LayoutColor;
    design: LayoutDesign;
  };
};

const AppRoot = ({ Component, pageProps, initProps }: AppProps & { initProps: AppRootInitProps }) => {
  return (
    <LayoutProvider color={initProps.layout.color} design={initProps.layout.design}>
      <MaskProvider >
        <MessageProvider>
          <RootContainer>
            <Component {...pageProps} />
          </RootContainer>
        </MessageProvider>
      </MaskProvider>
    </LayoutProvider>
  )
};

AppRoot.getInitialProps = async (_ctx: AppContext) => {
  const initProps: AppRootInitProps = {
    layout: {
      color: "system",
      design: "flat",
    },
  };
  const electron = electronAccessor();
  if (electron) {
    initProps.layout.color = electron.getLayoutColor() ?? initProps.layout.color;
    initProps.layout.design = electron.getLayoutDesign() ?? initProps.layout.design;
  }
  return { initProps };
}

export default AppRoot;