import React from 'react'

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    };

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-div'>
                <h2>Add a User</h2>
                <button className='submitBtn' disabled={disabled}>submit</button>

                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>
            <div className='form-inputs'>
            <label>
                Username
                <input 
                value={values.username}
                onChange={onChange}
                name='username'
                type='text'
                />
                </label>

                <label>
                Email
                <input 
                value={values.email}
                onChange={onChange}
                name='email'
                type='text'
                />
                </label>

                <label>
                    Password
                    <input 
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='text'
                    />
                </label>

                <label>
                    Terms
                    <input 
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                    onChange={onChange}
                    />
                </label>
            </div>
        </form>
    );
}