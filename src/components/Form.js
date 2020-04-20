import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup } from "react-bootstrap";


function Form(props) {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();

        setLoading(true);
        try {
            await props.onSubmit(input);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <fieldset disabled={loading} aria-busy={loading}>
                    <FormGroup controlId="email">
                        {props.inputs.map(i => (
                            <input
                                key={i.key}
                                className="form-control"
                                value={input[i.name] || ""}
                                type={i.type}
                                placeholder={i.placeholder}
                                onChange={e => {
                                    const value = e.target.value;
                                    setInput(prev => ({ ...prev, [i.name]: value }));
                                }}
                            />
                        ))}
                    </FormGroup>
                    <input className="btn btn-default btn-block" type="submit" value={`Login${loading ? "g" : ""}`} />
                </fieldset>
            </form>
        </>
    );
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
        PropTypes.shape(
            {
                name: PropTypes.string.isRequired,
                type: PropTypes.string
            }.isRequired
        )
    ),
    onSubmit: PropTypes.func.isRequired
};

export { Form };