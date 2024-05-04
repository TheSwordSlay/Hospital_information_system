import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function InputText({ type = 'text', className = '', isFocused = false, label, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <label className="form-control w-full my-3">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <input
            {...props}
            type={type}
            className={
                'input input-bordered w-full ' +
                className
            }
            ref={input}
        />
        </label>
    );
});