import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { createContext, FC, FormHTMLAttributes, useCallback, useContext, useEffect, useRef } from "react";
import { attributes } from "../../utils/attributes";
import { _HookSetter } from "../../utils/hook";

export type FormContextProps = {
  mount: (formItem: FromItem) => string;
  unmount: (id: string) => void;
  disabled: boolean;
  readOnly: boolean;
};

export const FormContext = createContext<FormContextProps>({
  mount: () => "",
  unmount: () => {},
  disabled: false,
  readOnly: false,
});

type ValidateResult = {
  name: string;
  text: string;
  level?: "i" | "w" | "e";
};

export type FormHook = {
  validate: () => { valid: boolean; messages: Array<ValidateResult>; };
};
type Hook = _HookSetter<FormHook>;

export type FromItem = {
  name: string;
  validate: () => (Array<ValidateResult> | boolean | string);
};

export const useForm = (props: FromItem) => {
  const form = useContext(FormContext);
  useEffect(() => {
    const id = form.mount(props);
    return () => {
      form.unmount(id);
    };
  }, []);
  return form;
};

const Form: FC<FormHTMLAttributes<HTMLElement> & {
  $hook?: FormHook;
  $bind?: {[key: string]: any};
  $disabled?: boolean;
  $readOnly?: boolean;
  $change?: () => void;
  $changed?: () => void;
}> = (attrs) => {
  const elements = useRef<Array<{ id: string; formItem: FromItem }>>([]);
  const mount = useCallback((formItem: FromItem) => {
    const id = StringUtils.generateUuidV4();
    elements.current.push({ id, formItem });
    return id;
  }, []);
  const unmount = useCallback((id: string) => {
    elements.current.splice(elements.current.findIndex(item => item.id === id), 1);
  }, []);
  
  const validate = useCallback(() => {
    return {
      valid: true,
      messages: [],
    };
  }, []);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      validate,
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <FormContext.Provider value={{
      mount,
      unmount,
      disabled: attrs.$disabled ?? false,
      readOnly: attrs.$disabled ?? false,
    }}>
      <form {...attributes(attrs)} />
    </FormContext.Provider>
  );
};

export const useFormHook = () => {
  const dispatcher = useRef<Partial<FormHook>>({});
  return {
    validate: useCallback(() => {
      return dispatcher.current.validate?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

export default Form;