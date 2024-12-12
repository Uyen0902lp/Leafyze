"use client";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


export default function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster 
           position="top-center"
         />
      </Provider>
    </>
  );
}
